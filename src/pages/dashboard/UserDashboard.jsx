import { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Download, 
  Zap, 
  History, 
  Search, 
  Filter,
  BarChart3,
  Table as TableIcon,
  User,
  Calendar,
  Building,
  Loader2
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_API_URL;

export default function UserDashboard() {
  const { user, token } = useAuthStore();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [uploadedUrl, setUploadedUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [fullText, setFullText] = useState("");
  const [tables, setTables] = useState([]);
  const [entities, setEntities] = useState([]);
  const [fileName, setFileName] = useState("");

  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch upload history on component mount
  useEffect(() => {
    fetchUploadHistory();
  }, []);

  const fetchUploadHistory = async () => {
    if (!token) return;
    
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/files/history`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHistory(res.data.files || []);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  };

  // Filtered history based on search and filter
  const filteredHistory = history.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.type?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // -------------------------------
  // UPLOAD FILE with Progress
  // -------------------------------
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    formData.append("type", file.type);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/files/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      setUploadedUrl(res.data.url);
      setFileName(file.name);
      
      // Add to local state
      const newUpload = {
        url: res.data.url,
        name: file.name,
        type: file.type.split('/')[1] || file.type,
        date: new Date(),
        size: file.size,
        id: Date.now()
      };
      
      setHistory(prev => [newUpload, ...prev]);
      
      // Show success notification
      alert(`File "${file.name}" uploaded successfully!`);
    } catch (err) {
      console.error("Upload error:", err);
      alert(`Upload failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // -------------------------------
  // SUMMARIZE DOCUMENT
  // -------------------------------
  const extractSummary = async () => {
    if (!uploadedUrl) {
      alert("Please upload a document first!");
      return;
    }

    setExtracting(true);
    setSummary("");

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/extract/summary`,
        { url: uploadedUrl },
        { 
          headers: { Authorization: `Bearer ${token}` },
          params: { fileName }
        }
      );

      setSummary(res.data.summary);
      
      // Auto-switch to summary tab
      setActiveTab("summary");
    } catch (err) {
      console.error("Summary extraction error:", err);
      alert(`Summary extraction failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setExtracting(false);
    }
  };

  // -------------------------------
  // FULL EXTRACTION
  // -------------------------------
  const extractDetails = async () => {
    if (!uploadedUrl) {
      alert("Please upload a document first!");
      return;
    }

    setExtracting(true);
    setFullText("");
    setTables([]);
    setEntities([]);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/extract/details`,
        { url: uploadedUrl },
        { 
          headers: { Authorization: `Bearer ${token}` },
          params: { fileName }
        }
      );

      setFullText(res.data.text || "");
      setTables(res.data.tables || []);
      setEntities(res.data.entities || []);
      
      // Auto-switch to details tab
      setActiveTab("details");
    } catch (err) {
      console.error("Details extraction error:", err);
      alert(`Extraction failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setExtracting(false);
    }
  };

  // -------------------------------
  // Convert JSON → CSV
  // -------------------------------
  const convertToCSV = async () => {
    try {
      const jsonData = { 
        text: fullText, 
        entities, 
        tables,
        metadata: {
          fileName,
          extractedAt: new Date().toISOString(),
          totalEntities: entities.length,
          totalTables: tables.length
        }
      };

      const res = await axios.post(
        `${BACKEND_URL}/api/extract/details/csv`,
        { data: jsonData },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName.replace(/\.[^/.]+$/, "")}_extracted.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      alert("CSV file downloaded successfully!");
    } catch (err) {
      console.error("CSV conversion error:", err);
      alert("Failed to download CSV");
    }
  };

  // -------------------------------
  // Quick Actions
  // -------------------------------
  const quickActions = [
    {
      title: "Quick Summary",
      description: "Get key points instantly",
      icon: <FileText className="h-5 w-5" />,
      action: extractSummary,
      color: "bg-blue-500"
    },
    {
      title: "Full Analysis",
      description: "Extract everything",
      icon: <Zap className="h-5 w-5" />,
      action: extractDetails,
      color: "bg-purple-500"
    },
    {
      title: "Export Data",
      description: "Download as CSV",
      icon: <Download className="h-5 w-5" />,
      action: convertToCSV,
      color: "bg-green-500",
      disabled: !(fullText || tables.length || entities.length)
    }
  ];

  // Entity type colors
  const entityColors = {
    PERSON: "bg-blue-100 text-blue-800",
    ORGANIZATION: "bg-purple-100 text-purple-800",
    DATE: "bg-green-100 text-green-800",
    LOCATION: "bg-red-100 text-red-800",
    MONEY: "bg-yellow-100 text-yellow-800",
    DEFAULT: "bg-gray-100 text-gray-800"
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">
              Welcome back, {user?.name || "User"}!
            </h1>
            <p className="text-gray-400 mt-1">Manage and analyze your documents</p>
          </div>
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            <FileText className="h-3 w-3 mr-1" />
            {user?.role || "Free Plan"}
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Documents</p>
                  <p className="text-2xl font-bold text-white mt-2">
                    {history.length}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Analysis</p>
                  <p className="text-2xl font-bold text-white mt-2">
                    {extracting ? "1" : "0"}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Tables Found</p>
                  <p className="text-2xl font-bold text-white mt-2">
                    {tables.length}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TableIcon className="h-5 w-5 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Entities Found</p>
                  <p className="text-2xl font-bold text-white mt-2">
                    {entities.length}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-yellow-500">
              Overview
            </TabsTrigger>
            <TabsTrigger value="upload" className="data-[state=active]:bg-yellow-500">
              Upload
            </TabsTrigger>
            <TabsTrigger value="summary" className="data-[state=active]:bg-yellow-500">
              Summary
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-yellow-500">
              Details
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-yellow-500">
              History
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={action.action}
                      disabled={action.disabled || extracting || !uploadedUrl}
                      className={`p-4 rounded-lg border border-gray-800 hover:border-yellow-500/50 transition-all ${
                        action.disabled || !uploadedUrl
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:scale-[1.02] cursor-pointer"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center`}>
                          {action.icon}
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-white">{action.title}</h3>
                          <p className="text-sm text-gray-400">{action.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {history.slice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-yellow-500/20 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-sm text-gray-400">
                            {item.date instanceof Date ? item.date.toLocaleDateString() : new Date(item.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.type || "doc"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload New Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* File Drop Zone */}
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-yellow-500/50 transition-colors">
                    <Input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="h-16 w-16 rounded-full bg-yellow-500/10 mx-auto flex items-center justify-center mb-4">
                        <Upload className="h-8 w-8 text-yellow-400" />
                      </div>
                      <p className="text-white font-medium">
                        {file ? file.name : "Drag & drop or click to browse"}
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Supports PDF, DOC, DOCX, TXT (Max 10MB)
                      </p>
                    </label>
                  </div>

                  {file && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">{file.name}</p>
                          <p className="text-gray-400 text-sm">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setFile(null)}
                        >
                          Remove
                        </Button>
                      </div>

                      {uploading && (
                        <div className="space-y-2">
                          <Progress value={uploadProgress} className="h-2" />
                          <p className="text-sm text-gray-400 text-center">
                            Uploading... {uploadProgress}%
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <Button
                    onClick={handleUpload}
                    disabled={uploading || !file}
                    className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
                    size="lg"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Document
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-yellow-400 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Document Summary
                  </CardTitle>
                  {summary && (
                    <Button
                      onClick={extractSummary}
                      disabled={extracting}
                      variant="outline"
                      size="sm"
                    >
                      {extracting ? (
                        <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                      ) : null}
                      Refresh
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!summary ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No summary generated yet</p>
                    <Button
                      onClick={extractSummary}
                      disabled={extracting || !uploadedUrl}
                      className="bg-yellow-500 text-black hover:bg-yellow-600"
                    >
                      {extracting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate Summary"
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-yellow-300 font-bold mb-3">Summary of {fileName}</h3>
                      <div className="text-white leading-relaxed whitespace-pre-line">
                        {summary}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      Generated on {new Date().toLocaleDateString()}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-yellow-400 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Detailed Analysis
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      onClick={extractDetails}
                      disabled={extracting}
                      variant="outline"
                      size="sm"
                    >
                      {extracting ? (
                        <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                      ) : null}
                      Re-analyze
                    </Button>
                    <Button
                      onClick={convertToCSV}
                      disabled={!(fullText || tables.length || entities.length)}
                      size="sm"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Download className="h-3 w-3 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!(fullText || tables.length || entities.length) ? (
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No detailed analysis available</p>
                    <Button
                      onClick={extractDetails}
                      disabled={extracting || !uploadedUrl}
                      className="bg-yellow-500 text-black hover:bg-yellow-600"
                    >
                      {extracting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Run Full Analysis"
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Statistics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-white">{entities.length}</p>
                        <p className="text-sm text-gray-400">Entities Found</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-white">{tables.length}</p>
                        <p className="text-sm text-gray-400">Tables Found</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-white">
                          {fullText.split(/\s+/).length}
                        </p>
                        <p className="text-sm text-gray-400">Words</p>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="space-y-3">
                      {/* Extracted Text */}
                      <AccordionItem value="text" className="border border-gray-800 rounded-lg">
                        <AccordionTrigger className="px-4 hover:no-underline  bg-gray-700 border border-gray-800 rounded-lg">
                          <div className="flex items-center gap-2  ">
                            <FileText className="h-4 w-4" />
                            <span>Extracted Text</span>
                            <Badge variant="secondary" className="ml-2">
                              {fullText.split(/\s+/).length} words
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="bg-gray-800 rounded p-4 max-h-96 overflow-y-auto">
                            <p className="text-white whitespace-pre-line">{fullText}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Entities */}
                      <AccordionItem value="entities" className="border border-gray-800 rounded-lg">
                        <AccordionTrigger className="px-4 hover:no-underline bg-gray-700 border border-gray-800 rounded-lg">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Named Entities</span>
                            <Badge variant="secondary" className="ml-2">
                              {entities.length} found
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="flex flex-wrap gap-2">
                            {entities.map((entity, idx) => (
                              <Badge
                                key={idx}
                                className={`cursor-pointer hover:opacity-80 ${
                                  entityColors[entity.type] || entityColors.DEFAULT
                                }`}
                                title={`Type: ${entity.type}, Score: ${entity.score?.toFixed(2)}`}
                              >
                                {entity.text}
                                <span className="ml-1 text-xs opacity-75">
                                  ({entity.type})
                                </span>
                              </Badge>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Tables */}
                      <AccordionItem value="tables" className="border border-gray-800 rounded-lg">
                        <AccordionTrigger className="px-4 hover:no-underline  bg-gray-700 border border-gray-800 rounded-lg">
                          <div className="flex items-center gap-2">
                            <TableIcon className="h-4 w-4" />
                            <span>Extracted Tables</span>
                            <Badge variant="secondary" className="ml-2">
                              {tables.length} tables
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          {tables.map((table, tableIdx) => (
                            <div key={tableIdx} className="mb-6 last:mb-0">
                              <h4 className="text-yellow-300 font-medium mb-2">
                                Table {tableIdx + 1}
                              </h4>
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-700">
                                  <tbody>
                                    {table.rows?.map((row, rowIdx) => (
                                      <tr key={rowIdx} className="border border-gray-700">
                                        {row.map((cell, cellIdx) => (
                                          <td
                                            key={cellIdx}
                                            className="border border-gray-700 p-2 text-white"
                                          >
                                            {cell}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Document History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search and Filter */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search documents..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="docx">Word</SelectItem>
                        <SelectItem value="txt">Text</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* History List */}
                  <div className="space-y-3">
                    {filteredHistory.length === 0 ? (
                      <div className="text-center py-12">
                        <History className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">
                          {searchQuery || filterType !== "all" 
                            ? "No matching documents found" 
                            : "No documents uploaded yet"}
                        </p>
                      </div>
                    ) : (
                      filteredHistory.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-lg ${
                              item.type === 'pdf' ? 'bg-red-500/20' :
                              item.type === 'docx' ? 'bg-blue-500/20' :
                              'bg-gray-700'
                            } flex items-center justify-center`}>
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{item.name}</p>
                              <p className="text-sm text-gray-400">
                                Uploaded {item.date instanceof Date 
                                  ? item.date.toLocaleDateString() 
                                  : new Date(item.date).toLocaleDateString()} • 
                                {(item.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setUploadedUrl(item.url);
                                setFileName(item.name);
                                setActiveTab("summary");
                              }}
                            >
                              Analyze
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(item.url, '_blank')}
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
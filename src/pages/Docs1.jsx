import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Code,
  Upload,
  Cpu,
  Database,
  BarChart,
  Zap,
  CreditCard,
  CheckCircle,
  FileCode,
  Sparkles,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";

export default function Docs() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("getting-started");
  const [copiedCode, setCopiedCode] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = {
    "getting-started": {
      title: "Getting Started",
      icon: <Zap className="w-5 h-5" />,
      content: [
        { title: "Welcome", type: "overview", content: "DocXtract is an AI-powered document processing platform. Extract structured data quickly." },
        { title: "Quick Start", type: "steps", steps: ["Sign up for free", "Upload a document", "View extracted data"] }
      ]
    },
    "document-processing": {
      title: "Document Processing",
      icon: <FileText className="w-5 h-5" />,
      content: [
        { title: "Supported Formats", type: "list", items: ["PDFs", "Images (PNG, JPG, JPEG)", "Invoices & Receipts", "ID Cards & Passports"] },
        { title: "Upload Document", type: "code", language: "javascript", code: `const formData = new FormData();\nformData.append('file', documentFile);\nconst res = await fetch('/api/upload', { method: 'POST', body: formData });\nconsole.log(await res.json());` }
      ]
    },
    "workflow": {
      title: "Workflow",
      icon: <Sparkles className="w-5 h-5" />,
      content: [{ title: "How It Works", type: "overview", content: "1️⃣ Upload → 2️⃣ Process → 3️⃣ Extract → 4️⃣ Analyze. Get JSON or CSV output." }]
    }
  };

  const codeExamples = {
    javascript: `const res = await fetch('/api/upload', { method: 'POST', body: formData });\nconsole.log(await res.json());`,
    python: `import requests\nfiles = {'file': open('document.pdf','rb')}\nres = requests.post('/api/upload', files=files)\nprint(res.json())`,
    curl: `curl -X POST /api/upload -F "file=@document.pdf"`
  };

  const copyToClipboard = (code, lang) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(lang);
    toast.success("Code copied!");
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 bg-gray-900/95 backdrop-blur border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl font-bold text-yellow-400">DocXtract Docs</h1>
          </div>
          <div className="lg:hidden">
            <Button variant="outline" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
          </div>
          <div className="hidden lg:flex gap-2">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button className="bg-yellow-400 text-black hover:shadow-lg" onClick={() => navigate("/plans")}>Pricing</Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className={`lg:w-1/4 space-y-4 lg:block ${sidebarOpen ? "block" : "hidden"} fixed inset-0 bg-gray-900/95 z-40 p-6 lg:relative lg:p-0`}>
          <div className="flex flex-col gap-2">
            {Object.entries(sections).map(([key, section]) => (
              <Button
                key={key}
                variant={activeSection === key ? "secondary" : "ghost"}
                className="w-full justify-start text-left"
                onClick={() => { setActiveSection(key); setSidebarOpen(false); }}
              >
                {section.icon}<span className="ml-2">{section.title}</span>
              </Button>
            ))}
            <div className="mt-4 lg:hidden">
              <Button variant="outline" onClick={() => setSidebarOpen(false)} className="w-full">Close Menu</Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/4 space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-yellow-400">{sections[activeSection].title}</h2>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {sections[activeSection].content.map((item, i) => (
                  <Card key={i} className="bg-gray-800/30 border-gray-700">
                    <CardContent>
                      <h3 className="font-bold text-white mb-2">{item.title}</h3>
                      {item.type === "overview" && <p className="text-gray-300">{item.content}</p>}
                      {item.type === "steps" && (
                        <ul className="list-decimal list-inside text-gray-300">
                          {item.steps.map((s, idx) => <li key={idx}>{s}</li>)}
                        </ul>
                      )}
                      {item.type === "list" && (
                        <ul className="list-disc list-inside text-gray-300">
                          {item.items.map((s, idx) => <li key={idx}>{s}</li>)}
                        </ul>
                      )}
                      {item.type === "code" && (
                        <pre className="overflow-x-auto text-sm text-gray-300 bg-gray-800 p-2 rounded-lg">{item.code}</pre>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="code">
                {Object.entries(codeExamples).map(([lang, code]) => (
                  <Card key={lang} className="bg-gray-800/30 border-gray-700 mb-4">
                    <CardContent>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">{lang}</span>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(code, lang)}>
                          {copiedCode === lang ? <CheckCircle className="w-4 h-4" /> : "Copy"}
                        </Button>
                      </div>
                      <pre className="overflow-x-auto text-sm text-gray-300">{code}</pre>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Workflow */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">How It Works</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Upload", icon: <Upload />, color: "bg-blue-500" },
                { title: "Process", icon: <Cpu />, color: "bg-purple-500" },
                { title: "Extract", icon: <Database />, color: "bg-green-500" },
                { title: "Analyze", icon: <BarChart />, color: "bg-orange-500" }
              ].map((step, i) => (
                <Card key={i} className="bg-gray-800/30 border-gray-700 text-center p-4">
                  <div className={`w-12 h-12 mx-auto rounded-lg mb-2 flex items-center justify-center ${step.color}`}>{step.icon}</div>
                  <h3 className="font-bold text-white">{step.title}</h3>
                </Card>
              ))}
            </div>
          </motion.div>
        </main>
      </div>

      <footer className="bg-gray-900 border-t border-gray-800 py-6 mt-12 text-center text-gray-400">
        © 2025 DocXtract. All rights reserved.
      </footer>
    </div>
  );
}

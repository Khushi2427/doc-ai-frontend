import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-400">Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-white text-4xl">542</CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-400">Active Business Accounts</CardTitle>
          </CardHeader>
          <CardContent className="text-white text-4xl">32</CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-400">Reports</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            10 new reports today
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

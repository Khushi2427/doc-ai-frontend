import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1">

        {/* Topbar with hamburger */}
        <Topbar openSidebar={() => setSidebarOpen(true)} />

        <main className="p-4 md:p-6 bg-gray-950 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

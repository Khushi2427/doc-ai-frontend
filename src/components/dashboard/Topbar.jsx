import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export default function Topbar({ openSidebar }) {
  const { user, logout } = useAuthStore();

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-3">
        
        {/* ☰ Hamburger (mobile only) */}
        <button
          onClick={openSidebar}
          className="md:hidden text-yellow-400"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h2 className="text-lg font-semibold text-yellow-400">
          Welcome, {user?.name}
        </h2>
      </div>

      {/* RIGHT SECTION */}
      <Button
        className="bg-yellow-500 text-black hover:bg-yellow-400"
        onClick={logout}
      >
        Logout
      </Button>

    </header>
  );
}

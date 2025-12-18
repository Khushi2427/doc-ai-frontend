import { Home, Users, Store, Key, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function Sidebar({ isOpen, closeSidebar }) {
  const { user } = useAuthStore();

  const menu = [{ label: "Dashboard", path: "/dashboard", icon: <Home /> }];

  if (user.role === "admin") {
    menu.push({ label: "Manage Users", path: "/dashboard/admin/users", icon: <Users /> });
  }

  if (["user", "business"].includes(user.role)) {
    menu.push({ label: "Home", path: "/", icon: <Store /> });
  }

  if (user.role === "business") {
    menu.push({ label: "Get API KEY", path: "/api-key", icon: <Key /> });
  }

  return (
    <aside
      className={`
        fixed md:static z-50
        w-64 h-full bg-black border-r border-gray-800 p-6
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* Mobile close button */}
      <div className="flex justify-between items-center md:hidden mb-6">
        <h1 className="text-xl font-bold text-yellow-400">DocXtract</h1>
        <button onClick={closeSidebar}>
          <X className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* Desktop title */}
      <h1 className="hidden md:block text-xl font-bold text-yellow-400 mb-6">
        DocXtract
      </h1>

      <nav className="space-y-3">
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            onClick={closeSidebar}
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-800 transition"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <div className="navbar bg-base-200 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold btn btn-ghost normal-case"
          onClick={() => showNotification("Welcome to ReelDrop 🎬", "info")}
        >
          <Home className="w-5 h-5" /> ReelDrop🎬
        </Link>

        {/* Account / Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="btn btn-ghost btn-circle p-2"
          >
            <User className="w-5 h-5" />
          </button>

          <div
            className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md border border-gray-200 transition-all duration-200 ${
              dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {session ? (
              <>
                <div className="px-4 py-2 text-gray-700 text-sm">
                  Hello, <span className="font-medium">{session.user?.email?.split("@")[0]}</span>
                </div>
                <div className="border-t border-gray-200"></div>

                <Link
                  href="/upload"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                  onClick={() => showNotification("Go to Upload Video", "info")}
                >
                  Upload Video
                </Link>

                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 btn  btn-ghost text-red-500 text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                  onClick={() => showNotification("Please login first", "info")}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                  onClick={() => showNotification("Create a new account", "info")}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
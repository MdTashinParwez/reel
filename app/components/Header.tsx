// "use client";

// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { Home, User } from "lucide-react";
// import { useNotification } from "./Notification";

// export default function Header() {
//   const { data: session } = useSession();
//   const { showNotification } = useNotification();

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       showNotification("Signed out successfully", "success");
//     } catch {
//       showNotification("Failed to sign out", "error");
//     }
//   };

//   return (
//     <div className="navbar bg-base-300 sticky top-0 z-40">
//       <div className="container mx-auto">
//         <div className="flex-1 px-2 lg:flex-none">
//           <Link
//             href="/"
//             className="btn btn-ghost text-xl gap-2 normal-case font-bold"
//             prefetch={true}
//             onClick={() =>
//               showNotification("Welcome to ReelDrop", "info")
//             }
//           >
//             <Home className="w-5 h-5" />
//              ReelDrop 🎬
//           </Link>
//         </div>
//         <div className="flex flex-1 justify-end px-2">
//           <div className="flex items-stretch gap-2">
//             <div className="dropdown dropdown-end">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost btn-circle"
//               >
//                 <User className="w-5 h-5" />
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="dropdown-content `z-[1]` shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2"
//               >
//                 {session ? (
//                   <>
//                     <li className="px-4 py-1">
//                       <span className="text-sm opacity-70">
//                         {session.user?.email?.split("@")[0]}
//                       </span>
//                     </li>
//                     <div className="divider my-1"></div>

//                     <li>
//                       <Link
//                         href="/upload"
//                         className="px-4 py-2 hover:bg-base-200 block w-full"
//                         onClick={() =>
//                           showNotification("Welcome to Admin Dashboard", "info")
//                         }
//                       >
//                         Video Upload
//                       </Link>
//                     </li>

//                     <li>
//                       <button
//                         onClick={handleSignOut}
//                         className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
//                       >
//                         Sign Out
//                       </button>
//                     </li>
//                   </>
//                 ) : (
//                   <li>
//                     <Link
//                       href="/login"
//                       className="px-4 py-2 hover:bg-base-200 block w-full"
//                       onClick={() =>
//                         showNotification("Please sign in to continue", "info")
//                       }
//                     >
//                       Login
//                     </Link>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }"use client";

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
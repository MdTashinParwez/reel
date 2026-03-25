// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useNotification } from "../components/Notification";
// import Link from "next/link";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();
//   const { showNotification } = useNotification();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const result = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     if (result?.error) {
//       showNotification(result.error, "error");
//     } else {
//       showNotification("Login successful!", "success");
//       router.push("/");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="email" className="block mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="block mb-1">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Login
//         </button>
//         <p className="text-center mt-4">
//           Don&apos;t have an account?{" "}
//           <Link href="/register" className="text-blue-500 hover:text-blue-600">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      showNotification(result.error, "error");
    } else {
      showNotification("Login successful!", "success");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 rounded-2xl bg-gray-900 border border-gray-800 shadow-xl"
      >
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-2">
          ReelDrop 🎬
        </h1>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Sign in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className={`w-full mt-1 p-3 rounded-lg bg-gray-800 border ${
                error ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-400">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className={`w-full mt-1 p-3 pr-10 rounded-lg bg-gray-800 border ${
                error ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm -mt-2">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="px-3 text-gray-500 text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

      
        <div className="space-y-3">
          <button
            disabled
            className="w-full py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 cursor-not-allowed"
          >
            Continue with Google (Coming soon)
          </button>

          <button
            disabled
            className="w-full py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 cursor-not-allowed"
          >
            Continue with Instagram (Coming soon)
          </button>

       
        </div>

        {/* Info Text */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Social login is not available yet. Please use email & password.
        </p>

        {/* Footer */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-pink-500 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

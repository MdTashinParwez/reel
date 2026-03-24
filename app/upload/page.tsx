// "use client";

// import VideoUploadForm from "../components/videoUploadForm";

// export default function VideoUploadPage() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8">Upload New Reel</h1>
//         <VideoUploadForm />
//       </div>
//     </div>
//   );
// }
"use client";

import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import VideoUploadForm from "../components/videoUploadForm";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-6"
      >
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Upload Reel 🎬</h1>
          <p className="text-gray-400 text-sm">Post your video in one go</p>
        </div>

        {/* SINGLE CLEAN UPLOAD SECTION */}
        <div className="border-2 border-dashed border-gray-700 hover:border-pink-500 rounded-xl p-6 transition space-y-4">
          <div className="text-center">
            <UploadCloud className="mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-300">Upload your video</p>
            <p className="text-xs text-gray-500">Max size: 100MB</p>
          </div>

          {/* Everything handled inside form */}
          <VideoUploadForm />
        </div>
      </motion.div>
    </div>
  );
}

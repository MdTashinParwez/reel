// // "use client";

// // import React, { useEffect, useState } from "react";
// // import VideoFeed from "./components/videoFeed";
// // import { IVideo } from "@/models/videos";
// // import { apiClient } from "@/lib/api-client";

// // export default function Home() {
// //   const [videos, setVideos] = useState<IVideo[]>([]);

// //   useEffect(() => {
// //     const fetchVideos = async () => {
// //       try {
// //         const data = await apiClient.getVideos();
// //         setVideos(data);
// //       } catch (error) {
// //         console.error("Error fetching videos:", error);
// //       }
// //     }; 

// //     fetchVideos();
// //   }, []);

// //   return (
// //     <main className="container mx-auto px-4 py-8">
// //       <h1 className="text-3xl font-bold mb-8"> Reels</h1>
// //       <VideoFeed videos={videos} />
// //     </main>
// //   );
// // }
// "use client";

// import React, { useEffect, useState } from "react";
// import VideoFeed from "./components/videoFeed";
// import { IVideo } from "@/models/videos";
// import { apiClient } from "@/lib/api-client";
// import { Loader2 } from "lucide-react";
// import Link from "next/link";

// export default function Home() {
//   const [videos, setVideos] = useState<IVideo[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const data = await apiClient.getVideos();
//         setVideos(data);
//       } catch (error) {
//         console.error("Error fetching videos:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   return (
//     <main className="h-screen w-full bg-black text-white overflow-hidden">
      
//       {/* 🔥 Navbar */}
//       <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-3 bg-black/60 backdrop-blur">
//         <h1 className="text-lg font-semibold">ReelDrop 🎬</h1>

//         <div className="flex items-center gap-3">
//           <Link href="/upload">
//             <button className="text-sm bg-pink-500 px-4 py-1.5 rounded-full hover:bg-pink-600 transition">
//               Upload
//             </button>
//           </Link>

//           <Link href="/login" className="text-sm text-gray-300 hover:text-white">
//             Login
//           </Link>

//           <Link
//             href="/register"
//             className="text-sm bg-white text-black px-3 py-1 rounded-full hover:bg-gray-200"
//           >
//             Register
//           </Link>
//         </div>
//       </div>

      
//       {loading ? (
//         <div className="flex items-center justify-center h-screen">
//           <Loader2 className="animate-spin" size={30} />
//         </div>
//       ) : videos.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-screen text-gray-400">
//           <p className="text-lg">No reels yet 😔</p>
//           <p className="text-sm mt-2">Be the first to upload 🚀</p>
//         </div>
//       ) : (
//         <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
//           <VideoFeed videos={videos} />
//         </div>
//       )}
//     </main>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "./components/videoFeed";
import { IVideo } from "@/models/videos";
import { apiClient } from "@/lib/api-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "./components/Header";
// import Header from "./components/Header";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="h-screen w-full bg-black text-white overflow-hidden">

      {/* 🔥 Navbar */}
      <Header />
     

      {/* 🔥 Content */}
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="animate-spin text-white" size={32} />
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen text-gray-400">
          <p className="text-lg">Please login to view videos</p>
          <p className="text-sm mt-2">Login to access your personalized video feed 🚀</p>
        </div>
      ) : (
        <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
          <VideoFeed videos={videos} />
        </div>
      )}
    </main>
  );
}
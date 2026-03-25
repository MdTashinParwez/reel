
"use client";
import React, { useEffect, useState } from "react";
import VideoFeed from "./components/videoFeed";
import { IVideo } from "@/models/videos";
import { apiClient } from "@/lib/api-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "./components/Header";

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
        <Link
            href="/login"
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
          >
            Go to Login
          </Link>

        </div>
      ) : (
        <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
          <VideoFeed videos={videos} />
        </div>
      )}
    </main>
  );
}
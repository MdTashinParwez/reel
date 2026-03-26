"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { useNotification } from "./Notification";
import { apiClient } from "@/lib/api-client";
import FileUpload from "./FileUpload";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPublished, setIsPublished] = useState(false);

  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });

  // ✅ Upload success
  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath);
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);

    showNotification("Video uploaded successfully!", "success");
  };

  // ✅ Upload progress
  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  // ✅ Publish
  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo(data);

      showNotification("Video published successfully!", "success");

      setIsPublished(true); // ✅ important

    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-700 hover:border-pink-500 rounded-xl p-5 text-center transition">
        <p className="text-sm text-gray-300 mb-1">Upload your video</p>
        <p className="text-xs text-gray-500 mb-3">Max size: 100MB</p>

        <FileUpload
          fileType="video"
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
        />

        {uploadProgress > 0 && (
          <div className="w-full bg-gray-800 rounded-full h-2 mt-3">
            <div
              className="`bg-gradient-to-r` from-pink-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <input
          type="text"
          placeholder="Add a title..."
          className={`w-full p-3 rounded-lg bg-gray-800 border ${
            errors.title ? "border-red-500" : "border-gray-700"
          } focus:outline-none focus:ring-2 focus:ring-pink-500`}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <textarea
          rows={3}
          placeholder="Write a description..."
          className={`w-full p-3 rounded-lg bg-gray-800 border ${
            errors.description ? "border-red-500" : "border-gray-700"
          } focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none`}
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Publish Button */}
      <button
        type="submit"
        disabled={loading || !watch("videoUrl")}
        className="w-full py-3 rounded-xl `bg-gradient-to-r` from-pink-500 to-red-500 font-semibold text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Publishing...
          </>
        ) : (
          "🚀 Publish Reel"
        )}
      </button>

      {/* ✅ Success UI */}
      {isPublished && (
        <div className="mt-4 flex flex-col items-center gap-3">
          <p className="text-green-400 text-sm font-medium">
            ✅ Your reel is live now!
          </p>

          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition"
          >
            🎬 Watch on Home
          </button>
        </div>
      )}

    </form>
  );
}
// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
// import { Loader2 } from "lucide-react";
// import { useNotification } from "./Notification";
// import { apiClient } from "@/lib/api-client";
// import FileUpload from "./FileUpload";

// interface VideoFormData {
//   title: string;
//   description: string;
//   videoUrl: string;
//   thumbnailUrl: string;
// }


// export default function VideoUploadForm() {
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const { showNotification } = useNotification();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<VideoFormData>({
//     defaultValues: {
//       title: "",
//       description: "",
//       videoUrl: "",
//       thumbnailUrl: "",
//     },
//   });

//   const handleUploadSuccess = (response: IKUploadResponse) => {
//     setValue("videoUrl", response.filePath);
//     setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
//     showNotification("Video uploaded successfully!", "success");
//   };

//   const handleUploadProgress = (progress: number) => {
//     setUploadProgress(progress);
//   };

//   const onSubmit = async (data: VideoFormData) => {
//     if (!data.videoUrl) {
//       showNotification("Please upload a video first", "error");
//       return;
//     }

//     setLoading(true);
//     try {
//       await apiClient.createVideo(data);
//       showNotification("Video published successfully!", "success");

//       // Reset form after successful submission
//       setValue("title", "");
//       setValue("description", "");
//       setValue("videoUrl", "");
//       setValue("thumbnailUrl", "");
//       setUploadProgress(0);
//     } catch (error) {
//       showNotification(
//         error instanceof Error ? error.message : "Failed to publish video",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <div className="form-control">
//         <label className="label">Title</label>
//         <input
//           type="text"
//           className={`input input-bordered ${
//             errors.title ? "input-error" : ""
//           }`}
//           {...register("title", { required: "Title is required" })}
//         />
//         {errors.title && (
//           <span className="text-error text-sm mt-1">
//             {errors.title.message}
//           </span>
//         )}
//       </div>

//       <div className="form-control">
//         <label className="label">Description</label>
//         <textarea
//           className={`textarea textarea-bordered h-24 ${
//             errors.description ? "textarea-error" : ""
//           }`}
//           {...register("description", { required: "Description is required" })}
//         />
//         {errors.description && (
//           <span className="text-error text-sm mt-1">
//             {errors.description.message}
//           </span>
//         )}
//       </div>

//       <div className="form-control">
//         <label className="label">Upload Video</label>
//         <FileUpload
//           fileType="video"
//           onSuccess={handleUploadSuccess}
//           onProgress={handleUploadProgress}
//         />
//         {uploadProgress > 0 && (
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//             <div
//               className="bg-primary h-2.5 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             />
//           </div>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="btn btn-primary btn-block"
//         disabled={loading || !uploadProgress}
//       >
//         {loading ? (
//           <>
//             <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//             Publishing Video...
//           </>
//         ) : (
//           "Publish Video"
//         )}
//       </button>
//     </form>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
// import { Loader2 } from "lucide-react";
// import { useNotification } from "./Notification";
// import { apiClient } from "@/lib/api-client";
// import FileUpload from "./FileUpload";

// interface VideoFormData {
//   title: string;
//   description: string;
//   videoUrl: string;
//   thumbnailUrl: string;
// }

// interface ImageKitAuthParams {
//   token: string;
//   expire: number;
//   signature: string;
// }

// export default function VideoUploadForm() {
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [authParams, setAuthParams] = useState<ImageKitAuthParams | null>(null);
//   const { showNotification } = useNotification();

//   const { register, handleSubmit, setValue, formState: { errors } } =
//     useForm<VideoFormData>({
//       defaultValues: {
//         title: "",
//         description: "",
//         videoUrl: "",
//         thumbnailUrl: "",
//       },
//     });

//   // Fetch ImageKit authentication parameters
//   useEffect(() => {
//     const fetchAuth = async () => {
//       try {
//         const res = await fetch("/api/imagekit-auth");
//         if (!res.ok) throw new Error("Failed to authenticate");
//         const data = await res.json();
//         setAuthParams(data);
//       } catch (error) {
//         console.error("ImageKit authentication error:", error);
//         showNotification(
//           error instanceof Error ? error.message : "Authentication failed",
//           "error"
//         );
//       }
//     };
//     fetchAuth();
//   }, [showNotification]);

//   const handleUploadSuccess = (response: IKUploadResponse) => {
//     setValue("videoUrl", response.filePath);
//     setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
//     showNotification("Video uploaded successfully!", "success");
//   };

//   const handleUploadProgress = (progress: number) => {
//     setUploadProgress(progress);
//   };

//   const onSubmit = async (data: VideoFormData) => {
//     if (!data.videoUrl) {
//       showNotification("Please upload a video first", "error");
//       return;
//     }

//     setLoading(true);
//     try {
//       await apiClient.createVideo(data);
//       showNotification("Video published successfully!", "success");

//       // Reset form after successful submission
//       setValue("title", "");
//       setValue("description", "");
//       setValue("videoUrl", "");
//       setValue("thumbnailUrl", "");
//       setUploadProgress(0);
//     } catch (error) {
//       showNotification(
//         error instanceof Error ? error.message : "Failed to publish video",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <div className="form-control">
//         <label className="label">Title</label>
//         <input
//           type="text"
//           className={`input input-bordered ${errors.title ? "input-error" : ""}`}
//           {...register("title", { required: "Title is required" })}
//         />
//         {errors.title && (
//           <span className="text-error text-sm mt-1">{errors.title.message}</span>
//         )}
//       </div>

//       <div className="form-control">
//         <label className="label">Description</label>
//         <textarea
//           className={`textarea textarea-bordered h-24 ${
//             errors.description ? "textarea-error" : ""
//           }`}
//           {...register("description", { required: "Description is required" })}
//         />
//         {errors.description && (
//           <span className="text-error text-sm mt-1">{errors.description.message}</span>
//         )}
//       </div>

//       <div className="form-control">
//         <label className="label">Upload Video</label>
//         {authParams ? (
//           <FileUpload
//             fileType="video"
//             authParams={authParams} // pass authentication params here
//             onSuccess={handleUploadSuccess}
//             onProgress={handleUploadProgress}
//           />
//         ) : (
//           <span className="text-error">Loading upload authentication...</span>
//         )}

//         {uploadProgress > 0 && (
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//             <div
//               className="bg-primary h-2.5 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             />
//           </div>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="btn btn-primary btn-block"
//         disabled={loading || !uploadProgress}
//       >
//         {loading ? (
//           <>
//             <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//             Publishing Video...
//           </>
//         ) : (
//           "Publish Video"
//         )}
//       </button>
//     </form>
//   );
// }


// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
// import { Loader2 } from "lucide-react";
// import { useNotification } from "./Notification";
// import { apiClient } from "@/lib/api-client";
// import FileUpload from "./FileUpload";

// interface VideoFormData {
//   title: string;
//   description: string;
//   videoUrl: string;
//   thumbnailUrl: string;
// }

// export default function VideoUploadForm() {
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const { showNotification } = useNotification();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<VideoFormData>({
//     defaultValues: {
//       title: "",
//       description: "",
//       videoUrl: "",
//       thumbnailUrl: "",
//     },
//   });

//   // ✅ Upload success handler
//   const handleUploadSuccess = (response: IKUploadResponse) => {
//     console.log("UPLOAD SUCCESS:", response);

//     setValue("videoUrl", response.filePath);
//     setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);

//     showNotification("Video uploaded successfully!", "success");
//   };

//   // ✅ Upload progress handler
//   const handleUploadProgress = (progress: number) => {
//     setUploadProgress(progress);
//   };

//   // ✅ Form submit
//   const onSubmit = async (data: VideoFormData) => {
//     if (!data.videoUrl) {
//       showNotification("Please upload a video first", "error");
//       return;
//     }

//     setLoading(true);
//     try {
//       await apiClient.createVideo(data);
//       showNotification("Video published successfully!", "success");

//       // Reset form
//       setValue("title", "");
//       setValue("description", "");
//       setValue("videoUrl", "");
//       setValue("thumbnailUrl", "");
//       setUploadProgress(0);
//     } catch (error) {
//       showNotification(
//         error instanceof Error ? error.message : "Failed to publish video",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {/* Title */}
//       <div className="form-control">
//         <label className="label">Title</label>
//         <input
//           type="text"
//           className={`input input-bordered ${
//             errors.title ? "input-error" : ""
//           }`}
//           {...register("title", { required: "Title is required" })}
//         />
//         {errors.title && (
//           <span className="text-error text-sm mt-1">
//             {errors.title.message}
//           </span>
//         )}
//       </div>

//       {/* Description */}
//       <div className="form-control">
//         <label className="label">Description</label>
//         <textarea
//           className={`textarea textarea-bordered h-24 ${
//             errors.description ? "textarea-error" : ""
//           }`}
//           {...register("description", {
//             required: "Description is required",
//           })}
//         />
//         {errors.description && (
//           <span className="text-error text-sm mt-1">
//             {errors.description.message}
//           </span>
//         )}
//       </div>

//       {/* Upload */}
//       <div className="form-control">
//         <label className="label">Upload Video</label>

//         <FileUpload
//           fileType="video"
//           onSuccess={handleUploadSuccess}
//           onProgress={handleUploadProgress}
//         />

//         {/* Progress bar */}
//         {uploadProgress > 0 && (
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//             <div
//               className="bg-primary h-2.5 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             />
//           </div>
//         )}
//       </div>

//       {/* Submit */}
//       <button
//         type="submit"
//         className="btn btn-primary btn-block"
//         disabled={loading || !uploadProgress}
//       >
//         {loading ? (
//           <>
//             <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//             Publishing Video...
//           </>
//         ) : (
//           "Publish Video"
//         )}
//       </button>
//     </form>
//   );
// }
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
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath);
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
    showNotification("Video uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo(data);
      showNotification("Video published successfully!", "success");

      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      setUploadProgress(0);
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
              className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all duration-300"
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
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
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
        disabled={loading || !uploadProgress}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 font-semibold text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 disabled:opacity-50"
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
    </form>
  );
}

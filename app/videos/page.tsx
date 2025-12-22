"use client";

import { useState, useEffect } from "react";
import { Loader2, Video, Play } from "lucide-react";
import { Navigation } from "@/components/navigation";

interface FeaturedVideo {
  id: string;
  title: string;
  description: string;
  youtube_url: string;
  display_order: number;
}

export default function FeaturedVideosPage() {
  const [videos, setVideos] = useState<FeaturedVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/videos");
      const data = await response.json();

      if (response.ok) {
        setVideos(Array.isArray(data.videos) ? data.videos : []);
      }
    } catch (err) {
      console.error("Failed to load videos:", err);
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#276EF1] to-[#37D2C5] py-20 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                <Play className="w-8 h-8" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Featured Videos
              </h1>
              <p className="text-lg text-white/90">
                Watch highlights from our events, workshops, and student projects
              </p>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-[#276EF1]" />
              </div>
          ) : videos.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => {
                const videoId = extractYouTubeId(video.youtube_url);
                return (
                  <div
                    key={video.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-video bg-gray-900 relative group">
                      {videoId ? (
                        <>
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to default thumbnail if maxresdefault doesn't exist
                              e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                              <Play className="w-8 h-8 text-[#276EF1] ml-1" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Video className="w-16 h-16 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {video.description}
                        </p>
                      )}
                      {videoId && (
                        <a
                          href={`https://www.youtube.com/watch?v=${videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#276EF1] hover:text-[#1e5dd9] font-medium text-sm transition-colors"
                        >
                          <Play className="w-4 h-4" />
                          Watch on YouTube
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <Video className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No videos yet
              </h3>
              <p className="text-gray-600">
                Check back soon for featured videos from our events!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal Section */}
      {videos.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Watch Full Videos
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Click on any video below to watch the full version
              </p>
            </div>
            <div className="space-y-8 max-w-5xl mx-auto">
              {videos.map((video) => {
                const videoId = extractYouTubeId(video.youtube_url);
                if (!videoId) return null;

                return (
                  <div
                    key={video.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-gray-600">{video.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      </div>
    </>
  );
}

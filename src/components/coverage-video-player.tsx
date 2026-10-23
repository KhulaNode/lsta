"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import type { MediaCoverage } from "@/content/media-coverage";

type VideoCoverage = Extract<MediaCoverage, { kind: "Video" }>;

export function CoverageVideoPlayer({ video }: { video: VideoCoverage }) {
  const [playing, setPlaying] = useState(false);

  return <div className="coverage-video-frame">
    {playing ? <iframe
      src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1${video.startAt ? `&start=${video.startAt}` : ""}`}
      title={`${video.title} — ${video.outlet}`}
      referrerPolicy="strict-origin-when-cross-origin"
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
    /> : <button className="coverage-video-preview" type="button" onClick={() => setPlaying(true)} aria-label={`Play ${video.title} here`}>
      <Image src={video.poster} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" />
      <span className="coverage-play-icon"><Play fill="currentColor" size={27} aria-hidden="true" /></span>
      <span className="coverage-play-label">Play video here</span>
    </button>}
  </div>;
}

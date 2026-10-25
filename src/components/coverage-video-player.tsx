"use client";

import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import type { MediaCoverage } from "@/content/media-coverage";

type VideoCoverage = Extract<MediaCoverage, { kind: "Video" }>;

export function CoverageVideoPlayer({ video }: { video: VideoCoverage }) {
  const [status, setStatus] = useState<"preview" | "playing" | "blocked">("preview");

  useEffect(() => {
    const handleBlockedFrame = (event: SecurityPolicyViolationEvent) => {
      if (event.effectiveDirective === "frame-src" && /^https:\/\/(www\.)?google\.com\b/.test(event.blockedURI)) {
        setStatus((current) => current === "playing" ? "blocked" : current);
      }
    };

    document.addEventListener("securitypolicyviolation", handleBlockedFrame);
    return () => document.removeEventListener("securitypolicyviolation", handleBlockedFrame);
  }, []);

  return <div className="coverage-video-frame">
    {status === "playing" ? <>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1${video.startAt ? `&start=${video.startAt}` : ""}`}
        title={`${video.title} — ${video.outlet}`}
        referrerPolicy="strict-origin-when-cross-origin"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        onError={() => setStatus("blocked")}
      />
      <a className="coverage-video-open" href={video.url} target="_blank" rel="noopener noreferrer">Player blank? Watch on YouTube <ArrowUpRight size={14} aria-hidden="true" /></a>
    </> : status === "blocked" ? <div className="coverage-video-fallback">
      <Image src={video.poster} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" />
      <div className="coverage-video-fallback-content">
        <p>Embedded playback is unavailable in this browser.</p>
        <a href={video.url} target="_blank" rel="noopener noreferrer">Watch on YouTube <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </div> : <button className="coverage-video-preview" type="button" onClick={() => setStatus("playing")} aria-label={`Play ${video.title} here`}>
      <Image src={video.poster} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" />
      <span className="coverage-play-icon"><Play fill="currentColor" size={27} aria-hidden="true" /></span>
      <span className="coverage-play-label">Play video here</span>
    </button>}
  </div>;
}

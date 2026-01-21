import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css"; // Default Styling

interface PlayerProps {
  url: string;
}

const AshramPlayer = ({ url }: PlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // 1. Initialize Plyr (The Mask)
    const player = new Plyr(videoRef.current, {
      controls: [
        'play-large', // बीच वाला बड़ा बटन
        'play',       // नीचे वाला छोटा बटन
        'progress',   // वीडियो लाइन (जो अब भूरी होगी)
        'current-time',
        'mute',
        'volume',
        'fullscreen',
      ],
      // YouTube Config to strip everything down
      youtube: {
        noCookie: true, 
        rel: 0, 
        showinfo: 0, 
        iv_load_policy: 3, 
        modestbranding: 1,
        disablekb: 1, // Keyboard shortcuts band
      },
      // Hide standard tooltips for cleaner look
      tooltips: { controls: false, seek: true },
    });

    // 2. Safety: Disable Right Click on the Player (No "Copy Video URL")
    const container = videoRef.current;
    const preventContext = (e: Event) => e.preventDefault();
    container.addEventListener('contextmenu', preventContext);

    // Cleanup when component destroys
    return () => {
      container.removeEventListener('contextmenu', preventContext);
      player.destroy();
    };
  }, [url]);

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border-b-4 border-[#8B4513] bg-black">
      {/* 
        This div becomes the Plyr wrapper.
        'plyr__video-embed' class is required for YouTube embedding in Plyr.
      */}
      <div ref={videoRef} className="plyr__video-embed" id="player">
        <iframe
          src={`${url}?origin=https://plyr.io&iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1`}
          allowFullScreen
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  );
};

export default AshramPlayer;
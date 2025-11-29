'use client';
import '@google/model-viewer';

interface ModelViewerProps {
  src: string;
  alt?: string;
}

export default function ModelViewer({ src, alt }: ModelViewerProps) {
  return (
    <>
      {/* @ts-ignore web-component */}
      <model-viewer
        src={src}
        alt={alt}
        camera-controls
        auto-rotate
        style={{ width: "600px", height: "600px" }}
      />
    </>
  );
}

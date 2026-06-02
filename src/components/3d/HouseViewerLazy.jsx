import { lazy, Suspense } from "react";

const HouseViewer = lazy(() => import("./HouseViewer").then(m => ({ default: m.HouseViewer })));

export function HouseViewerLazy({ compact = false }) {
  return (
    <Suspense fallback={
      <div className="rounded-2xl flex items-center justify-center border" 
        style={{ height: compact ? "300px" : "500px", background: "#0d0d0d", borderColor: "var(--border)" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 animate-spin"
            style={{ borderColor: "rgba(200,169,110,0.2)", borderTopColor: "#C8A96E" }} />
          <span className="text-xs font-mono" style={{ color: "var(--accent)" }}>Loading 3D...</span>
        </div>
      </div>
    }>
      <HouseViewer compact={compact} />
    </Suspense>
  );
}

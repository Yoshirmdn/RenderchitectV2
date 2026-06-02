export function Loader({ fullScreen = false }) {
  return (
    <div
      className={`flex items-center justify-center ${fullScreen ? "fixed inset-0 z-50" : "py-20"}`}
      style={{ background: fullScreen ? "var(--bg-primary)" : "transparent" }}
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2" style={{ borderColor: "rgba(200,169,110,0.2)" }} />
        <div
          className="absolute inset-0 w-16 h-16 rounded-full border-t-2 animate-spin"
          style={{ borderColor: "var(--accent)", borderTopColor: "var(--accent)", borderRightColor: "transparent", borderBottomColor: "transparent", borderLeftColor: "transparent" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
        </div>
      </div>
    </div>
  );
}

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera, useProgress, Html } from "@react-three/drei";

function Loader3D() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-t-amber-400 animate-spin" style={{ borderColor: "rgba(200,169,110,0.2)", borderTopColor: "#C8A96E" }} />
        <span className="text-xs font-mono" style={{ color: "#C8A96E" }}>{Math.round(progress)}%</span>
      </div>
    </Html>
  );
}

function HouseModel({ wireframe }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 1, 2.5]} />
        <meshStandardMaterial color="#1a1a1a" wireframe={wireframe} roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0.3, 1.5, 0.2]} castShadow>
        <boxGeometry args={[2, 0.8, 1.8]} />
        <meshStandardMaterial color="#222222" wireframe={wireframe} roughness={0.2} metalness={0.15} />
      </mesh>
      <mesh position={[0.3, 1.95, 0.2]}>
        <boxGeometry args={[2.2, 0.05, 2]} />
        <meshStandardMaterial color="#2a2a2a" wireframe={wireframe} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.08, 0]}>
        <boxGeometry args={[3.2, 0.08, 2.7]} />
        <meshStandardMaterial color="#151515" wireframe={wireframe} metalness={0.4} />
      </mesh>
      {[-0.8, 0, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 1.26]}>
          <boxGeometry args={[0.6, 0.8, 0.02]} />
          <meshStandardMaterial color="#88aacc" transparent opacity={0.35} wireframe={wireframe} roughness={0} metalness={0.1} />
        </mesh>
      ))}
      <mesh position={[-2.4, -0.05, 0]} receiveShadow>
        <boxGeometry args={[1.5, 0.1, 1.8]} />
        <meshStandardMaterial color="#1a4a6e" transparent opacity={0.85} wireframe={wireframe} roughness={0} />
      </mesh>
      <mesh position={[-2.4, 0.03, 0]}>
        <boxGeometry args={[1.35, 0.01, 1.65]} />
        <meshStandardMaterial color="#2255aa" transparent opacity={0.6} wireframe={wireframe} roughness={0} />
      </mesh>
      <mesh position={[-1.2, -0.05, 0]} receiveShadow>
        <boxGeometry args={[0.9, 0.05, 2]} />
        <meshStandardMaterial color="#1f1f1f" wireframe={wireframe} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.1, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#0e0e0e" wireframe={wireframe} roughness={0.9} />
      </mesh>
      {[[2.5, 0, 1.5], [2.5, 0, -1.5], [-2.2, 0, -1.8]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.8, 6]} />
            <meshStandardMaterial color="#1a1008" wireframe={wireframe} />
          </mesh>
          <mesh position={[0, 1.1, 0]}>
            <coneGeometry args={[0.35, 0.9, 8]} />
            <meshStandardMaterial color="#0e2e0e" wireframe={wireframe} roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function HouseViewer({ compact = false }) {
  const [wireframe, setWireframe] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const height = fullscreen ? "100vh" : compact ? "300px" : "500px";

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border ${fullscreen ? "fixed inset-0 z-50 rounded-none" : ""}`}
      style={{ height, background: "#0d0d0d", borderColor: "var(--border)" }}
    >
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[6, 4, 6]} fov={45} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[8, 12, 5]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
        <directionalLight position={[-5, 8, -3]} intensity={0.4} color="#4466aa" />
        <pointLight position={[-2.4, 0.5, 0]} intensity={3} color="#2255cc" distance={4} />
        <Suspense fallback={<Loader3D />}>
          <HouseModel wireframe={wireframe} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enablePan enableZoom minDistance={3} maxDistance={18}
          minPolarAngle={0.1} maxPolarAngle={Math.PI / 2.1}
          autoRotate autoRotateSpeed={0.6} />
      </Canvas>

      <div className="absolute bottom-4 left-4 flex gap-2">
        <button onClick={() => setWireframe(!wireframe)}
          className="px-3 py-1.5 rounded-lg text-xs font-mono glass transition-colors"
          style={{ color: wireframe ? "var(--accent)" : "rgba(255,255,255,0.6)", border: wireframe ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.15)" }}>
          {wireframe ? "■ Solid" : "⬡ Wire"}
        </button>
        <button onClick={() => setFullscreen(!fullscreen)}
          className="px-3 py-1.5 rounded-lg text-xs font-mono glass transition-colors"
          style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}>
          {fullscreen ? "↙ Exit" : "↗ Full"}
        </button>
      </div>

      <div className="absolute top-4 right-4">
        <span className="px-2.5 py-1 rounded-full text-xs font-mono glass" style={{ color: "rgba(255,255,255,0.5)" }}>
          3D Preview
        </span>
      </div>
    </div>
  );
}

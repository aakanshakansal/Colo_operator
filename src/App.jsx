// import React, { Suspense } from "react";
// import * as THREE from "three";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";

// import Scene from "./components/Scene";

// export default function App() {
//   return (
//     <div className="w-screen h-screen bg-black relative">
//       <Canvas
//         shadows
//         color="#00406B"
//         style={{ width: "100vw", height: "100vh", color: "#00406B" }}
//         camera={{ position: [110, 120, 80], fov: 40 }} // pulled back for full visibility
//         gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
//       >
//         {/* Background */}
//         <color attach="background" args={["#00406B"]} />

//         {/* Lighting Setup */}
//         <ambientLight intensity={0.6} />
//         <directionalLight
//           position={[30, 50, 30]}
//           intensity={1.5}
//           castShadow
//           shadow-mapSize-width={2048}
//           shadow-mapSize-height={2048}
//         />
//         <pointLight position={[-30, 30, -30]} intensity={0.8} />

//         <OrbitControls
//           enableRotate={false} // ❌ no rotation
//           enableZoom={false} // ❌ no zoom
//           enablePan={false} // ❌ no pan
//         />

//         {/* Scene Models */}
//         <Suspense fallback={null}>
//           <Scene />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }

import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Scene from "./components/Scene";

export default function App() {
  return (
    <div className="w-screen h-screen bg-black relative">
      <Canvas
        shadows
        style={{ width: "100vw", height: "100vh" }}
        camera={{ position: [110, 120, 80], fov: 40 }} // pulled back for full visibility
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        {/* Background */}
        <color attach="background" args={["#00406B"]} />

        {/* Lighting Setup */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[30, 50, 30]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-30, 30, -30]} intensity={0.8} />

        {/* Orbit Controls */}
        <OrbitControls
          enableRotate={false} // ❌ no rotation
          enableZoom={false} // ❌ no zoom
          enablePan={false} // ❌ no pan
        />

        {/* Grid Floor */}
        <gridHelper
          args={[200, 20, "#00ffff", "#ffffff"]}
          position={[0, 0, 0]}
        />
        {/* args = [size, divisions, colorCenterLine, colorGrid] */}
        {/* Here size = 200, divisions = 50 → each box = size/divisions = 200/50 = 4 units */}

        {/* Scene Models */}
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

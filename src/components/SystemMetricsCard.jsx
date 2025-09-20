// // import React, { useRef } from "react";
// // import { Html } from "@react-three/drei";

// // export default function SystemMetricsCard({ position }) {
// //   const cardRef = useRef();

// //   return (
// //     <group position={position}>
// //       <Html center transform distanceFactor={10}>
// //         <div
// //           ref={cardRef}
// //           style={{
// //             background:
// //               "linear-gradient(180deg, rgba(0,40,70,0.9) 0%, rgba(0,20,40,0.95) 100%)",
// //             border: "1px solid rgba(0,200,255,0.4)",
// //             borderRadius: "12px",
// //             padding: "18px",
// //             width: "220px",
// //             color: "#ffffff",
// //             fontFamily: "Arial, sans-serif",
// //             boxShadow: "0px 0px 15px rgba(0,200,255,0.3)",
// //           }}
// //         >
// //           {/* Header */}
// //           <h3
// //             style={{
// //               fontSize: "16px",
// //               fontWeight: "bold",
// //               marginBottom: "14px",
// //               textAlign: "center",
// //               color: "#ffffff",
// //               textShadow: "0 0 10px rgba(0,200,255,0.6)",
// //               letterSpacing: "1px",
// //             }}
// //           >
// //             SYSTEM METRICS
// //           </h3>

// //           {/* Metrics grid */}
// //           <div
// //             style={{
// //               display: "grid",
// //               gridTemplateColumns: "1fr 1fr",
// //               gap: "12px",
// //               textAlign: "center",
// //             }}
// //           >
// //             {/* Efficiency */}
// //             <div>
// //               <div style={{ fontSize: "18px", fontWeight: "bold" }}>93%</div>
// //               <div style={{ fontSize: "12px", opacity: 0.8 }}>EFFICIENCY</div>
// //             </div>

// //             {/* PUE */}
// //             <div>
// //               <div style={{ fontSize: "18px", fontWeight: "bold" }}>1.2</div>
// //               <div style={{ fontSize: "12px", opacity: 0.8 }}>PUE</div>
// //             </div>

// //             {/* Avg Temp */}
// //             <div>
// //               <div style={{ fontSize: "18px", fontWeight: "bold" }}>24°C</div>
// //               <div style={{ fontSize: "12px", opacity: 0.8 }}>AVG TEMP</div>
// //             </div>

// //             {/* Uptime */}
// //             <div>
// //               <div style={{ fontSize: "18px", fontWeight: "bold" }}>99.9%</div>
// //               <div style={{ fontSize: "12px", opacity: 0.8 }}>UPTIME</div>
// //             </div>
// //           </div>
// //         </div>
// //       </Html>
// //     </group>
// //   );
// // }

// import React, { useRef } from "react";
// import { Html } from "@react-three/drei";

// export default function SystemMetricsCard({
//   position,
//   rotation = [0, -5.5, 0],
// }) {
//   const cardRef = useRef();

//   return (
//     <group position={position} rotation={rotation}>
//       <Html center transform distanceFactor={10}>
//         <div
//           ref={cardRef}
//           style={{
//             background:
//               "linear-gradient(180deg, rgba(0,40,70,0.9) 0%, rgba(0,20,40,0.95) 100%)",
//             border: "1px solid rgba(0,200,255,0.4)",
//             borderRadius: "6px",
//             padding: "40px",
//             width: "1000px",
//             height: "750px",
//             color: "#ffffff",
//             fontFamily: "Arial, sans-serif",
//             boxShadow: "0px 0px 6px rgba(0,200,255,0.3)",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//           }}
//         >
//           {/* Header */}
//           <h3
//             style={{
//               fontSize: "80px",
//               fontWeight: "bold",
//               textAlign: "center",
//               margin: 0,
//               marginBottom: "60px",
//               color: "#ffffff",
//               textShadow: "0 0 3px rgba(0,200,255,0.6)",
//               letterSpacing: "0.5px",
//             }}
//           >
//             SYSTEM METRICS
//           </h3>

//           {/* Metrics grid */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: "80px",
//               textAlign: "center",
//               flex: 1,
//             }}
//           >
//             <div>
//               <div style={{ fontSize: "80px", fontWeight: "800" }}>
//                 8.325 MW
//               </div>
//               <div style={{ fontSize: "70px", fontWeight: "550" }}>
//                 Total capacity
//               </div>
//             </div>
//             <div>
//               <div style={{ fontSize: "80px", fontWeight: "bold" }}>4.8MW</div>
//               <div style={{ fontSize: "70px", fontWeight: "550" }}>
//                 Peak Elasticity
//               </div>
//             </div>
//             {/* Efficiency */}
//             <div>
//               <div style={{ fontSize: "80px", fontWeight: "bold" }}>93%</div>
//               <div style={{ fontSize: "70px", fontWeight: "550" }}>
//                 Utilization
//               </div>
//             </div>

//             {/* PUE */}
//             <div>
//               <div style={{ fontSize: "80px", fontWeight: "bold" }}>1.5</div>
//               <div style={{ fontSize: "70px", fontWeight: "550" }}>PUE</div>
//             </div>

//             {/* Uptime */}
//           </div>
//         </div>
//       </Html>
//     </group>
//   );
// }

import React, { useRef, useState } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export default function SystemMetricsCard({
  position,
  rotation = [0, -5.5, 0],
  width = 40,
  height = 30,
}) {
  const cardRef = useRef();
  const borderRef = useRef();
  const [hovered, setHovered] = useState(false);

  return (
    <group
      ref={cardRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Card Background */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          color="black"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Card Border */}
      <lineSegments ref={borderRef}>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
        <lineBasicMaterial color="#ffffff" linewidth={2} />
      </lineSegments>

      {/* Title */}
      <Text
        position={[0, height / 2 - 1, 0.1]}
        fontSize={3.5}
        color="white"
        anchorX="center"
        anchorY="top"
        outlineWidth={0.2}
        outlineColor="#ffffff"
      >
        SYSTEM METRICS
      </Text>

      {/* Metrics Grid */}
      {/* Row 1 */}
      <Text
        position={[-width / 4, 5, 0.1]}
        fontSize={2.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        8.325 MW{"\n"}Total Capacity
      </Text>

      <Text
        position={[width / 4, 5, 0.1]}
        fontSize={2.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        4.8 MW{"\n"}Peak Elasticity
      </Text>

      {/* Row 2 */}
      <Text
        position={[-width / 4, -5, 0.1]}
        fontSize={2.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        93%{"\n"}Utilization
      </Text>

      <Text
        position={[width / 4, -5, 0.1]}
        fontSize={2.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        1.5{"\n"}PUE
      </Text>
    </group>
  );
}

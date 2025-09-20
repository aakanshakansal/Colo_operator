import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import SystemMetricsCard from "./SystemMetricsCard";

// Generic GLTF Loader function
function GLTFModel({
  path,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}) {
  const { scene } = useGLTF(path);
  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}

// Power Cable Component (black transparent wire)
function PowerCable({ start, end, color = "#000000" }) {
  const { geometry } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(
        start[0],
        start[1] + 8,
        start[2] + (end[2] - start[2]) * 0.3
      ),
      new THREE.Vector3(end[0], end[1] + 8, end[2] - (end[2] - start[2]) * 0.3),
      new THREE.Vector3(...end),
    ]);
    const geometry = new THREE.TubeGeometry(curve, 64, 0.3, 12, false);
    return { geometry };
  }, [start, end]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.5}
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  );
}

// Power Particle Component
function PowerParticle({ start, end, color = "#00FF88", delay = 0 }) {
  const groupRef = useRef();
  const mainMatRef = useRef();
  const glowMatRef = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3(
        start[0],
        start[1] + 8,
        start[2] + (end[2] - start[2]) * 0.3
      ),
      new THREE.Vector3(end[0], end[1] + 8, end[2] - (end[2] - start[2]) * 0.3),
      new THREE.Vector3(...end),
    ]);
  }, [start, end]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = ((state.clock.elapsedTime * 1.5 + delay) % 3) / 3;
      const position = curve.getPointAt(t);
      groupRef.current.position.copy(position);

      const tubeRadius = 0.3;
      const offset = new THREE.Vector3()
        .random()
        .subScalar(0.5)
        .multiplyScalar(tubeRadius);
      groupRef.current.position.add(offset);

      const opacity = Math.sin(t * Math.PI) * 0.7 + 0.3;
      const scale = 0.5 + Math.sin(t * Math.PI * 2) * 0.2;
      groupRef.current.scale.setScalar(scale);
      if (mainMatRef.current) mainMatRef.current.opacity = opacity;
      if (glowMatRef.current) glowMatRef.current.opacity = opacity * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          ref={mainMatRef}
          color={color}
          transparent
          opacity={1.5}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.6, 12, 12]} />
        <meshBasicMaterial
          ref={glowMatRef}
          color={color}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

// Info Card Component with Hover Effect and Position Offset
// function InfoCard({
//   position,
//   positionOffset = [0, 18, 0],
//   title,
//   mw,
//   rotation = [0, 0, 0],
// }) {
//   const [hovered, setHovered] = useState(false);
//   const cardRef = useRef();

//   // Combine position and positionOffset
//   const finalPosition = [
//     position[0] + positionOffset[0],
//     position[1] + positionOffset[1],
//     position[2] + positionOffset[2],
//   ];

//   useFrame(() => {
//     if (cardRef.current) {
//       cardRef.current.scale.setScalar(hovered ? 1.2 : 1);
//     }
//   });

//   return (
//     <group
//       ref={cardRef}
//       position={finalPosition}
//       rotation={rotation}
//       onPointerOver={() => setHovered(true)}
//       onPointerOut={() => setHovered(false)}
//     >
//       <mesh>
//         <planeGeometry args={[20, 10]} />
//         <meshBasicMaterial
//           color="#1ae8ff"
//           transparent
//           opacity={0.3}
//           side={THREE.DoubleSide}
//         />
//       </mesh>
//       <Text
//         position={[0, 3, 0.1]}
//         fontSize={3.5}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//         side={THREE.DoubleSide}
//       >
//         {title}
//       </Text>
//       <Text
//         position={[0, -2, 0.1]}
//         fontSize={2.5}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//         side={THREE.DoubleSide}
//       >
//         {mw} MW
//       </Text>
//     </group>
//   );
// }

function InfoCard({
  position,
  positionOffset = [0, 18, 0],
  title,
  mw,
  rotation = [0, 0, 0],
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef();

  // Combine position and positionOffset
  const finalPosition = [
    position[0] + positionOffset[0],
    position[1] + positionOffset[1],
    position[2] + positionOffset[2],
  ];

  useFrame(() => {
    if (cardRef.current) {
      cardRef.current.scale.setScalar(hovered ? 1.2 : 1);
    }
  });

  const width = 20;
  const height = 10;

  return (
    <group
      ref={cardRef}
      position={finalPosition}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Card background */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          color="#1ae8ff"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Neon border */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
        <lineBasicMaterial color="#00eaff" linewidth={2} />
      </lineSegments>

      {/* Title */}
      <Text
        position={[0, 3, 0.1]}
        fontSize={3.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.2}
        outlineColor="#00eaff"
      >
        {title}
      </Text>

      {/* MW Value */}
      <Text
        position={[0, -2, 0.1]}
        fontSize={2.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {mw} MW
      </Text>
    </group>
  );
}

// Main Scene Component
export default function DatacenterPowerFlow() {
  const sources = {
    solar1: [0, 5, -80],
    solar2: [-50, 5, -80],
    smr: [50, 8, 20],
    grid: [-75, 7, 70],
    generator: [50, 0.5, -90],
    bess: [-40, 1.5, -30],
    superCap: [0, 3, -98],
    ups: [-14, 0, -10],
  };

  const datacenter = [27, 1.0, 50];

  // Adjusted connection points for model-to-model alignment
  const connectionPoints = {
    generator: [-10, 2.5, -8],
    ups: [-14, 0, -10],
    bess: [-55, 1.5, -30],
    datacenter: [27, 1.0, 50],
    grid: [20, 0, 120],
  };

  // Log connectionPoints.ups for debugging
  useEffect(() => {
    console.log("connectionPoints.ups:", connectionPoints.ups);
  }, []);

  // Utility to create multiple particles per cable
  const renderParticles = (start, end, color) => {
    return [0, 1, 2, 3, 4, 5, 6].map((i) => (
      <PowerParticle key={i} start={start} end={end} color={color} delay={i} />
    ));
  };

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[20, 40, 20]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight
        position={[-20, 30, -20]}
        intensity={1.8}
        color="#FFFFFF"
      />
      <pointLight position={[5, 0, -60]} intensity={1.2} color="#FFFFFF" />
      <pointLight position={[0, 25, 0]} intensity={1.2} color="#FFFFFF" />
      <pointLight position={[30, 15, -30]} intensity={0.8} color="#4488FF" />
      <pointLight position={[-30, 15, 30]} intensity={0.8} color="#44FF88" />
      <spotLight
        position={[0, 40, 0]}
        angle={Math.PI / 6}
        penumbra={0.3}
        intensity={2}
        color="#FFFFFF"
        castShadow
      />
      {/* Ground + Walls with Background */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        position={[0, -0.1, 0]}
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color="#0a1a2a"
          roughness={0.8}
          metalness={0.2}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Models */}
      <GLTFModel
        path="/Datacenter2.glb"
        position={datacenter}
        scale={[11, 11, 11]}
      />

      <GLTFModel
        path="/Bess.glb"
        position={sources.bess}
        scale={[15, 15, 15]}
      />
      <InfoCard
        position={[0, 1.5, 40]}
        rotation={[0, -5, 0]}
        positionOffset={[0, 18, 0]}
        title="BESS"
        mw="2.5"
      />
      <GLTFModel path="/UPS.glb" position={sources.ups} scale={[25, 25, 25]} />
      <InfoCard
        position={[50, 1.0, -30]}
        rotation={[0, -5.5, 0]}
        positionOffset={[0, 20, 0]}
        title="UPS"
        mw="0.5"
      />

      <SystemMetricsCard position={[-60, 10.0, -10]} rotation={[0, -5.2, 0]} />

      <GLTFModel
        path="/SuperCapacitor.glb"
        position={sources.superCap}
        scale={[25, 25, 25]}
      />
      <InfoCard
        position={sources.superCap}
        positionOffset={[0, 20, 0]}
        title="Super Cap."
        mw="0.3"
      />
      <GLTFModel
        path="/Grid.glb"
        position={sources.grid}
        scale={[10, 10, 10]}
      />
      <InfoCard
        position={[-40, 7, 70]}
        rotation={[0, -5.5, 0]}
        positionOffset={[0, 18, 0]}
        title="Grid"
        mw="5.5"
      />
      <GLTFModel path="/SMR.glb" position={sources.smr} scale={[20, 20, 20]} />
      <InfoCard
        position={sources.smr}
        rotation={[0, -5.5, 0]}
        positionOffset={[0, 18, 0]}
        title="SMR"
        mw="2.5"
      />
      <GLTFModel
        path="/SolarPanel.glb"
        position={sources.solar1}
        scale={[15, 15, 15]}
      />
      <InfoCard
        position={[15, 5, -30]}
        rotation={[0, -5.5, 0]}
        positionOffset={[0, 20, 0]}
        title="Datacenter"
        mw="8.3"
      />
      <GLTFModel
        path="/SolarPanel.glb"
        position={sources.solar2}
        scale={[10, 10, 10]}
      />
      <InfoCard
        position={[-30, 5, -50]}
        rotation={[0, -5, 0]}
        positionOffset={[0, 30, 0]}
        title="Solar"
        mw="1.2"
      />
      <GLTFModel
        path="/Generator.glb"
        position={sources.generator}
        scale={[16, 16, 16]}
      />
      <InfoCard
        position={[50, 0, -90]}
        positionOffset={[0, 25, 0]}
        title="Generator"
        mw="2"
      />
      {/* Power Cables */}
      <PowerCable start={sources.smr} end={connectionPoints.ups} />
      <PowerCable start={sources.solar1} end={connectionPoints.ups} />
      <PowerCable start={sources.solar2} end={connectionPoints.ups} />
      <PowerCable
        start={connectionPoints.generator}
        end={connectionPoints.ups}
      />
      <PowerCable start={[-55, 1.5, -80]} end={connectionPoints.ups} />
      <PowerCable start={sources.superCap} end={connectionPoints.ups} />
      <PowerCable
        start={connectionPoints.ups}
        end={connectionPoints.datacenter}
      />
      <PowerCable start={[0, 0, 0]} end={[50, 10, -24]} />
      <PowerCable start={[0, 0, 0]} end={[50, 10, -90]} />
      <PowerCable start={[0, 0, 0]} end={[55, 10, -90]} />
      <PowerCable start={[0, 0, 0]} end={[-50, 10, -90]} />
      <PowerCable start={[0, 0, 0]} end={[-80, 10, 68]} />
      <PowerCable start={[0, 0, 0]} end={[-80, 10, 70]} />
      <PowerCable
        start={connectionPoints.generator}
        end={connectionPoints.datacenter}
      />
      <PowerCable
        start={connectionPoints.ups}
        end={connectionPoints.datacenter}
      />
      {/* Particles */}
      {renderParticles(sources.grid, connectionPoints.ups, "#FFD700")}
      {renderParticles(sources.smr, connectionPoints.ups, "#FF6B35")}
      {renderParticles(sources.solar1, connectionPoints.ups, "#4ECDC4")}
      {renderParticles(sources.solar2, connectionPoints.ups, "#4ECDC4")}
      {renderParticles([-55, 1.5, -80], connectionPoints.ups, "#9B59B6")}
      {renderParticles(sources.superCap, connectionPoints.ups, "#E74C3C")}
      {renderParticles([50, 10, -24], [0, 0, 0], "#FFD700")}
      {renderParticles([50, 10, -90], [0, 0, 0], "#FFD700")}
      {renderParticles([55, 10, -90], [0, 0, 0], "#FFD700")}
      {renderParticles([-80, 10, 70], [0, 0, 0], "#FFD700")}
      {renderParticles([-80, 10, 68], [0, 0, 0], "#FFD700")}
      {renderParticles(
        connectionPoints.datacenter,
        connectionPoints.ups,
        "#00FF88"
      )}
      {renderParticles(
        connectionPoints.datacenter,
        connectionPoints.generator,
        "#00FF88"
      )}
    </>
  );
}

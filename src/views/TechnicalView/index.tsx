import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import {
  Zap,
  Activity,
  Battery,
  Signal,
  Wind,
  Navigation2,
  Thermometer,
  AlertTriangle,
  Cpu,
  Shield,
  Gauge
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './style.scss';

interface TechnicalViewProps {
  data: any;
  selectedDrone: string;
}

const Propeller = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 30;
    }
  });

  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      {/* Propeller Hub */}
      <mesh>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      {/* Blades */}
      <mesh ref={meshRef}>
        <boxGeometry args={[0.8, 0.01, 0.05]} />
        <meshStandardMaterial color="#fff" emissive="#3b82f6" emissiveIntensity={2} transparent opacity={0.8} />
      </mesh>
      <mesh ref={meshRef} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.8, 0.01, 0.05]} />
        <meshStandardMaterial color="#fff" emissive="#3b82f6" emissiveIntensity={2} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

const VTOLModel = () => {
  return (
    <group>
      {/* Sleek Delta Wing */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.5, 0.05, 1.8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Central Fuselage */}
      <mesh position={[0, 0.15, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.25, 2, 4, 16]} />
        <meshStandardMaterial color="#475569" metalness={1} roughness={0.2} />
      </mesh>

      {/* 4 VTOL Rotors */}
      {[[-1.6, 0.1, 0.8], [1.6, 0.1, 0.8], [-1.6, 0.1, -0.8], [1.6, 0.1, -0.8]].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
           <mesh>
              <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
              <meshStandardMaterial color="#1e293b" />
           </mesh>
           <Propeller position={[0, 0.1, 0]} />
        </group>
      ))}
    </group>
  );
};

const ReconModel = () => {
  return (
    <group>
      {/* Long wings for high altitude */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 0.05, 0.8]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      {/* Slender Body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.1, 3, 32]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      {/* Large Camera Gimbal */}
      <mesh position={[0, -0.2, 1.2]}>
         <sphereGeometry args={[0.25, 16, 16]} />
         <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* Rear Prop */}
      <Propeller position={[0, 0, -1.6]} />
    </group>
  );
};

const KamikazeModel = () => {
  return (
    <group>
        {/* Main Fuselage - Cylindrical Loitering Munition Body */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 2.5, 32]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Seeker Head (Front Camera/Sensor) */}
        <mesh position={[0, 0, 1.25]}>
          <sphereGeometry args={[0.2, 32, 16]} />
          <meshStandardMaterial color="#475569" />
          {/* Camera Lens */}
          <mesh position={[0, 0, 0.15]}>
            <circleGeometry args={[0.08, 32]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </mesh>

        {/* Rear Pusher Engine Section */}
        <mesh position={[0, 0, -1.35]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.2, 16]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>

        {/* X-Wings Configuration (Lancet Style) */}
        
        {/* Front X-Wings */}
        {[Math.PI / 4, -Math.PI / 4, 3 * Math.PI / 4, -3 * Math.PI / 4].map((angle, i) => (
          <mesh key={`f-${i}`} position={[0, 0, 0.4]} rotation={[0, 0, angle]}>
             <boxGeometry args={[2.5, 0.02, 0.4]} />
             <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.4} />
             {/* Glow strip on wings */}
             <mesh position={[0, 0.012, 0]}>
                <planeGeometry args={[2.4, 0.05]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
             </mesh>
          </mesh>
        ))}

        {/* Rear X-Wings (Smaller Control Surfaces) */}
        {[Math.PI / 4, -Math.PI / 4, 3 * Math.PI / 4, -3 * Math.PI / 4].map((angle, i) => (
          <mesh key={`r-${i}`} position={[0, 0, -0.8]} rotation={[0, 0, angle]}>
             <boxGeometry args={[1.8, 0.02, 0.3]} />
             <meshStandardMaterial color="#94a3b8" />
          </mesh>
        ))}

        {/* Rear Pusher Propeller */}
        <Propeller position={[0, 0, -1.45]} />

        {/* Tactical Markings */}
        <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.1, 0.8]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.9} />
        </mesh>
    </group>
  );
};

const DroneModel = ({ roll, pitch, selectedDrone }: { roll: number, pitch: number, selectedDrone: string }) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (pitch * Math.PI) / 180, 0.1);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, (-roll * Math.PI) / 180, 0.1);
    }
  });

  return (
    <group ref={group}>
      <Float speed={4} rotationIntensity={0.2} floatIntensity={0.4}>
        {selectedDrone === 'kamikaze' && <KamikazeModel />}
        {selectedDrone === 'vtol' && <VTOLModel />}
        {selectedDrone === 'recon' && <ReconModel />}
      </Float>
    </group>
  );
};

const TechnicalView: React.FC<TechnicalViewProps> = ({ data, selectedDrone }) => {
  const { t } = useTranslation();
  return (
    <div className="technical-view-container tactical-3d mono">
      <div className="tech-header-v2">
        <div className="left-meta">
          <div className="badge primary">{t('views.technical.systemTitle')}</div>
          <div className="badge success">{t('views.technical.connActive')}</div>
          <div className="lat-lng">{t('views.technical.sysOk')}</div>
        </div>
        <div className="center-meta">
          <div className="mission-timer">{t('views.technical.missionTime', { time: data.timer.toFixed(1) })}</div>
          <div className="date-display">2024.03.07 16:21:51</div>
        </div>
        <div className="right-meta">
          <div className="badge warn">{t('views.technical.autoMode')}</div>
          <div className="system-time">{data.systemTime}</div>
        </div>
      </div>

      <div className="tech-main-layout">
        {/* Left Side: System & Power */}
        <div className="side-panel left">
          <div className="panel-item">
            <div className="header"><Zap size={14} /> {t('views.technical.powerManagement')}</div>
            <div className="grid-stats">
              <div className="stat"><span>{t('views.technical.voltage')}</span> 24.8V</div>
              <div className="stat"><span>{t('views.technical.current')}</span> 12.4A</div>
              <div className="stat"><span>{t('views.technical.power')}</span> 307Vt</div>
              <div className="stat"><span>{t('views.technical.remain')}</span> 86%</div>
            </div>
            <div className="power-bar"><div className="fill" style={{ width: '86%' }}></div></div>
          </div>

          <div className="panel-item">
            <div className="header"><Cpu size={14} /> {t('views.technical.flightController')}</div>
            <div className="esc-grid">
              <div className="esc-node active">M1: 34°C</div>
              <div className="esc-node active">M2: 36°C</div>
              <div className="esc-node active">M3: 33°C</div>
              <div className="esc-node active">M4: 35°C</div>
            </div>
            <div className="cpu-load">
              <span>{t('views.technical.cpuLoad')}</span>
              <div className="load-dots">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className={`dot ${i < 4 ? 'active' : ''}`}></div>)}
              </div>
            </div>
          </div>

          <div className="panel-item">
            <div className="header"><Shield size={14} /> {t('views.technical.avionics')}</div>
            <div className="sensor-list">
              <div className="s-item"><span>{t('views.technical.imuMain')}</span> <span className="val green">OK</span></div>
              <div className="s-item"><span>{t('views.technical.imuBackup')}</span> <span className="val green">OK</span></div>
              <div className="s-item"><span>{t('views.technical.barometer')}</span> <span className="val green">1013 hPa</span></div>
              <div className="s-item"><span>{t('views.technical.magnetometer')}</span> <span className="val yellow">{t('views.technical.tuning')}</span></div>
              <div className="s-item"><span>{t('views.technical.gpsAcc')}</span> <span className="val green">0.8m</span></div>
            </div>
          </div>
        </div>

        {/* Center: 3D Visualization */}
        <div className="viewport-3d">
          <div className="canvas-overlay top-left">
            <div className="v-label">{t('views.technical.tacticalScheme')}</div>
            <div className="v-sub">MODEL ID: DIHA-P1-ALPHA</div>
          </div>

          <div className="canvas-overlay top-right">
            <div className="coord-box">
              <div className="c-item">{t('views.technical.lat')}: {data.coords.b.toFixed(6)}</div>
              <div className="c-item">{t('views.technical.lng')}: {data.coords.e.toFixed(6)}</div>
            </div>
          </div>

          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[6, 3, 6]} fov={30} />
            <OrbitControls enablePan={false} maxDistance={15} minDistance={5} autoRotate={!data.isFlying} autoRotateSpeed={0.5} />

            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

            <Suspense fallback={null}>
              <DroneModel roll={data.attitude.roll} pitch={data.attitude.pitch} selectedDrone={selectedDrone} />
              <Environment preset="night" />
              <ContactShadows position={[0, -0.2, 0]} opacity={0.6} scale={15} blur={2.5} far={4.5} />
            </Suspense>

            <gridHelper args={[30, 30, '#1e293b', '#0f172a']} position={[0, -0.2, 0]} />
          </Canvas>

          <div className="canvas-overlay bottom-center">
            <div className="orientation-pills">
              <div className="pill"><span className="l">ROLL</span> {data.attitude.roll.toFixed(1)}°</div>
              <div className="pill"><span className="l">PITCH</span> {data.attitude.pitch.toFixed(1)}°</div>
              <div className="pill"><span className="l">YAW</span> {data.heading.toFixed(0)}°</div>
            </div>
          </div>

          <div className="canvas-overlay bottom-right">
            <div className="v-speed-gauge">
              <div className="g-label">{t('footer.vspeed')}</div>
              <div className="g-bar">
                <div className="fill" style={{ height: '50%', transform: `scaleY(${Math.min(Math.abs(data.vSpeed) / 1000, 1)})`, transformOrigin: data.vSpeed > 0 ? 'bottom' : 'top' }}></div>
              </div>
              <div className="g-val">{data.vSpeed}</div>
            </div>
          </div>
        </div>

        {/* Right Side: Mission & Environment */}
        <div className="side-panel right">
          <div className="panel-item">
            <div className="header"><Gauge size={14} /> {t('views.technical.engineSystem')}</div>
            <div className="prop-display">
              <div className="rpm-box">
                <div className="label">{t('views.technical.engineRpm')}</div>
                <div className="val">{data.rpm}</div>
                <div className="unit">{t('views.technical.rpmUnit')}</div>
              </div>
              <div className="thrust-bar">
                <div className="label">{t('views.technical.thrust')}</div>
                <div className="bar-outer"><div className="bar-inner" style={{ width: '74%' }}></div></div>
              </div>
            </div>
          </div>

          <div className="panel-item">
            <div className="header"><Navigation2 size={14} /> {t('views.technical.missionStatus')}</div>
            <div className="mission-info">
              <div className="info-row"><span>{t('footer.status')}</span> <span className="val blue">{data.isFlying ? t('views.technical.statusInFlight') : t('views.technical.statusWait')}</span></div>
              <div className="info-row"><span>{t('views.technical.points')}</span> <span className="val">04 / 12</span></div>
              <div className="info-row"><span>{t('views.technical.distance')}</span> <span className="val">2.4 km</span></div>
              <div className="info-row"><span>{t('views.technical.timeEta')}</span> <span className="val">08:12</span></div>
            </div>
          </div>

          <div className="panel-item">
            <div className="header"><Thermometer size={14} /> {t('views.technical.environment')}</div>
            <div className="env-grid">
              <div className="env-item"><span>{t('views.technical.temperature')}</span> 18°C</div>
              <div className="env-item"><span>{t('views.technical.wind')}</span> 4.2 m/s</div>
              <div className="env-item"><span>{t('views.technical.humidity')}</span> 42%</div>
              <div className="env-item"><span>{t('views.technical.pressure')}</span> 1013 hPa</div>
            </div>
          </div>

          <div className="panel-item">
            <div className="header"><Signal size={14} /> {t('views.technical.commChannel')}</div>
            <div className="signal-quality">
              <div className="s-label">{t('footer.signalQuality')}</div>
              <div className="s-bars">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <div key={i} className={`s-bar ${i < 8 ? 'active' : ''}`}></div>)}
              </div>
              <div className="s-meta">TX: 2.4 Mb/s | RX: 0.8 Mb/s</div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="tactical-btn">{t('views.technical.rebootAvionics')}</button>
            <button className="tactical-btn warn">{t('views.technical.rtl')}</button>
          </div>
        </div>
      </div>

      <div className="tech-footer-v3">
        <div className="footer-stat main">
          <div className="label">{t('views.technical.airspeed')}</div>
          <div className="value">{data.airspeed.toFixed(1)} <span className="unit">m/s</span></div>
        </div>
        <div className="footer-stat">
          <div className="label">{t('views.technical.altitudeMsl')}</div>
          <div className="value">{data.altitude} <span className="unit">ft</span></div>
        </div>
        <div className="footer-stat">
          <div className="label">{t('views.technical.heading')}</div>
          <div className="value">{data.heading.toFixed(0)}°</div>
        </div>
        <div className="footer-stat">
          <div className="label">{t('views.technical.batteryPower')}</div>
          <div className="value">854 <span className="unit">Vt/s</span></div>
        </div>
        <div className="footer-stat">
          <div className="label">{t('views.technical.gForce')}</div>
          <div className="value">1.02 <span className="unit">G</span></div>
        </div>
        <div className="footer-logo">
          <div className="logo-text">{t('views.technical.uavCenter')}</div>
          <div className="logo-sub">{t('views.technical.safeComm')}</div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalView;

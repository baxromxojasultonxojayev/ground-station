import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Polygon, Popup, Tooltip, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import {
  Settings,
  X,
  Layers,
  MousePointer2,
  Maximize2,
  Search,
  Ruler,
  TowerControl,
  MapPin,
  Eye,
  RotateCcw,
  PlusCircle,
  Target,
  Camera,
  Zap,
  Triangle,
  BarChart3,
  Map as MapIcon
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './style.scss';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom dot marker icon
const createDotIcon = (color: string) => L.divIcon({
  className: 'custom-dot-icon',
  html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color};"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

const MapEvents: React.FC<{ onAddTarget: (lat: number, lng: number) => void }> = ({ onAddTarget }) => {
  useMapEvents({
    click(e) {
      onAddTarget(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

// Custom Drone Icon (SVG)
const droneIcon = L.divIcon({
  className: 'drone-icon-tactical',
  html: `
    <div class="drone-wrapper" style="transform: rotate(var(--drone-heading, 0deg)); transition: transform 0.5s ease-out;">
      <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
        <path d="M20 5L24 15H16L20 5Z" fill="#fff" stroke="#3b82f6" stroke-width="2"/>
        <path d="M5 20L15 24V16L5 20Z" fill="#fff" stroke="#3b82f6" stroke-width="2"/>
        <path d="M35 20L25 24V16L35 20Z" fill="#fff" stroke="#3b82f6" stroke-width="2"/>
        <path d="M20 35L24 25H16L20 35Z" fill="#fff" stroke="#3b82f6" stroke-width="2"/>
        <circle cx="20" cy="20" r="4" fill="#3b82f6"/>
      </svg>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

interface ActiveMission {
  id: string;
  droneId: string;
  swarmCount: number;
  target: { lat: number, lng: number };
  currentPos: { lat: number, lng: number };
  status: 'FLYING' | 'SUCCESS';
  timer: number;
  altitude: number;
  heading: number;
}

interface MapPanelProps {
  activeMissions: ActiveMission[];
  targets: any[];
  onAddTarget: (lat: number, lng: number) => void;
  onClose?: () => void;
  startFlight: (waypoints: { lat: number, lng: number }[]) => void;
  resetMission: (id: string) => void;
  selectedDrone: string;
  swarmCount: number;
}

const MapPanel: React.FC<MapPanelProps> = ({
  activeMissions,
  targets,
  onAddTarget,
  onClose,
  startFlight,
  resetMission,
  selectedDrone,
  swarmCount
}) => {
  const mapCenter: [number, number] = [41.2995, 69.2401];
  const isAnyFlying = activeMissions.some(m => m.status === 'FLYING');

  return (
    <div className="panel map-panel-v5">
      <div className="map-header mono">
        <div className="h-left">
          <Layers size={14} />
          <span className="title">DIHA Xaritasi v3.4.5</span>
        </div>
        <div className="h-center">
          <span className="stat">{activeMissions.length} FAOL MISSYA</span>
          <span className="stat">{selectedDrone.toUpperCase()}</span>
        </div>
        <div className="h-right">
          <span className="src-badge">SATELLIT ▾</span>
          <Settings size={14} className="icon" />
          {onClose && <X size={18} className="icon close-btn" onClick={onClose} />}
        </div>
      </div>

      <div className="map-toolbar">
        <div className="tool-btn active"><MousePointer2 size={16} /></div>
        <div className="tool-btn"><Maximize2 size={16} /></div>
        <div className="tool-btn"><Search size={16} /></div>
        <div className="tool-btn"><Ruler size={16} /></div>
        <div className="tool-btn"><MapPin size={16} /></div>
        <div className="tool-btn"><RotateCcw size={16} /></div>
        <div className="tool-btn"><Target size={16} /></div>
        <div className="tool-btn"><MapIcon size={16} /></div>
      </div>
      <div className="map-viewport">
        <MapContainer
          center={mapCenter}
          zoom={16}
          style={{ height: '100%', width: '100%', background: '#0a0f16' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />

          <MapEvents onAddTarget={onAddTarget} />

          {/* Current Selection Projection */}
          {targets.length === 1 && !isAnyFlying && (
             <Polyline 
               positions={[[41.2995, 69.2401], [targets[0].lat, targets[0].lng]]} 
               pathOptions={{ color: '#3b82f6', weight: 2, dashArray: '10, 10', opacity: 0.6 }} 
             />
          )}

          {/* Saved Targets */}
          {targets.map(t => (
            <Marker key={t.id} position={[t.lat, t.lng]} icon={createDotIcon('#ef4444')}>
              <Tooltip permanent direction="top" className="tactical-tooltip target-label">
                <span>{t.label}</span>
              </Tooltip>
            </Marker>
          ))}

          {/* Render All Active Missions */}
          {activeMissions.map((mission) => {
             const swarmPositions: [number, number][] = [];
             for (let i = 0; i < mission.swarmCount; i++) {
               const offsetLat = (Math.floor(i / 3) - 1) * 0.0002;
               const offsetLng = (i % 3 - 1) * 0.0002;
               swarmPositions.push([mission.currentPos.lat + offsetLat, mission.currentPos.lng + offsetLng]);
             }

             return (
               <React.Fragment key={mission.id}>
                 {/* Flight Path to Target */}
                 {mission.status === 'FLYING' && (
                    <Polyline 
                      positions={[[mission.currentPos.lat, mission.currentPos.lng], [mission.target.lat, mission.target.lng]]}
                      pathOptions={{ color: '#22c55e', weight: 1, dashArray: '5, 5', opacity: 0.3 }}
                    />
                 )}
                 
                 {/* Target Marker */}
                 <Marker position={[mission.target.lat, mission.target.lng]} icon={createDotIcon('#fbbf24')}>
                    <Tooltip direction="top" className="tactical-tooltip">
                       <span>MISSYA: {mission.id}</span>
                    </Tooltip>
                 </Marker>

                 {/* Swarm Drones */}
                 {mission.status === 'FLYING' && swarmPositions.map((pos, idx) => (
                    <Marker
                      key={`${mission.id}-d-${idx}`}
                      position={pos}
                      icon={droneIcon}
                      ref={(ref) => {
                        if (ref) {
                          const el = ref.getElement();
                          if (el) el.style.setProperty('--drone-heading', `${mission.heading}deg`);
                        }
                      }}
                    >
                      <Tooltip direction="top" className="tactical-tooltip">
                        <span style={{ color: '#fff' }}>{mission.droneId[0].toUpperCase()}{idx + 1}</span>
                      </Tooltip>
                    </Marker>
                 ))}
               </React.Fragment>
             );
          })}
        </MapContainer>

        <div className="tactical-bottom-controls mono">
          <div className="mission-grid" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div
              className={`btn green`}
              onClick={() => {
                if (targets.length > 0) {
                  startFlight(targets.map(t => ({ lat: t.lat, lng: t.lng })));
                }
              }}
              style={{ width: 'auto', padding: '0 20px', fontWeight: 'bold' }}
            >
              YANGI MISSYA BOSHLASH
            </div>
          </div>
          <div className="coord-footer">
            {activeMissions.length} AKTIV SQUADRONS | {targets.length} BELGILANGAN NISHON
          </div>
        </div>

        <div className="right-tactical-icons">
          <div className="icon-box"><Settings size={18} /></div>
          <div className="icon-box"><MapIcon size={18} /></div>
        </div>
      </div>
    </div>
  );
};

export default MapPanel;

import React, { useState } from 'react';
import { Package, Shield, Zap, Target, CheckCircle2, Rocket, MapPin, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';
import './style.scss';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface DroneType {
  id: string;
  name: string;
  type: string;
  description: string;
  specs: {
    range: string;
    speed: string;
    battery: string;
  };
  image: string;
}

const drones: DroneType[] = [
  {
    id: 'kamikaze',
    name: 'Lancet-1000',
    type: 'Kamikadze',
    description: 'Uzoq masofali (1000 km) strategik nishonlarni yoʻq qilish tizimi.',
    specs: { range: '1000 km', speed: '250 km/soat', battery: '6 soat' },
    image: '/images/lancet.png'
  },
  {
    id: 'vtol',
    name: 'VTOL-X1 Stealth',
    type: 'Koʻp maqsadli',
    description: 'Vertikal koʻtarilish va qoʻnish xususiyatiga ega zamonaviy zarbdor dron.',
    specs: { range: '450 km', speed: '180 km/soat', battery: '4 soat' },
    image: '/images/vtol.png'
  },
  {
    id: 'recon',
    name: 'SkyEye-G5',
    type: 'Razvedka',
    description: 'Ultra-yuqori aniqlikdagi kuzatuv va elektron razvedka tizimi.',
    specs: { range: '1200 km', speed: '140 km/soat', battery: '24 soat' },
    image: '/images/recon.png'
  }
];

interface WarehouseViewProps {
  selectedDrone: string;
  onSelect: (id: string) => void;
  onTabChange: (id: string) => void;
  onAddTarget: (lat: number, lng: number) => void;
  targets: any[];
  startFlight: (waypoints: { lat: number, lng: number }[]) => void;
  inventory: Record<string, number>;
  swarmCount: number;
  onSwarmChange: (delta: number) => void;
}

const MapEvents: React.FC<{ onAddTarget: (lat: number, lng: number) => void }> = ({ onAddTarget }) => {
  useMapEvents({
    click(e) {
      onAddTarget(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

// Component to handle map resizing when panel opens
import { useMap } from 'react-leaflet';
import { Minus, Plus } from 'lucide-react';
const MapResize: React.FC<{ active: boolean }> = ({ active }) => {
  const map = useMap();
  React.useEffect(() => {
    if (active) {
      // Multiple attempts to ensure map catches the final flex width
      const timer1 = setTimeout(() => map.invalidateSize(), 100);
      const timer2 = setTimeout(() => map.invalidateSize(), 500);
      const timer3 = setTimeout(() => map.invalidateSize(), 1000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [active, map]);
  return null;
};

const WarehouseView: React.FC<WarehouseViewProps> = ({ 
  selectedDrone, 
  onSelect, 
  onTabChange,
  onAddTarget,
  targets,
  startFlight,
  inventory,
  swarmCount,
  onSwarmChange
}) => {
  const { t } = useTranslation();
  const showMap = swarmCount > 0;

  const handleLaunch = () => {
    if (targets.length > 0 && swarmCount > 0) {
      startFlight(targets.map(t => ({ lat: t.lat, lng: t.lng })));
      onTabChange('drone'); // Go to first page (camera view)
    }
  };

  return (
    <div className="warehouse-container mono">
      <div className="warehouse-layout">
        
        {/* LEFT: DRONE INVENTORY */}
        <div className="inventory-section">
          <div className="warehouse-header">
            <div className="title">
              <Package size={24} />
              <h1>{t('warehouse.title')}</h1>
            </div>
          </div>

          <div className="drone-grid">
            {drones.map((drone) => (
              <div 
                key={drone.id} 
                className={`drone-card ${selectedDrone === drone.id ? 'active' : ''}`}
                onClick={() => {
                   onSelect(drone.id);
                }}
              >
                <div className="card-header">
                  <span className="type-badge">{t(`warehouse.${drone.id}.type`)}</span>
                  <div className="stock-info">{t('warehouse.stock')}: <b>{inventory[drone.id]}</b></div>
                  {selectedDrone === drone.id && swarmCount > 0 && <div className="active-badge">{t('warehouse.selectedCount', { count: swarmCount })}</div>}
                </div>
                
                <div className="drone-preview">
                  <img src={drone.image} alt={drone.name} />
                  <div className="overlay"></div>
                </div>

                <div className="card-body">
                  <h2>{drone.name}</h2>
                  <p>{t(`warehouse.${drone.id}.desc`)}</p>
                  
                  {selectedDrone === drone.id && (
                    <div className="swarm-controls" onClick={e => e.stopPropagation()}>
                       <button onClick={() => onSwarmChange(-1)} disabled={swarmCount === 0}><Minus size={16} /></button>
                       <div className="count">{swarmCount}</div>
                       <button onClick={() => onSwarmChange(1)} disabled={inventory[drone.id] === 0}><Plus size={16} /></button>
                    </div>
                  )}

                  <div className="specs-grid">
                    <div className="spec">
                      <Target size={14} />
                      <span>{drone.specs.range}</span>
                    </div>
                    <div className="spec">
                      <Zap size={14} />
                      <span>{drone.specs.speed}</span>
                    </div>
                    <div className="spec">
                      <Shield size={14} />
                      <span>{drone.specs.battery}</span>
                    </div>
                  </div>
                </div>

                <button className={`select-btn ${selectedDrone === drone.id ? 'active' : ''}`}>
                  {selectedDrone === drone.id ? t('warehouse.selected') : t('warehouse.select')}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: MISSION PLANNING MAP */}
        <div className={`mission-section ${showMap ? 'visible' : ''}`}>
           <div className="mission-header">
              <div className="m-title"><Navigation size={20} /> {t('warehouse.missionPlan')}</div>
              <div className="m-sub">{t('warehouse.selectTargetCoord')}</div>
           </div>
           
           <div className="mini-map-container">
             <MapContainer
               center={[41.2995, 69.2401]}
               zoom={13}
               style={{ height: '100%', width: '100%', borderRadius: '0' }}
               zoomControl={false}
               attributionControl={false}
             >
               <TileLayer
                 url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
               />
               <MapEvents onAddTarget={onAddTarget} />
               <MapResize active={showMap} />
               {targets.map(t => (
                 <Marker key={t.id} position={[t.lat, t.lng]} />
               ))}
             </MapContainer>
             
             {targets.length > 0 && (
               <div className="selected-target-info">
                  <div className="t-row"><MapPin size={14} /> <span>B: {targets[targets.length-1].lat.toFixed(6)}</span></div>
                  <div className="t-row"><MapPin size={14} /> <span>E: {targets[targets.length-1].lng.toFixed(6)}</span></div>
               </div>
             )}
           </div>

           <div className="mission-actions">
               <div className="drone-info-mini">
                 <img src={drones.find(d => d.id === selectedDrone)?.image} alt="" />
                 <div className="details">
                    <b>{drones.find(d => d.id === selectedDrone)?.name}</b>
                    <span className="count-badge">{t('warehouse.droneCount', { count: swarmCount })}</span>
                 </div>
              </div>
              <button 
                className={`launch-btn ${targets.length > 0 && swarmCount > 0 ? 'ready' : ''}`}
                onClick={handleLaunch}
                disabled={targets.length === 0 || swarmCount === 0}
              >
                <Rocket size={20} />
                {swarmCount > 0 ? t('warehouse.launchDrones', { count: swarmCount }) : t('warehouse.noDroneSelected')}
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default WarehouseView;

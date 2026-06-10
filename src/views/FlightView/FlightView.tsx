import React, { useState } from 'react';
import MapPanel from '../../components/MapPanel/MapPanel';
import CameraPanel from '../../components/CameraPanel/CameraPanel';

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

interface FlightViewProps {
  activeMissions: ActiveMission[];
  targets: any[];
  onAddTarget: (lat: number, lng: number) => void;
  startFlight: (waypoints: {lat: number, lng: number}[]) => void;
  resetMission: (id: string) => void;
  selectedDrone: string;
  swarmCount: number;
}

const FlightView: React.FC<FlightViewProps> = ({ 
  activeMissions, 
  targets, 
  onAddTarget,
  startFlight,
  resetMission,
  selectedDrone,
  swarmCount
}) => {
  const [showMap, setShowMap] = useState(true);
  const isAnyFlying = activeMissions.some(m => m.status === 'FLYING');
  // Watch the latest mission for the camera
  const currentMission = activeMissions[activeMissions.length - 1];

  return (
    <div className="flight-view-container" style={{ display: 'flex', flex: 1, width: '100%', height: '100%' }}>
      {/* Map is always visible if showMap is true OR if we're not flying (full screen map) */}
      {(showMap || !isAnyFlying) && (
        <div className="main-panel-wrapper" style={{ flex: 1 }}>
          <MapPanel 
            activeMissions={activeMissions}
            targets={targets}
            onAddTarget={onAddTarget}
            startFlight={startFlight}
            resetMission={resetMission}
            onClose={isAnyFlying ? () => setShowMap(false) : undefined} 
            selectedDrone={selectedDrone}
            swarmCount={swarmCount}
          />
        </div>
      )}
      
      {/* Camera only shows up after launch for the latest drone */}
      {isAnyFlying && currentMission && (
        <div className="main-panel-wrapper" style={{ flex: 1, display: !showMap || isAnyFlying ? 'flex' : 'none' }}>
          <CameraPanel 
            data={{
               coords: { b: currentMission.currentPos.lat, e: currentMission.currentPos.lng },
               altitude: currentMission.altitude,
               timer: currentMission.timer,
               heading: currentMission.heading
            }} 
            onOpenMap={() => setShowMap(true)}
            isMapVisible={showMap}
          />
        </div>
      )}
    </div>
  );
};

export default FlightView;

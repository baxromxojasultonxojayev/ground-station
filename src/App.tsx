import React, { useEffect, useState } from 'react';
import TopBar from './components/TopBar/TopBar';
import SideBar from './components/SideBar/SideBar';
import FooterPanel from './components/FooterPanel/FooterPanel';
import FlightView from './views/FlightView/FlightView';
import MissionPlanner from './views/MissionPlanner/MissionPlanner';
import SystemHealth from './views/SystemHealth/SystemHealth';
import AlertsView from './views/AlertsView/AlertsView';
import SettingsView from './views/SettingsView/SettingsView';
import TargetView from './views/TargetView';
import TechnicalView from './views/TechnicalView';
import WarehouseView from './views/WarehouseView';
import MapPanel from './components/MapPanel/MapPanel';
import { useSimulation } from './hooks/useSimulation';
import './index.css';
import { Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ActiveMission {
  id: string;
  droneId: string;
  swarmCount: number;
  target: { lat: number, lng: number };
  targetAddress: string;
  currentPos: { lat: number, lng: number };
  status: 'FLYING' | 'SUCCESS';
  timer: number;
  altitude: number;
  heading: number;
}

const App: React.FC = () => {
  const { t } = useTranslation();
  const [activeMissions, setActiveMissions] = useState<ActiveMission[]>([]);
  const [activeTab, setActiveTab] = useState('drone');
  const [targets, setTargets] = useState<any[]>([]);
  const [archiveTargets, setArchiveTargets] = useState<any[]>([]);
  const [selectedDrone, setSelectedDrone] = useState('kamikaze');
  const [swarmCount, setSwarmCount] = useState(0);
  const [completionAlerts, setCompletionAlerts] = useState<any[]>([]);
  const [inventory, setInventory] = useState<Record<string, number>>({
    kamikaze: 24,
    vtol: 12,
    recon: 6
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMissions(prev => prev.map(mission => {
        if (mission.status === 'FLYING') {
          const dy = mission.target.lat - mission.currentPos.lat;
          const dx = mission.target.lng - mission.currentPos.lng;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 0.0001) {
            return { ...mission, status: 'SUCCESS' };
          }

          const speed = 0.0002;
          const nextLat = mission.currentPos.lat + (dy / dist) * speed;
          const nextLng = mission.currentPos.lng + (dx / dist) * speed;

          let angle = Math.atan2(dx, dy) * (180 / Math.PI);
          const heading = (angle + 360) % 360;

          return {
            ...mission,
            currentPos: { lat: nextLat, lng: nextLng },
            timer: mission.timer + 0.1,
            altitude: Math.min(mission.altitude + 5, 500),
            heading
          };
        }
        return mission;
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Separate Effect to handle success side-effects (Alerts)
  useEffect(() => {
    activeMissions.forEach(mission => {
      if (mission.status === 'SUCCESS') {
        setCompletionAlerts(current => {
          if (current.some(a => a.id === mission.id)) return current;
          return [...current, {
            id: mission.id,
            count: mission.swarmCount,
            address: mission.targetAddress,
            lat: mission.target.lat,
            lng: mission.target.lng
          }];
        });
      }
    });
  }, [activeMissions]);

  const handleDroneSelect = (id: string) => {
    setSelectedDrone(id);
    setSwarmCount(0);
  };

  const handleSwarmChange = (delta: number) => {
    const currentStock = inventory[selectedDrone];
    if (delta > 0 && currentStock > 0) {
      setInventory(prev => ({ ...prev, [selectedDrone]: prev[selectedDrone] - 1 }));
      setSwarmCount(prev => prev + 1);
    } else if (delta < 0 && swarmCount > 0) {
      setInventory(prev => ({ ...prev, [selectedDrone]: prev[selectedDrone] + 1 }));
      setSwarmCount(prev => prev - 1);
    }
  };

  const startFlight = (waypoints: { lat: number, lng: number }[]) => {
    if (waypoints.length === 0 || swarmCount === 0) return;

    const newMission: ActiveMission = {
      id: `M-${Date.now()}`,
      droneId: selectedDrone,
      swarmCount: swarmCount,
      target: waypoints[0],
      targetAddress: targets[0]?.address || t('app.unknownArea'),
      currentPos: { lat: 41.2995, lng: 69.2401 },
      status: 'FLYING',
      timer: 0,
      altitude: 0,
      heading: 0
    };

    setActiveMissions(prev => [...prev, newMission]);
    setSwarmCount(0); // Reset selection after launch
    setTargets([]); // Clear target after launch
  };

  const handleResetMission = (missionId: string) => {
    setActiveMissions(prev => prev.filter(m => m.id !== missionId));
  };

  const clearArchive = () => {
    setArchiveTargets([]);
  };

  const handleAddTarget = async (lat: number, lng: number) => {
    let address = t('app.detecting');

    const newId = Date.now();
    const newTarget = {
      id: newId,
      lat,
      lng,
      label: t('app.target'),
      time: new Date().toLocaleTimeString(),
      address,
      status: t('app.active')
    };

    // Set as the ONLY target
    setTargets([newTarget]);

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      const addressName = data.display_name || t('app.unknownArea');

      setTargets(prev => prev.map(tItem => tItem.id === newId ? { ...tItem, address: addressName } : tItem));
    } catch (error) {
      setTargets(prev => prev.map(tItem => tItem.id === newId ? { ...tItem, address: t('app.errorNetwork') } : tItem));
    }
  };

  const currentMission = activeMissions[activeMissions.length - 1];
  const currentTelemetry = currentMission ? {
    timer: currentMission.timer,
    coords: { b: currentMission.currentPos.lat, e: currentMission.currentPos.lng },
    altitude: currentMission.altitude,
    heading: currentMission.heading,
    airspeed: 95,
    rpm: 6000,
    vSpeed: 0,
    systemTime: new Date().toLocaleTimeString(),
    trackingTime: "00:00",
    attitude: { roll: 0, pitch: 0 },
    telemetry: { heading: currentMission.heading }
  } : {
    timer: 0,
    coords: { b: 41.2995, e: 69.2401 },
    altitude: 0,
    heading: 0,
    airspeed: 0,
    rpm: 0,
    vSpeed: 0,
    systemTime: new Date().toLocaleTimeString(),
    trackingTime: "00:00",
    attitude: { roll: 0, pitch: 0 },
    telemetry: { heading: 0 }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'drone':
        return (
          <>
            <FlightView
              activeMissions={activeMissions}
              targets={targets}
              onAddTarget={handleAddTarget}
              startFlight={startFlight}
              resetMission={handleResetMission}
              selectedDrone={selectedDrone}
              swarmCount={swarmCount}
            />

            {completionAlerts.length > 0 && (
              <div className="mission-alerts-container">
                {completionAlerts.map((alert) => (
                  <div key={alert.id} className="alert-content">
                    <div className="icon"><Target size={48} color="#ef4444" /></div>
                    <h2 style={{ color: '#fbbf24' }}>{t('app.targetDestroyed')}</h2>
                    <div className="mission-details mono" style={{ marginBottom: '15px', color: '#fff', fontSize: '0.9rem' }}>
                      <p style={{ color: '#22c55e', fontWeight: 'bold' }}>{alert.address}</p>
                      <p>LAT: {alert.lat.toFixed(6)} | LNG: {alert.lng.toFixed(6)}</p>
                    </div>
                    <p>{t('app.dronesHit', { count: alert.count })}</p>
                    <button className="reset-btn" onClick={() => {
                       handleResetMission(alert.id);
                       setCompletionAlerts(prev => prev.filter(a => a.id !== alert.id));
                       if (completionAlerts.length === 1) setActiveTab('dots');
                    }}>{t('app.confirmOk')}</button>
                  </div>
                ))}
              </div>
            )}
          </>
        );
      case 'checklist':
        return <MissionPlanner />;
      case 'target':
        return <TargetView targets={[...targets, ...archiveTargets]} onClearArchive={clearArchive} />;
      case 'grid':
        return <TechnicalView data={currentTelemetry} selectedDrone={selectedDrone} />;
      case 'dots':
        return (
          <WarehouseView
            selectedDrone={selectedDrone}
            onSelect={handleDroneSelect}
            onTabChange={setActiveTab}
            onAddTarget={handleAddTarget}
            targets={targets}
            startFlight={startFlight}
            inventory={inventory}
            swarmCount={swarmCount}
            onSwarmChange={handleSwarmChange}
          />
        );
      case 'chip':
        return <SystemHealth />;
      case 'warning':
        return <AlertsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <div className="view-placeholder">
            <h1>{activeTab.toUpperCase()} {t('app.page')}</h1>
            <p>{t('app.underConstruction')}</p>
          </div>
        );
    }
  };

  return (
    <div className="app-root">
      <TopBar data={currentTelemetry} />

      <div className="middle-layout">
        <SideBar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>

      {activeTab === 'drone' && <FooterPanel data={currentTelemetry} />}
    </div>
  );
};

export default App;

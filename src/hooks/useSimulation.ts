import { useState, useEffect } from 'react';

export interface TelemetryData {
  timer: number;
  coords: { b: number; e: number };
  airspeed: number;
  systemTime: string;
  trackingTime: string;
  rpm: number;
  altitude: number;
  vSpeed: number;
  heading: number;
  attitude: { roll: number; pitch: number };
  telemetry: { heading: number };
}

export const useSimulation = () => {
  const [timer, setTimer] = useState(2595.347);
  const [coords, setCoords] = useState({ b: 41.2995, e: 69.2401 }); // Centered on map now
  const [airspeed, setAirspeed] = useState(84);
  const [systemTime, setSystemTime] = useState(new Date('2024-03-07T16:21:40'));
  const [trackingTime, setTrackingTime] = useState('06:04');
  const [rpm, setRpm] = useState(6069);
  const [altitude, setAltitude] = useState(2514);
  const [vSpeed, setVSpeed] = useState(469);
  const [heading, setHeading] = useState(98);
  const [attitude, setAttitude] = useState({ roll: 0, pitch: 0 });
  
  const [target, setTarget] = useState<{lat: number, lng: number}[]>([]);
  const [targetIndex, setTargetIndex] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [history, setHistory] = useState<{lat: number, lng: number}[]>([]);
  const [missionComplete, setMissionComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => +(prev + 0.1).toFixed(3));
      setSystemTime(prev => new Date(prev.getTime() + 100));

      if (isFlying && target && target.length > 0) {
        const currentTarget = target[targetIndex];
        
        setCoords(prev => {
          const dy = currentTarget.lat - prev.b;
          const dx = currentTarget.lng - prev.e;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 0.0001) {
            if (targetIndex < target.length - 1) {
              setTargetIndex(prev => prev + 1);
            } else {
              setIsFlying(false);
              setMissionComplete(true);
            }
            return prev;
          }

          const speed = 0.0001;
          const nextB = prev.b + (dy / dist) * speed;
          const nextE = prev.e + (dx / dist) * speed;
          
          setHistory(h => [...h, { lat: nextB, lng: nextE }]);
          
          return {
            b: nextB,
            e: nextE
          };
        });

        // Update heading towards current target
        setHeading(prev => {
          const dy = currentTarget.lat - coords.b;
          const dx = currentTarget.lng - coords.e;
          let angle = Math.atan2(dx, dy) * (180 / Math.PI);
          return (angle + 360) % 360;
        });
      } else {
        // Idle drift
        setCoords(prev => ({
          b: prev.b + (Math.random() - 0.5) * 0.000005,
          e: prev.e + (Math.random() - 0.5) * 0.000005,
        }));
      }

      setAirspeed(prev => {
        const targetSpeed = isFlying ? 95 : 60;
        return prev + (targetSpeed - prev) * 0.05 + (Math.random() - 0.5);
      });

      setRpm(prev => prev + Math.floor((Math.random() - 0.5) * 5));
      setAltitude(prev => prev + Math.floor((Math.random() - 0.5) * 2));
      setVSpeed(prev => prev + Math.floor((Math.random() - 0.5) * 10));
      
      if (!isFlying) {
        setHeading(prev => (prev + (Math.random() - 0.5) * 0.2 + 360) % 360);
      }
      
      setAttitude(prev => ({
        roll: isFlying ? 10 * Math.sin(timer) : prev.roll + (Math.random() - 0.5) * 0.05,
        pitch: isFlying ? 3 : prev.pitch + (Math.random() - 0.5) * 0.05,
      }));

    }, 100);

    return () => clearInterval(interval);
  }, [isFlying, target, targetIndex, timer, coords.b, coords.e]);

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${y}.${m}.${d} ${h}:${min}:${s}`;
  };

  return {
    timer,
    coords,
    history,
    airspeed,
    systemTime: formatDate(systemTime),
    trackingTime,
    rpm,
    altitude,
    vSpeed,
    heading,
    attitude,
    telemetry: { heading },
    isFlying,
    missionComplete,
    startFlight: (waypoints: {lat: number, lng: number}[]) => {
      setTarget(waypoints);
      setTargetIndex(0);
      setIsFlying(true);
      setMissionComplete(false);
      setHistory([{ lat: coords.b, lng: coords.e }]);
    },
    stopFlight: () => setIsFlying(false),
    resetMission: () => setMissionComplete(false)
  };
};

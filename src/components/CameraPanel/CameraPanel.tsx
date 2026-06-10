import React, { useEffect, useRef } from 'react';
import { Map as MapIcon } from 'lucide-react';
import './style.scss';

interface CameraPanelProps {
  data: any;
  onOpenMap: () => void;
  isMapVisible: boolean;
}

const CameraPanel: React.FC<CameraPanelProps> = ({ data, onOpenMap, isMapVisible }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    const draw = () => {
      if (!canvas || !container) return;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      // Clear
      ctx.clearRect(0, 0, w, h);
      
      // Simulated Thermal/Flight Video Feed
      ctx.fillStyle = '#050a0f';
      ctx.fillRect(0, 0, w, h);

      // Draw simulated terrain/view
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 10; i++) {
        ctx.beginPath(); ctx.moveTo(0, h/2 + i*20); ctx.lineTo(w, h/2 + i*40); ctx.stroke();
      }

      const { pitch, roll } = data.attitude;

      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((roll * Math.PI) / 180);

      // --- PITCH LADDER (HUD Style) ---
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.font = '10px JetBrains Mono';
      ctx.fillStyle = '#00ff00';

      for (let i = -30; i <= 30; i += 10) {
        if (i === 0) continue;
        const yOffset = (i - pitch) * 5;
        const lineLen = 40;
        
        // Left mark
        ctx.beginPath();
        ctx.moveTo(-lineLen - 20, yOffset);
        ctx.lineTo(-20, yOffset);
        ctx.lineTo(-20, yOffset + (i > 0 ? 5 : -5));
        ctx.stroke();
        ctx.fillText(Math.abs(i).toString(), -lineLen - 40, yOffset + 4);

        // Right mark
        ctx.beginPath();
        ctx.moveTo(20, yOffset);
        ctx.lineTo(lineLen + 20, yOffset);
        ctx.lineTo(lineLen + 20, yOffset + (i > 0 ? 5 : -5));
        ctx.stroke();
        ctx.fillText(Math.abs(i).toString(), lineLen + 25, yOffset + 4);
      }

      // Center crosshair
      ctx.strokeStyle = '#00ff00';
      ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(10, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(0, 10); ctx.stroke();
      
      ctx.restore();

      // --- INNER TAPES (Green) ---
      // Airspeed (Left)
      ctx.strokeStyle = '#00ff00';
      ctx.strokeRect(40, h*0.2, 30, h*0.6);
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(40, h*0.5 - 15, 30, 30);
      ctx.fillStyle = '#000';
      ctx.font = 'bold 14px mono';
      ctx.fillText(data.airspeed.toString(), 45, h*0.5 + 5);

      // Altitude (Right)
      ctx.strokeStyle = '#00ff00';
      ctx.strokeRect(w - 70, h*0.2, 30, h*0.6);
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(w - 70, h*0.5 - 15, 30, 30);
      ctx.fillStyle = '#000';
      ctx.fillText(data.altitude.toString(), w - 65, h*0.5 + 5);

      // --- TOP TEXT OVERLAYS ---
      ctx.fillStyle = '#00ff00';
      ctx.font = '12px JetBrains Mono';
      ctx.fillText('2024.03.07 16:29:32', 20, 30);
      ctx.fillText('AVTOKUZATUV', w/2 - 40, 30);
      ctx.fillText('TERMAL', w*0.7, 30);
      ctx.fillText('1.96', w - 40, 30);

      // --- BOTTOM STATS (Green) ---
      ctx.font = '11px JetBrains Mono';
      ctx.fillText(`HA: 040.48:53 N, 026:38:41 E, 3046m`, w - 240, h - 60);
      ctx.fillText(`LOS: 040.45:03 N, 026:38:08 E, 84m`, w - 240, h - 40);
      ctx.fillText(`MDF: 040.47:14 N, 026:38:06 E, 84m`, w - 240, h - 20);

      ctx.fillText(`GAZ: 84%`, 20, h - 40);
      ctx.fillText(`DVR: 6083rpm`, 20, h - 20);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    const anim = () => { draw(); requestAnimationFrame(anim); };
    const raf = requestAnimationFrame(anim);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
    };
  }, [data]);

  return (
    <div className="panel camera-panel-v2">
      <div className="camera-header-v2">
         <div className="label">Gimbal Siljishi</div>
         {!isMapVisible && (
            <div className="open-map-btn" onClick={onOpenMap}>
               <MapIcon size={14} /> <span>Xaritani Ochish</span>
            </div>
         )}
      </div>
      <div className="camera-canvas-wrapper" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default CameraPanel;

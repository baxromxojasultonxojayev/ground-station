import React from 'react';

const SystemHealth: React.FC = () => {
  return (
    <div className="view-placeholder system-health">
      <h1>TIZIM HOLATI</h1>
      <div className="health-grid">
        <div className="health-card"><span>CPU TEMP</span><b>42°C</b></div>
        <div className="health-card"><span>MEMORY</span><b>64%</b></div>
        <div className="health-card"><span>DISK</span><b>OK</b></div>
        <div className="health-card"><span>NETWORK</span><b>120ms</b></div>
      </div>
    </div>
  );
};

export default SystemHealth;

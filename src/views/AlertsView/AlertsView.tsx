import React from 'react';
import { AlertCircle, ShieldAlert, Zap } from 'lucide-react';

const AlertsView: React.FC = () => {
  const alerts = [
    { id: 1, type: 'CRITICAL', msg: 'RUXSATSIZ KUZATUV ANIQLANDI', time: '10:24:12' },
    { id: 2, type: 'WARNING', msg: 'BATARYA QUVVATI PAST (15%)', time: '10:20:05' },
    { id: 3, type: 'INFO', msg: 'ALREADY IN ORBIT', time: '10:15:33' },
  ];

  return (
    <div className="view-placeholder alerts-view">
      <h1>XAVFSIZLIK VA OGOHLANTIRISHLAR</h1>
      <div className="alerts-list" style={{ width: '100%', maxWidth: '800px', marginTop: '30px' }}>
        {alerts.map(a => (
          <div key={a.id} className={`alert-item ${a.type.toLowerCase()}`} style={{ 
            background: 'rgba(15, 23, 42, 0.6)', 
            border: `1px solid ${a.type === 'CRITICAL' ? '#ef4444' : a.type === 'WARNING' ? '#f59e0b' : '#3b82f6'}`,
            padding: '15px',
            marginBottom: '10px',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {a.type === 'CRITICAL' ? <ShieldAlert color="#ef4444" /> : <AlertCircle color="#f59e0b" />}
              <span style={{ fontWeight: 'bold', color: '#fff' }}>{a.msg}</span>
            </div>
            <span style={{ color: '#64748b', fontSize: '12px' }}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsView;

import React from 'react';
import { Target, Trash2, MapPin } from 'lucide-react';

interface TargetViewProps {
  targets: any[];
  onClearArchive: () => void;
}

const TargetView: React.FC<TargetViewProps> = ({ targets, onClearArchive }) => {
  return (
    <div className="view-placeholder target-view">
      <div className="view-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '900px' }}>
        <div>
          <h1>NISHONLAR BOSHQARUVI</h1>
          <p>Belgilangan va yoʻq qilingan barcha nishonlar arxivi.</p>
        </div>
        {targets.length > 0 && (
          <button 
            onClick={onClearArchive}
            className="reset-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
          >
            <Trash2 size={16} /> ARXIVNI TOZALASH
          </button>
        )}
      </div>
      
      <div className="targets-list" style={{ width: '100%', maxWidth: '900px', marginTop: '30px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ background: '#1e293b', color: '#64748b', fontSize: '12px', textAlign: 'left' }}>
            <tr>
              <th style={{ padding: '15px' }}>ID</th>
              <th style={{ padding: '15px' }}>KOORDINATALAR</th>
              <th style={{ padding: '15px' }}>JOY NOMI</th>
              <th style={{ padding: '15px' }}>HOLAT</th>
              <th style={{ padding: '15px' }}>VAQT</th>
            </tr>
          </thead>
          <tbody>
            {targets.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>
                  Hozircha nishonlar belgilanmagan. <br/>
                  Flight sahifasiga o'tib, kartani bosing.
                </td>
              </tr>
            ) : (
              targets.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#fff', opacity: t.status === 'Yoʻq qilindi' ? 0.7 : 1 }}>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Target size={14} color={t.status === 'Faol' ? '#ef4444' : '#64748b'} />
                      <b>{t.label}</b>
                    </div>
                  </td>
                  <td style={{ padding: '15px', fontFamily: 'monospace', color: t.status === 'Faol' ? '#fbbf24' : '#94a3b8' }}>
                    {t.lat.toFixed(6)}, {t.lng.toFixed(6)}
                  </td>
                  <td style={{ padding: '15px', fontSize: '12px', color: '#94a3b8', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {t.address}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '11px', 
                      background: t.status === 'Faol' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                      color: t.status === 'Faol' ? '#ef4444' : '#22c55e',
                      border: t.status === 'Faol' ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(34, 197, 94, 0.2)'
                    }}>
                      {t.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px', color: '#94a3b8', fontSize: '13px' }}>{t.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TargetView;

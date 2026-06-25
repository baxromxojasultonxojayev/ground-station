import React from 'react';
import { Target, Trash2, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TargetViewProps {
  targets: any[];
  onClearArchive: () => void;
}

const TargetView: React.FC<TargetViewProps> = ({ targets, onClearArchive }) => {
  const { t } = useTranslation();
  return (
    <div className="view-placeholder target-view">
      <div className="view-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '900px' }}>
        <div>
          <h1>{t('views.target.title')}</h1>
          <p>{t('views.target.desc')}</p>
        </div>
        {targets.length > 0 && (
          <button 
            onClick={onClearArchive}
            className="reset-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
          >
            <Trash2 size={16} /> {t('views.target.clearArchive')}
          </button>
        )}
      </div>
      
      <div className="targets-list" style={{ width: '100%', maxWidth: '900px', marginTop: '30px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ background: '#1e293b', color: '#64748b', fontSize: '12px', textAlign: 'left' }}>
            <tr>
              <th style={{ padding: '15px' }}>{t('views.target.id')}</th>
              <th style={{ padding: '15px' }}>{t('views.target.coords')}</th>
              <th style={{ padding: '15px' }}>{t('views.target.placeName')}</th>
              <th style={{ padding: '15px' }}>{t('views.target.status')}</th>
              <th style={{ padding: '15px' }}>{t('views.target.time')}</th>
            </tr>
          </thead>
          <tbody>
            {targets.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>
                  {t('views.target.noTargets')} <br/>
                  {t('views.target.goToFlight')}
                </td>
              </tr>
            ) : (
              targets.map(tItem => (
                <tr key={tItem.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#fff', opacity: tItem.status === t('views.target.destroyed') || tItem.status === 'Yoʻq qilindi' ? 0.7 : 1 }}>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Target size={14} color={tItem.status === t('app.active') || tItem.status === 'Faol' ? '#ef4444' : '#64748b'} />
                      <b>{tItem.label}</b>
                    </div>
                  </td>
                  <td style={{ padding: '15px', fontFamily: 'monospace', color: tItem.status === t('app.active') || tItem.status === 'Faol' ? '#fbbf24' : '#94a3b8' }}>
                    {tItem.lat.toFixed(6)}, {tItem.lng.toFixed(6)}
                  </td>
                  <td style={{ padding: '15px', fontSize: '12px', color: '#94a3b8', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {tItem.address}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '11px', 
                      background: tItem.status === t('app.active') || tItem.status === 'Faol' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                      color: tItem.status === t('app.active') || tItem.status === 'Faol' ? '#ef4444' : '#22c55e',
                      border: tItem.status === t('app.active') || tItem.status === 'Faol' ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(34, 197, 94, 0.2)'
                    }}>
                      {tItem.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px', color: '#94a3b8', fontSize: '13px' }}>{tItem.time}</td>
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

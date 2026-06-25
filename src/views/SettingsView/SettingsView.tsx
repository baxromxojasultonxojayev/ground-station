import React from 'react';
import { useTranslation } from 'react-i18next';

const SettingsView: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="view-placeholder settings-view">
      <h1>{t('views.settings.title')}</h1>
      <div className="settings-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '20px', 
        marginTop: '40px',
        width: '100%',
        maxWidth: '700px'
      }}>
        <div className="setting-card" style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', textAlign: 'left' }}>
          <h3 style={{ color: '#3b82f6', marginBottom: '10px' }}>{t('views.settings.commPort')}</h3>
          <select style={{ background: '#0f172a', color: '#fff', border: '1px solid #334155', padding: '8px', width: '100%' }}>
            <option>COM3 / dev/ttyUSB0</option>
            <option>COM4 / dev/ttyUSB1</option>
          </select>
        </div>
        <div className="setting-card" style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', textAlign: 'left' }}>
          <h3 style={{ color: '#3b82f6', marginBottom: '10px' }}>{t('views.settings.baudRate')}</h3>
          <select style={{ background: '#0f172a', color: '#fff', border: '1px solid #334155', padding: '8px', width: '100%' }}>
            <option>57600</option>
            <option>115200</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;

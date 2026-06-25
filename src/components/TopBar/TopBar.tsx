import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plane,
  Settings,
  BarChart,
  BarChart3,
  TrendingUp,
  Satellite,
  Signal,
  Battery,
  Droplets,
  LineChart
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './style.scss';

interface TopBarProps {
  data: any;
}

const TopBar: React.FC<TopBarProps> = ({ data }) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="top-bar-refined mono">
      {/* Left Section */}
      <div className="header-left">
        <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span className="logo-text">ATRAK</span>
          <select 
            className="lang-select" 
            value={i18n.language} 
            onChange={handleLanguageChange}
            style={{ 
              background: '#0f172a', 
              color: '#3b82f6', 
              border: '1px solid #334155', 
              borderRadius: '4px',
              padding: '2px 4px',
              fontSize: '10px',
              fontWeight: 'bold',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="uz">UZB</option>
            <option value="tr">TÜRK</option>
          </select>
        </div>
        <div className="nav-arrows">
          <div className="arrow"><ChevronLeft size={16} /></div>
          <div className="arrow"><ChevronRight size={16} /></div>
        </div>
        <div className="status-icons">
          <div className="icon-circle">H</div>
          <div className="icon-circle">{i18n.language.toUpperCase()}</div>
        </div>
        <div className="mode-grid">
          <div className="mode-row">
            <span className="indicator active-red">{t('topbar.alt')}</span>
            <span className="indicator dimmed">{t('topbar.spd')}</span>
            <span className="indicator active-red">{t('topbar.sys')}</span>
            <span className="indicator dimmed">{t('topbar.gnss')}</span>
            <span className="indicator dimmed">{t('topbar.sign')}</span>
          </div>
          <div className="mode-row">
            <span className="indicator dimmed">{t('topbar.com')}</span>
            <span className="indicator dimmed">{t('topbar.eng')}</span>
            <span className="indicator dimmed">{t('topbar.aux')}</span>
            <span className="indicator dimmed">{t('topbar.loc')}</span>
            <span className="indicator active-red">{t('topbar.man')}</span>
          </div>
        </div>
        <div className="special-indicators">
          <div className="spec-badge">A. D. <div className="dot"></div></div>
        </div>
        <div className="spec-icon-box">
          <Plane size={24} color="#000" />
        </div>
        <div className="ekf-badges">
          <div className="mode-badge green">EKF</div>
          <div className="mode-badge green">EKF</div>
        </div>
      </div>

      {/* Center Section */}
      <div className="header-center">
        <div className="operation-modes">
          <span className="op-mode active">{t('topbar.autonomous')}</span>
          <span className="op-mode active">{t('topbar.routeTracking')}</span>
          <span className="op-mode active">{t('topbar.circle')}</span>
        </div>
        <div className="bottom-mini-icons">
          <Settings size={12} /> <BarChart size={12} /> <BarChart3 size={12} /> <TrendingUp size={12} />
        </div>
      </div>

      {/* Right Section */}
      <div className="header-right">
        <div className="time-section">
          <div className="clock glow-text">0:06:40</div>
          <div className="timer">{data.timer}s</div>
        </div>
        <div className="sat-section" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Satellite size={18} className="icon" />
          <span className="sat-count">11</span>
        </div>
        <div className="signal-section" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Signal size={18} className="icon" />
          <div className="signal-labels" style={{ fontSize: '9px' }}>
            <span>L1</span><span>L2</span><span>L3</span>
          </div>
        </div>
        <div className="battery-section">
          <div className="bat-item">
            <div className="bat-container">
              <div className="bat-level"><div className="fill green" style={{ height: '86%' }}></div></div>
              <div className="bat-info">
                <span className="bat-val glow-green">%86</span>
                <span className="bat-sub">28.26V</span>
              </div>
            </div>
          </div>
        </div>
        <div className="liquid-section">
          <div className="drop-icon-container" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Droplets size={18} className="drop-icon" style={{ color: '#ef4444' }} />
            <div className="drop-info">
              <span className="drop-val glow-red">%4</span>
              <span className="drop-sub">--- dk</span>
            </div>
          </div>
        </div>
        <div className="flag-uz-wrapper">
          <div className="flag-uz">
            <div className="uz-blue"></div>
            <div className="uz-white"></div>
            <div className="uz-green"></div>
            <div className="uz-red-line top"></div>
            <div className="uz-red-line bottom"></div>
          </div>
          <LineChart size={14} className="flag-sub-icon" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

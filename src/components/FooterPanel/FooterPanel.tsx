import React from 'react';
import {
  ShieldAlert,
  Map,
  RotateCw,
  MoveUpRight,
  LayoutDashboard,
  Navigation,
  ArrowDownToLine,
  Redo2,
  ArrowDownWideNarrow,
  Zap,
  Lock,
  Bell,
  RefreshCcw,
  Clock,
  Volume2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './style.scss';

interface FooterPanelProps {
   data: any;
}

const FooterPanel: React.FC<FooterPanelProps> = ({ data }) => {
  const { t } = useTranslation();
  const { attitude, telemetry, airspeed, altitude, rpm, vSpeed, systemTime } = data;

  return (
    <div className="footer-panel mono">
      <div className="tactical-container">
        
        {/* --- LEFT WING: ENGINE & AIRSPEED --- */}
        <div className="wing wing-left">
          <div className="widget-group buttons-console">
             <div className="group-label">{t('footer.missionControl')}</div>
             <div className="console-grid">
                <div className="c-btn"><ShieldAlert size={16} /><span>{t('footer.danger')}</span></div>
                <div className="c-btn"><Map size={16} /><span>{t('footer.path')}</span></div>
                <div className="c-btn active"><RotateCw size={16} /><span>{t('footer.orbit')}</span></div>
                <div className="c-btn"><MoveUpRight size={16} /><span>{t('footer.pist')}</span></div>
                <div className="c-btn"><LayoutDashboard size={16} /><span>{t('footer.msn')}</span></div>
                <div className="c-btn"><Navigation size={16} /><span>{t('footer.home')}</span></div>
                <div className="c-btn"><ArrowDownToLine size={16} /><span>{t('footer.flar')}</span></div>
                <div className="c-btn"><Redo2 size={16} /><span>{t('footer.pass')}</span></div>
                <div className="c-btn"><ArrowDownWideNarrow size={16} /><span>{t('footer.appr')}</span></div>
                <div className="c-btn"><Zap size={16} /><span>{t('footer.quick')}</span></div>
             </div>
          </div>
          
          <div className="widget-group engine-stats">
             <div className="group-label">{t('footer.engine')}</div>
             <div className="engine-widget">
                <div className="gauge-mini">
                   <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <path d="M 20 80 A 42 42 0 1 1 80 80" fill="none" stroke="#fbbf24" strokeWidth="8" strokeDasharray="160 200" />
                   </svg>
                   <div className="g-val">{rpm}</div>
                   <div className="g-unit">RPM</div>
                </div>
                <div className="engine-data">
                   <div className="d-item"><span>{t('footer.throttle')}:</span> <b>84%</b></div>
                   <div className="d-item"><span>{t('footer.temp')}:</span> <b>156°C</b></div>
                   <div className="d-item"><span>{t('footer.pressure')}:</span> <b>3.2B</b></div>
                </div>
             </div>
          </div>
        </div>

        {/* --- LEFT-CENTER: ENVIRONMENT --- */}
        <div className="mid-panel environment-panel">
           <div className="group-label">{t('footer.env')}</div>
           <div className="wind-widget">
              <div className="wind-dial">
                 <div className="arrow" style={{ transform: 'rotate(45deg)' }}>▲</div>
                 <div className="speed">12</div>
                 <div className="unit">{t('footer.kmh')}</div>
              </div>
              <div className="weather-stats">
                 <div className="w-row"><span>{t('footer.humidity')}:</span> <b>%42</b></div>
                 <div className="w-row"><span>{t('footer.pressure')}:</span> <b>1013hPa</b></div>
                 <div className="w-row"><span>{t('footer.visibility')}:</span> <b>10km</b></div>
              </div>
           </div>
        </div>

        {/* --- CENTER CORE: FLIGHT PRIMARY --- */}
        <div className="flight-core">
          <div className="airspeed-tape">
             <div className="tape-label">{t('footer.airspeed')}</div>
            <div className="tape-indicator">{airspeed}</div>
            <div className="tape-scale">
              {[80, 70, 60, 50, 40, 30].map(v => <div key={v} className="tick"><span>{v}</span></div>)}
            </div>
          </div>

          <div className="attitude-indicator-v3">
            <div className="ai-viewport">
              <div className="ai-horizon" style={{ transform: `rotate(${attitude.roll}deg) translateY(${attitude.pitch * 3}px)` }}>
                <div className="sky"></div>
                <div className="ground"></div>
                <div className="pitch-lines">
                   {[20, 10, 0, -10, -20].map(p => (
                      <div key={p} className="p-line"><span>{Math.abs(p)}</span></div>
                   ))}
                </div>
              </div>
              <div className="ai-fixed-marks">
                <div className="center-cross"></div>
                <div className="roll-scale"></div>
              </div>
            </div>
            <div className="ai-footer">
               <div className="stat">{t('footer.roll')}: {attitude.roll.toFixed(1)}°</div>
               <div className="stat">{t('footer.pitch')}: {attitude.pitch.toFixed(1)}°</div>
            </div>
          </div>

          <div className="altitude-tape">
            <div className="tape-label">{t('footer.altitude')}</div>
            <div className="tape-indicator">{altitude}</div>
            <div className="tape-scale">
              {[3000, 2500, 2000, 1500, 1000].map(v => <div key={v} className="tick"><span>{v}</span></div>)}
            </div>
          </div>
        </div>

        {/* --- RIGHT-CENTER: CONNECTIVITY --- */}
        <div className="mid-panel connectivity-panel">
           <div className="group-label">{t('footer.commEnergy')}</div>
           <div className="conn-widget">
              <div className="battery-box">
                 <div className="bat-label">{t('footer.power')}: %86</div>
                 <div className="bat-bar">
                    <div className="fill green" style={{ width: '86%' }}></div>
                 </div>
                 <div className="bat-stats">28.2V | 12.4A</div>
              </div>
              <div className="signal-box">
                 <div className="sig-label">{t('footer.signalQuality')}</div>
                 <div className="sig-graph">
                    {[60, 80, 70, 90, 85, 95].map((h, i) => (
                       <div key={i} className="bar" style={{ height: `${h}%` }}></div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* --- RIGHT WING: NAVIGATION & STATUS --- */}
        <div className="wing wing-right">
          <div className="widget-group compass-group">
             <div className="group-label">{t('footer.nav')}</div>
             <div className="compass-widget">
                <div className="compass-ring" style={{ transform: `rotate(-${telemetry.heading}deg)` }}>
                   {[0, 45, 90, 135, 180, 225, 270, 315].map(d => {
                      const labels: any = {0: t('footer.north'), 90: t('footer.northeast'), 180: t('footer.south'), 270: t('footer.west')};
                      return <div key={d} className="c-mark" style={{ transform: `rotate(${d}deg)` }}>{labels[d] || d}</div>
                   })}
                </div>
                <div className="compass-center-v3">
                   <div className="heading-val">{telemetry.heading.toFixed(0)}°</div>
                   <div className="plane-icon">▲</div>
                </div>
             </div>
          </div>

          <div className="widget-group extra-stats">
             <div className="group-label">{t('footer.status')}</div>
             <div className="stats-grid-v3">
                <div className="s-box"><span>{t('footer.vspeed')}</span><b>{vSpeed}</b><small>ft/dk</small></div>
                <div className="s-box"><span>LAT</span><b>26.66</b></div>
                <div className="s-box"><span>LON</span><b>40.78</b></div>
                <div className="s-box"><span>BAL</span><b>1.0</b><small>ft</small></div>
             </div>
          </div>
        </div>

      </div>

      {/* --- BOTTOM STATUS STRIP --- */}
      <div className="footer-status-strip-v3">
         <div className="s-left">
            <span className="b-chip green">TCP</span>
            <span className="b-chip blue">UDP</span>
            <span className="label">{t('footer.server')}: <b>PC1</b></span>
            <span className="label">ID: <b>A-6-PC1</b></span>
         </div>
         <div className="s-center">
            <div className="alert-badge">{t('footer.unauthorizedTracking')}</div>
         </div>
         <div className="s-right">
            <span className="label">RTK 1-2</span>
            <div className="led green active"></div>
            <div className="led green active"></div>
            <div className="s-icon"><Bell size={16} /></div>
            <div className="s-icon"><RefreshCcw size={16} /></div>
            <div className="s-icon"><Clock size={16} /></div>
            <span className="version">v1.0.5</span>
            <span className="timestamp">{systemTime}</span>
            <div className="s-icon"><Volume2 size={16} /></div>
            <div className="ekf-badge">P</div>
         </div>
      </div>
    </div>
  );
};

export default FooterPanel;

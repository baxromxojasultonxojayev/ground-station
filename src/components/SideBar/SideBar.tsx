import React from 'react';
import { 
  Menu, 
  Plane, 
  Timer, 
  ClipboardList, 
  AlertTriangle, 
  Grid, 
  Settings, 
  Cpu, 
  LayoutGrid, 
  Target, 
  Layers, 
  Radio, 
  MoreHorizontal
} from 'lucide-react';
import './style.scss';

interface SideBarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ activeTab, onTabChange }) => {
  const icons = [
    { id: 'menu', component: <Menu size={22} />, type: 'hamburger' },
    { id: 'drone', component: <Plane size={22} /> },
    { id: 'speed', component: <Timer size={22} /> },
    { id: 'checklist', component: <ClipboardList size={22} /> },
    { id: 'warning', component: <AlertTriangle size={22} /> },
    { id: 'grid', component: <Grid size={22} /> },
    { id: 'parameters', component: <Settings size={22} /> },
    { id: 'chip', component: <Cpu size={22} /> },
    { id: 'dots', component: <LayoutGrid size={22} /> },
    { id: 'target', component: <Target size={22} /> },
    { id: 'layers', component: <Layers size={22} /> },
    { id: 'antenna', component: <Radio size={22} /> },
    { id: 'more', component: <MoreHorizontal size={22} /> },
    { id: 'settings', component: <Settings size={22} /> }
  ];

  return (
    <div className="sidebar">
      {icons.map((icon, index) => (
        <div 
          key={index} 
          className={`sidebar-icon ${activeTab === icon.id ? 'active' : ''}`}
          onClick={() => onTabChange(icon.id)}
        >
          {icon.component}
        </div>
      ))}
    </div>
  );
};

export default SideBar;

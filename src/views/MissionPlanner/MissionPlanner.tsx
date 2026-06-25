import React from 'react';
import { useTranslation } from 'react-i18next';

const MissionPlanner: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="view-placeholder mission-planner">
      <h1>{t('views.planner.title')}</h1>
      <div className="planner-mock">
        <p>{t('views.planner.desc')}</p>
        <div className="grid-overlay"></div>
      </div>
    </div>
  );
};

export default MissionPlanner;

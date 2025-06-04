import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import SalesForecastChart from '../components/Dashboard/SalesForecastChart';
import DealTypeChart from '../components/Dashboard/DealTypeChart';
import BalanceOverviewChart from '../components/Dashboard/BalanceOverviewChart';
import DealsTable from '../components/Dashboard/DealsTable';
import TasksList from '../components/Dashboard/TasksList';

const IndexPage: React.FC = () => {
  return (
    <MainAppLayout>
      <StatsCardGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesForecastChart className="lg:col-span-2" />
        <DealTypeChart className="lg:col-span-1" />
      </div>

      <BalanceOverviewChart />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DealsTable className="lg:col-span-2" />
        <TasksList className="lg:col-span-1" /> 
        {/* TasksList is designed with h-full, so it will adapt to the row height determined by DealsTable */}
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;

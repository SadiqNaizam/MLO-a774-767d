import React from 'react';
import { cn } from '@/lib/utils';
import StatsCard, { StatsCardProps } from './StatsCard';
import { BellRing, Banknote, TrendingUp, Award, Heart } from 'lucide-react';

interface StatsCardGridProps {
  className?: string;
}

const statsData: StatsCardProps[] = [
  {
    id: 'campaign-sent',
    title: 'CAMPAIGN SENT',
    value: '197',
    icon: BellRing,
    iconContainerClass: 'bg-green-100 text-green-600',
    statusDotColor: 'green',
  },
  {
    id: 'annual-profit',
    title: 'ANNUAL PROFIT',
    value: '$489.4k',
    icon: Banknote,
    iconContainerClass: 'bg-blue-100 text-blue-600',
    statusDotColor: 'green',
  },
  {
    id: 'lead-conversation',
    title: 'LEAD CONVERSATION',
    value: '32.89%',
    icon: TrendingUp,
    iconContainerClass: 'bg-yellow-100 text-yellow-600',
    statusDotColor: 'red',
  },
  {
    id: 'daily-average-income',
    title: 'DAILY AVERAGE INCOME',
    value: '$1,596.5',
    icon: Award,
    iconContainerClass: 'bg-purple-100 text-purple-600',
    statusDotColor: 'green',
  },
  {
    id: 'annual-deals',
    title: 'ANNUAL DEALS',
    value: '2,659',
    icon: Heart,
    iconContainerClass: 'bg-red-100 text-red-600',
    statusDotColor: 'red',
  },
];

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6', className)}>
      {statsData.map((stat) => (
        <StatsCard
          key={stat.id}
          id={stat.id}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconContainerClass={stat.iconContainerClass}
          statusDotColor={stat.statusDotColor}
        />
      ))}
    </div>
  );
};

export default StatsCardGrid;

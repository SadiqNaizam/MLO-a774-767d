import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import type { LucideProps } from 'lucide-react';

export interface StatsCardProps {
  id: string;
  title: string;
  value: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  iconContainerClass: string;
  statusDotColor?: 'green' | 'red';
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  iconContainerClass,
  statusDotColor,
  className,
}) => {
  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <div className="flex items-center mb-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              {title}
            </p>
            {statusDotColor && (
              <span className={cn(
                'ml-2 h-2 w-2 rounded-full',
                statusDotColor === 'green' ? 'bg-green-500' : 'bg-red-500'
              )}></span>
            )}
          </div>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
        </div>
        <div className={cn('p-3 rounded-md', iconContainerClass)}>
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

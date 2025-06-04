import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';

interface SalesForecastChartProps {
  className?: string;
}

const salesForecastData = [
  { name: 'Goal', value: 37000, fill: '#405189', rawValue: 37 }, 
  { name: 'Pending Forecast', value: 12000, fill: '#0AB39C', rawValue: 12 },
  { name: 'Revenue', value: 18000, fill: '#F7B84B', rawValue: 18 }, 
];

const formatYAxisTick = (value: number) => {
  if (value === 0) return '$0k';
  return `$${value / 1000}k`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 border border-border rounded shadow-lg">
        <p className="font-medium text-foreground">{`${payload[0].payload.name}: ${payload[0].payload.rawValue}k`}</p>
      </div>
    );
  }
  return null;
};

const SalesForecastChart: React.FC<SalesForecastChartProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="grid gap-1.5">
          <CardTitle>Sales Forecast</CardTitle>
          <CardDescription>Total Forecasted Value</CardDescription>
        </div>
        <Select defaultValue="nov-2021">
          <SelectTrigger className="w-[160px] text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nov-2021">Nov 2021</SelectItem>
            <SelectItem value="oct-2021">Oct 2021</SelectItem>
            <SelectItem value="current-year">Current Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesForecastData} layout="vertical" margin={{ top: 5, right: 0, left: -25, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
              <XAxis type="number" tickFormatter={formatYAxisTick} axisLine={false} tickLine={false} domain={[0, 40000]} ticks={[0, 10000, 20000, 30000, 40000]} />
              <YAxis type="category" dataKey="name" hide={true} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))' }} />
              <Bar dataKey="value" barSize={35} radius={[4, 4, 4, 4]}>
                {salesForecastData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-4 mt-4 text-xs text-muted-foreground">
          {salesForecastData.map((item) => (
            <div key={item.name} className="flex items-center">
              <span className="h-2.5 w-2.5 rounded-sm mr-1.5" style={{ backgroundColor: item.fill }}></span>
              {item.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesForecastChart;

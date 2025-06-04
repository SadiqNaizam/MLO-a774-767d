import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip
} from 'recharts';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';

interface DealTypeChartProps {
  className?: string;
}

const dealTypeData = [
  { subject: '2018', Pending: 65, Loss: 40, Won: 75, fullMark: 100 },
  { subject: '2019', Pending: 80, Loss: 55, Won: 60, fullMark: 100 },
  { subject: '2020', Pending: 50, Loss: 70, Won: 85, fullMark: 100 },
  { subject: '2021', Pending: 70, Loss: 30, Won: 95, fullMark: 100 },
  { subject: '2022', Pending: 90, Loss: 20, Won: 70, fullMark: 100 }, // Changed from 2016 for more recent look
  { subject: '2023', Pending: 60, Loss: 45, Won: 80, fullMark: 100 }, // Changed from 2017
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 border border-border rounded shadow-lg text-sm">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} style={{ color: pld.color }} className="flex justify-between">
            <span>{pld.name}:</span>
            <span className="font-medium ml-2">{pld.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const DealTypeChart: React.FC<DealTypeChartProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Deal Type</CardTitle>
        <Select defaultValue="monthly">
          <SelectTrigger className="w-[160px] text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dealTypeData}>
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.1"/>
                </filter>
              </defs>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tickCount={6} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} axisLine={false} />
              <Radar name="Pending" dataKey="Pending" stroke="#F7B84B" fill="#F7B84B" fillOpacity={0.5} strokeWidth={2} filter="url(#shadow)"/>
              <Radar name="Loss" dataKey="Loss" stroke="#F06548" fill="#F06548" fillOpacity={0.5} strokeWidth={2} filter="url(#shadow)"/>
              <Radar name="Won" dataKey="Won" stroke="#0AB39C" fill="#0AB39C" fillOpacity={0.6} strokeWidth={2} filter="url(#shadow)"/>
              <Legend wrapperStyle={{ paddingTop: '20px' }} formatter={(value, entry) => <span style={{ color: 'hsl(var(--muted-foreground))' }}>{value}</span>} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealTypeChart;

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';

interface BalanceOverviewChartProps {
  className?: string;
}

const balanceOverviewData = [
  { month: 'Jan', revenue: 12000, expenses: 10000 },
  { month: 'Feb', revenue: 15000, expenses: 11000 },
  { month: 'Mar', revenue: 22000, expenses: 13000 }, 
  { month: 'Apr', revenue: 18000, expenses: 15000 }, 
  { month: 'May', revenue: 25000, expenses: 16000 },
  { month: 'Jun', revenue: 23000, expenses: 18000 }, 
  { month: 'Jul', revenue: 28000, expenses: 20000 },
  { month: 'Aug', revenue: 32000, expenses: 22000 },
  { month: 'Sep', revenue: 27000, expenses: 25000 }, 
  { month: 'Oct', revenue: 35000, expenses: 27000 },
  { month: 'Nov', revenue: 42000, expenses: 30000 }, 
  { month: 'Dec', revenue: 38000, expenses: 33000 }, 
];

const totalRevenue = balanceOverviewData.reduce((sum, item) => sum + item.revenue, 0);
const totalExpenses = balanceOverviewData.reduce((sum, item) => sum + item.expenses, 0);
const profitRatio = totalExpenses > 0 ? ((totalRevenue - totalExpenses) / totalExpenses) * 100 : 0;

const formatCurrency = (value: number) => `$${(value / 1000).toFixed(0)}k`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 border border-border rounded shadow-lg text-sm">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} style={{ color: pld.stroke }} className="flex justify-between">
            <span>{pld.name}:</span>
            <span className="font-medium ml-2">{formatCurrency(pld.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const BalanceOverviewChart: React.FC<BalanceOverviewChartProps> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Balance Overview</CardTitle>
          <div className="flex items-baseline space-x-4 mt-2">
            <p><span className="text-2xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</span> <span className="text-sm text-muted-foreground">Revenue</span></p>
            <p><span className="text-2xl font-bold text-red-500">{formatCurrency(totalExpenses)}</span> <span className="text-sm text-muted-foreground">Expenses</span></p>
            <p><span className="text-2xl font-bold text-green-600">{profitRatio.toFixed(1)}%</span> <span className="text-sm text-muted-foreground">Profit Ratio</span></p>
          </div>
        </div>
        <Select defaultValue="current-year">
          <SelectTrigger className="w-[160px] text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current-year">Current Year</SelectItem>
            <SelectItem value="last-year">Last Year</SelectItem>
            <SelectItem value="all-time">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={balanceOverviewData} margin={{ top: 5, right: 20, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false}/>
              <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(value) => `$${value/1000}k`} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 'dataMax + 5000']}/>
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }} />
              <Legend verticalAlign="top" align="right" height={36} iconType="circle" iconSize={8} formatter={(value) => <span className="text-xs text-muted-foreground ml-1">{value}</span>}/>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0AB39C" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0AB39C" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F06548" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F06548" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="revenue" stroke="#0AB39C" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" dot={{ r:0 }} activeDot={{ r: 5, strokeWidth: 2, fill: '#fff' }} />
              <Area type="monotone" dataKey="expenses" stroke="#F06548" strokeWidth={2.5} fillOpacity={1} fill="url(#colorExpenses)" name="Expenses" dot={{ r:0 }} activeDot={{ r: 5, strokeWidth: 2, fill: '#fff' }}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceOverviewChart;

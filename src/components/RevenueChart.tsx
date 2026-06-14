import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { WeeklyData } from '../types';

interface RevenueChartProps {
  data: WeeklyData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="w-full h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="week" stroke="#55555A" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis 
            stroke="#55555A" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `₱${value}`}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2A2E" />
          <Tooltip 
            formatter={(value: number) => [`₱${value.toLocaleString()}`, undefined]}
            contentStyle={{ backgroundColor: '#1A1A1F', borderColor: '#2A2A2E', borderRadius: '4px', fontSize: '10px', color: '#E0E0E0' }}
            itemStyle={{ color: '#E0E0E0', fontSize: '12px', fontFamily: 'monospace' }}
          />
          <ReferenceLine y={10000} label={{ position: 'top', value: 'Goal (₱10k)', fill: '#8E8E93', fontSize: 10 }} stroke="#55555A" strokeDasharray="3 3" />
          <Area type="monotone" dataKey="target" stroke="#3B82F6" fillOpacity={1} fill="url(#colorTarget)" name="Target Revenue" />
          <Area type="monotone" dataKey="revenue" stroke="#22C55E" fillOpacity={1} fill="url(#colorRevenue)" name="Actual/Projected" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

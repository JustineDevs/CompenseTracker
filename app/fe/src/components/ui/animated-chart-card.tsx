"use client";

import * as React from 'react';
import { BarChart2, ArrowUpRight, TrendingUp, Users, Eye, Activity } from 'lucide-react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

interface ChartData {
  day: string;
  visitors: number;
}

interface AnimatedChartCardProps {
  data?: ChartData[];
  title?: string;
  linkHref?: string;
  linkText?: string;
  className?: string;
}

const defaultWeeklyData: ChartData[] = [
  { day: 'M', visitors: 0 },
  { day: 'T', visitors: 0 },
  { day: 'W', visitors: 0 },
  { day: 'T', visitors: 0 },
  { day: 'F', visitors: 0 },
  { day: 'S', visitors: 0 },
  { day: 'S', visitors: 0 },
];

const chartWidth = 280;
const chartHeight = 120;

export const AnimatedChartCard: React.FC<AnimatedChartCardProps> = ({
  data = defaultWeeklyData,
  title = "Weekly Visitors",
  linkHref = "#",
  linkText = "View Full Analytics",
  className = ""
}) => {
  const [activeDay, setActiveDay] = React.useState(data[data.length - 1]);
  const [isHovered, setIsHovered] = React.useState(false);

  // Calculate totals
  const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
  const maxVisitors = Math.max(...data.map(d => d.visitors), 1); // Avoid division by zero
  const avgVisitors = Math.round(totalVisitors / data.length);

  // Convert data to SVG path string with area fill
  const pathData = data.map((d, i) => {
    const x = (i / (data.length - 1)) * chartWidth;
    const y = chartHeight - (d.visitors / maxVisitors) * chartHeight;
    return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
  }).join(' ');

  // Create area path for fill
  const areaPath = `${pathData} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

  return (
    <motion.div
      className={`relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl p-6 rounded-2xl w-80 space-y-5 shadow-2xl border border-white/25 ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/30"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <BarChart2 className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide">{title}</h3>
            <p className="text-white/60 text-xs">Last 7 days</p>
          </div>
        </div>
        <motion.div
          className="p-2 rounded-lg bg-white/10 border border-white/20"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <Activity className="w-4 h-4 text-green-400" />
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div 
          className="text-center p-3 rounded-lg bg-white/5 border border-white/10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-2xl font-bold text-white mb-1">{totalVisitors.toLocaleString()}</div>
          <div className="text-xs text-white/60 flex items-center justify-center gap-1">
            <Users className="w-3 h-3" />
            Total
          </div>
        </motion.div>
        <motion.div 
          className="text-center p-3 rounded-lg bg-white/5 border border-white/10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-2xl font-bold text-white mb-1">{avgVisitors}</div>
          <div className="text-xs text-white/60 flex items-center justify-center gap-1">
            <Eye className="w-3 h-3" />
            Average
          </div>
        </motion.div>
        <motion.div 
          className="text-center p-3 rounded-lg bg-white/5 border border-white/10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-2xl font-bold text-white mb-1">{maxVisitors}</div>
          <div className="text-xs text-white/60 flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Peak
          </div>
        </motion.div>
      </div>

      {/* Chart Section */}
      <div className="relative">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 20}`} className="w-full h-32">
            {/* Grid lines */}
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            
            {/* Area fill */}
            <motion.path
              d={areaPath}
              fill="url(#areaGradient)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {/* Line */}
            <motion.path
              d={pathData}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {/* Data points */}
            {data.map((d, i) => {
              const x = (i / (data.length - 1)) * chartWidth;
              const y = chartHeight - (d.visitors / maxVisitors) * chartHeight;
              const isActive = activeDay.day === d.day;
              
              return (
                <motion.circle
                  key={d.day}
                  cx={x}
                  cy={y}
                  r={isActive ? 6 : 4}
                  fill={isActive ? "#60a5fa" : "#3b82f6"}
                  stroke="white"
                  strokeWidth={isActive ? 2 : 1}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.5 }}
                />
              );
            })}
            
            {/* Interaction layer */}
            {data.map((d, i) => (
              <rect
                key={i}
                onMouseEnter={() => setActiveDay(d)}
                x={(i / (data.length - 1)) * chartWidth - (chartWidth / (data.length - 1)) / 2}
                y="0"
                width={chartWidth / (data.length - 1)}
                height={chartHeight + 20}
                fill="transparent"
                className="cursor-pointer"
              />
            ))}
          </svg>
          
          {/* Day labels */}
          <div className="flex justify-between mt-2">
            {data.map((d) => (
              <span
                key={d.day}
                className={`text-xs font-medium transition-colors duration-200 ${
                  activeDay.day === d.day ? 'text-blue-300' : 'text-white/50'
                }`}
              >
                {d.day}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Active Day Info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay.day + activeDay.visitors}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white/10 rounded-lg p-3 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">{activeDay.day}day</div>
              <div className="text-white/60 text-sm">{activeDay.visitors} visitors</div>
            </div>
            <div className="text-right">
              <div className="text-green-400 text-sm font-medium">
                {activeDay.visitors > avgVisitors ? '+' : ''}
                {activeDay.visitors - avgVisitors}
              </div>
              <div className="text-white/50 text-xs">vs avg</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <motion.div
        className="flex items-center justify-between pt-3 border-t border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-white/60 text-xs">Live data</span>
        </div>
        <motion.a
          href={linkHref}
          className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors duration-200"
          whileHover={{ x: 2 }}
        >
          {linkText}
          <ArrowUpRight className="w-3 h-3" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

// Export the component as default for easier imports
export default AnimatedChartCard;
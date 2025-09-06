"use client";

import * as React from 'react';
import { BarChart2, ArrowUpRight, TrendingUp, Users, Eye, Activity } from 'lucide-react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ProfessionalChart, DataPoint } from './professional-chart';

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

const chartWidth = 450;
const chartHeight = 60;

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

  // Convert data to Reaviz format
  const chartData: DataPoint[] = data.map((d, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (data.length - 1 - i));
    return {
      key: date,
      data: d.visitors
    };
  });

  return (
    <motion.div
      className={`relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl p-8 rounded-3xl w-[520px] space-y-6 shadow-2xl border border-white/25 ${className}`}
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
      <div className="grid grid-cols-3 gap-5">
        <motion.div 
          className="text-center p-4 rounded-xl bg-white/8 border border-white/15"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-3xl font-bold text-white mb-2">{totalVisitors.toLocaleString()}</div>
          <div className="text-sm text-white/70 flex items-center justify-center gap-2">
            <Users className="w-4 h-4" />
            Total
          </div>
        </motion.div>
        <motion.div 
          className="text-center p-4 rounded-xl bg-white/8 border border-white/15"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-3xl font-bold text-white mb-2">{avgVisitors}</div>
          <div className="text-sm text-white/70 flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            Average
          </div>
        </motion.div>
        <motion.div 
          className="text-center p-4 rounded-xl bg-white/8 border border-white/15"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-3xl font-bold text-white mb-2">{maxVisitors}</div>
          <div className="text-sm text-white/70 flex items-center justify-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Peak
          </div>
        </motion.div>
      </div>

      {/* Chart Section */}
      <div className="relative">
        <div className="bg-white/8 rounded-2xl p-4 border border-white/15">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ProfessionalChart
              id="visitors-chart"
              data={chartData}
              width={chartWidth}
              height={chartHeight}
              colorScheme="#3b82f6"
              showXAxisTicks={true}
              showYAxisTicks={false}
              isDarkMode={true}
              xAxisFormat={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { weekday: 'short' });
              }}
            />
          </motion.div>
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
          className="bg-white/12 rounded-xl p-4 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold text-lg">{activeDay.day}day</div>
              <div className="text-white/70 text-sm">{activeDay.visitors} visitors</div>
            </div>
            <div className="text-right">
              <div className="text-green-400 text-lg font-medium">
                {activeDay.visitors > avgVisitors ? '+' : ''}
                {activeDay.visitors - avgVisitors}
              </div>
              <div className="text-white/60 text-sm">vs avg</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <motion.div
        className="flex items-center justify-between pt-4 border-t border-white/15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-white/70 text-sm font-medium">Live data</span>
        </div>
        <motion.a
          href={linkHref}
          className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
          whileHover={{ x: 2 }}
        >
          {linkText}
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

// Export the component as default for easier imports
export default AnimatedChartCard;
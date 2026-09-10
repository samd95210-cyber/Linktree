import React from 'react';
import { BarChart3, TrendingUp, MousePointerClick, RefreshCw, Award } from 'lucide-react';
import { LinkButton } from '../types';

interface AnalyticsPanelProps {
  buttons: LinkButton[];
  onResetClicks: () => void;
}

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({
  buttons,
  onResetClicks,
}) => {
  const totalClicks = buttons.reduce((acc, b) => acc + (b.clicks || 0), 0);
  const activeCount = buttons.filter((b) => b.enabled).length;

  const sortedButtons = [...buttons].sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
  const topButton = sortedButtons[0]?.clicks > 0 ? sortedButtons[0] : null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
            Link Performance & Analytics
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Real-time click tracking across all your custom buttons
          </p>
        </div>

        <button
          onClick={onResetClicks}
          className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white p-1"
          title="Reset click counters"
        >
          <RefreshCw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="flex items-center gap-1 text-neutral-500 text-[11px] mb-1">
            <MousePointerClick size={13} />
            <span>Total Clicks</span>
          </div>
          <p className="text-xl font-bold text-neutral-900 dark:text-white">
            {totalClicks.toLocaleString()}
          </p>
        </div>

        <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="flex items-center gap-1 text-neutral-500 text-[11px] mb-1">
            <BarChart3 size={13} />
            <span>Active Links</span>
          </div>
          <p className="text-xl font-bold text-neutral-900 dark:text-white">
            {activeCount}
          </p>
        </div>

        <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="flex items-center gap-1 text-neutral-500 text-[11px] mb-1">
            <TrendingUp size={13} />
            <span>Avg / Link</span>
          </div>
          <p className="text-xl font-bold text-neutral-900 dark:text-white">
            {activeCount > 0 ? (totalClicks / activeCount).toFixed(1) : '0'}
          </p>
        </div>
      </div>

      {/* Top Performer Highlight */}
      {topButton && (
        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500 text-white">
              <Award size={18} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
                Top Performing Link
              </span>
              <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate max-w-[200px]">
                {topButton.title}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
              {topButton.clicks} clicks
            </span>
            <span className="text-[10px] text-neutral-500 block">
              {totalClicks > 0
                ? `${Math.round((topButton.clicks / totalClicks) * 100)}% of total`
                : '0%'}
            </span>
          </div>
        </div>
      )}

      {/* Breakdown per link */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          Click Breakdown
        </h4>

        <div className="space-y-2">
          {sortedButtons.map((btn) => {
            const percentage = totalClicks > 0 ? Math.round((btn.clicks / totalClicks) * 100) : 0;

            return (
              <div
                key={btn.id}
                className="p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-[220px]">
                    {btn.title}
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-neutral-900 dark:text-white font-semibold">
                      {btn.clicks}
                    </span>
                    <span className="text-[10px] text-neutral-400 w-8 text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neutral-900 dark:bg-white rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(percentage, 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

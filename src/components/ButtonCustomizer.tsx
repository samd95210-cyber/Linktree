import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ExternalLink,
  Tag,
  Palette,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Search,
  Check,
} from 'lucide-react';
import { LinkButton, ButtonAnimation } from '../types';
import { DynamicIcon } from './DynamicIcon';
import { AVAILABLE_ICONS } from '../data/defaultData';

interface ButtonCustomizerProps {
  buttons: LinkButton[];
  onUpdateButtons: (buttons: LinkButton[]) => void;
}

export const ButtonCustomizer: React.FC<ButtonCustomizerProps> = ({
  buttons,
  onUpdateButtons,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [iconPickerButtonId, setIconPickerButtonId] = useState<string | null>(null);
  const [iconSearch, setIconSearch] = useState('');

  // Auto-detect icon from URL if not explicitly changed
  const detectIconFromUrl = (url: string): string => {
    const lower = url.toLowerCase();
    if (lower.includes('github.com')) return 'Code';
    if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'Youtube';
    if (lower.includes('spotify.com')) return 'Music';
    if (lower.includes('substack.com') || lower.includes('medium.com')) return 'BookOpen';
    if (lower.includes('cal.com') || lower.includes('calendly.com')) return 'Calendar';
    if (lower.includes('shop') || lower.includes('store') || lower.includes('gumroad')) return 'ShoppingBag';
    if (lower.includes('podcast') || lower.includes('apple.com/podcast')) return 'Podcast';
    if (lower.includes('mailto:')) return 'Mail';
    return 'Globe';
  };

  const handleAddButton = () => {
    const newButton: LinkButton = {
      id: `btn-${Date.now()}`,
      title: 'New Custom Link',
      url: 'https://',
      icon: 'Globe',
      enabled: true,
      featured: false,
      badgeText: '',
      animation: 'none',
      clicks: 0,
      category: 'General',
    };
    onUpdateButtons([newButton, ...buttons]);
    setExpandedId(newButton.id);
  };

  const handleUpdate = (id: string, updates: Partial<LinkButton>) => {
    onUpdateButtons(
      buttons.map((btn) => {
        if (btn.id === id) {
          const updated = { ...btn, ...updates };
          // If URL changed and icon is default, try to auto-detect
          if (updates.url && (!btn.icon || btn.icon === 'Globe')) {
            updated.icon = detectIconFromUrl(updates.url);
          }
          return updated;
        }
        return btn;
      })
    );
  };

  const handleDelete = (id: string) => {
    onUpdateButtons(buttons.filter((b) => b.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= buttons.length) return;

    const newButtons = [...buttons];
    const temp = newButtons[index];
    newButtons[index] = newButtons[targetIndex];
    newButtons[targetIndex] = temp;
    onUpdateButtons(newButtons);
  };

  const filteredIcons = AVAILABLE_ICONS.filter((icon) =>
    icon.toLowerCase().includes(iconSearch.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header action */}
      <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
            Custom Buttons & Links
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Add, reorder, style, and highlight your links
          </p>
        </div>
        <button
          onClick={handleAddButton}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 rounded-lg text-xs font-semibold shadow-xs transition-transform active:scale-95 cursor-pointer"
          id="add-link-btn"
        >
          <Plus size={15} />
          <span>Add Button</span>
        </button>
      </div>

      {/* Button List */}
      <div className="space-y-3">
        {buttons.map((btn, index) => {
          const isExpanded = expandedId === btn.id;

          return (
            <div
              key={btn.id}
              className={`rounded-xl border transition-all duration-200 bg-white dark:bg-neutral-900/90 ${
                isExpanded
                  ? 'border-neutral-400 dark:border-neutral-600 shadow-sm'
                  : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              {/* Summary Bar */}
              <div className="p-3 sm:p-3.5 flex items-center justify-between gap-2.5">
                {/* Reorder handles */}
                <div className="flex flex-col gap-0.5 text-neutral-400">
                  <button
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="p-1 hover:text-neutral-900 dark:hover:text-white disabled:opacity-20 disabled:hover:text-neutral-400"
                    title="Move up"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === buttons.length - 1}
                    className="p-1 hover:text-neutral-900 dark:hover:text-white disabled:opacity-20 disabled:hover:text-neutral-400"
                    title="Move down"
                  >
                    <ArrowDown size={13} />
                  </button>
                </div>

                {/* Icon thumbnail & quick picker trigger */}
                <button
                  type="button"
                  onClick={() => setIconPickerButtonId(btn.id)}
                  className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors flex-shrink-0 cursor-pointer"
                  title="Change icon"
                >
                  <DynamicIcon name={btn.icon} size={18} />
                </button>

                {/* Title and URL */}
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : btn.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                      {btn.title || 'Untitled Button'}
                    </span>
                    {btn.featured && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                        {btn.badgeText || 'FEATURED'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                    {btn.url}
                  </p>
                </div>

                {/* Right controls: Enable Toggle & Expand */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline-block mr-1">
                    {btn.clicks} clicks
                  </span>

                  <button
                    onClick={() => handleUpdate(btn.id, { enabled: !btn.enabled })}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      btn.enabled
                        ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                        : 'text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                    title={btn.enabled ? 'Enabled' : 'Disabled'}
                  >
                    {btn.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : btn.id)}
                    className="p-1.5 rounded-md text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    title={isExpanded ? 'Collapse' : 'Customize'}
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Expanded Customizer Controls */}
              {isExpanded && (
                <div className="p-4 border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/40 rounded-b-xl space-y-3.5 text-xs">
                  {/* Title & URL inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                        Button Label / Title
                      </label>
                      <input
                        type="text"
                        value={btn.title}
                        onChange={(e) => handleUpdate(btn.id, { title: e.target.value })}
                        placeholder="e.g. My Latest Project"
                        className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                        Destination URL
                      </label>
                      <input
                        type="url"
                        value={btn.url}
                        onChange={(e) => handleUpdate(btn.id, { url: e.target.value })}
                        placeholder="https://yourwebsite.com"
                        className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                      />
                    </div>
                  </div>

                  {/* Category & Badge */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                        Category / Tag (optional)
                      </label>
                      <input
                        type="text"
                        value={btn.category || ''}
                        onChange={(e) => handleUpdate(btn.id, { category: e.target.value })}
                        placeholder="e.g. Work, Writing, Music"
                        className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                        Badge Text (e.g. NEW, HOT, FREE)
                      </label>
                      <input
                        type="text"
                        value={btn.badgeText || ''}
                        onChange={(e) => handleUpdate(btn.id, { badgeText: e.target.value })}
                        placeholder="e.g. NEW, 50% OFF"
                        className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                      />
                    </div>
                  </div>

                  {/* Animation & Highlight Settings */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                        Animation Effect
                      </label>
                      <select
                        value={btn.animation || 'none'}
                        onChange={(e) =>
                          handleUpdate(btn.id, { animation: e.target.value as ButtonAnimation })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                      >
                        <option value="none">None (Standard)</option>
                        <option value="pulse">Pulse (Eye-catching)</option>
                        <option value="bounce">Lift on Hover</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 pt-5">
                      <input
                        type="checkbox"
                        id={`featured-${btn.id}`}
                        checked={btn.featured}
                        onChange={(e) => handleUpdate(btn.id, { featured: e.target.checked })}
                        className="w-4 h-4 rounded text-neutral-900 focus:ring-neutral-900 dark:focus:ring-white"
                      />
                      <label
                        htmlFor={`featured-${btn.id}`}
                        className="text-neutral-800 dark:text-neutral-200 font-medium select-none cursor-pointer"
                      >
                        Highlight as Featured Button
                      </label>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60 dark:border-neutral-800">
                    <button
                      onClick={() => setIconPickerButtonId(btn.id)}
                      className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    >
                      <Palette size={14} />
                      <span>Pick Icon ({btn.icon})</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdate(btn.id, { clicks: 0 })}
                        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 text-[11px]"
                      >
                        Reset Clicks ({btn.clicks})
                      </button>

                      <button
                        onClick={() => handleDelete(btn.id)}
                        className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-700 p-1 rounded-md"
                        title="Delete button"
                      >
                        <Trash2 size={15} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {buttons.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
              No buttons added yet
            </p>
            <button
              onClick={handleAddButton}
              className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold"
            >
              Add Your First Button
            </button>
          </div>
        )}
      </div>

      {/* Icon Picker Modal */}
      {iconPickerButtonId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-sm w-full p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                Select Button Icon
              </h4>
              <button
                onClick={() => setIconPickerButtonId(null)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white text-xs px-2 py-1"
              >
                Close
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="text"
                placeholder="Search icon..."
                value={iconSearch}
                onChange={(e) => setIconSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            {/* Icon Grid */}
            <div className="grid grid-cols-4 gap-2 max-h-56 overflow-y-auto p-1">
              {filteredIcons.map((iconName) => (
                <button
                  key={iconName}
                  onClick={() => {
                    handleUpdate(iconPickerButtonId, { icon: iconName });
                    setIconPickerButtonId(null);
                  }}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-white hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer"
                >
                  <DynamicIcon name={iconName} size={20} />
                  <span className="text-[10px] mt-1.5 truncate max-w-full text-neutral-500">
                    {iconName}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

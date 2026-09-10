import React from 'react';
import { Check, Sparkles, Sliders } from 'lucide-react';
import { ThemeConfig, ButtonShape, ThemeFont } from '../types';
import { THEMES } from '../data/defaultData';

interface ThemeCustomizerProps {
  currentTheme: ThemeConfig;
  onSelectTheme: (theme: ThemeConfig) => void;
  onUpdateTheme: (updates: Partial<ThemeConfig>) => void;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  currentTheme,
  onSelectTheme,
  onUpdateTheme,
}) => {
  const buttonShapes: { id: ButtonShape; label: string; previewClass: string }[] = [
    { id: 'rounded', label: 'Rounded', previewClass: 'rounded-xl' },
    { id: 'pill', label: 'Pill', previewClass: 'rounded-full' },
    { id: 'sharp', label: 'Sharp', previewClass: 'rounded-none' },
    { id: 'brutalist', label: 'Brutalist', previewClass: 'rounded-lg border-2 border-neutral-900 shadow-[2px_2px_0px_#000]' },
    { id: 'glass', label: 'Glass', previewClass: 'rounded-xl bg-white/20 backdrop-blur-md border border-white/30' },
    { id: 'outline', label: 'Outline', previewClass: 'rounded-xl border-2 border-neutral-800' },
  ];

  const fontOptions: { id: ThemeFont; label: string; fontClass: string; desc: string }[] = [
    { id: 'jakarta', label: 'Plus Jakarta Sans', fontClass: 'font-jakarta', desc: 'Refined modern product sans' },
    { id: 'editorial', label: 'Playfair Display', fontClass: 'font-editorial', desc: 'High-fashion editorial serif' },
    { id: 'outfit', label: 'Outfit', fontClass: 'font-outfit', desc: 'Friendly clean geometric' },
    { id: 'spacemono', label: 'Space Mono', fontClass: 'font-spacemono', desc: 'Hacker & tech monospace' },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          Aesthetic Themes & Styling
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Choose a curated aesthetic palette or fine-tune button shapes and typography
        </p>
      </div>

      {/* Preset Theme Cards */}
      <div className="space-y-2.5">
        <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          Curated Theme Presets
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {THEMES.map((theme) => {
            const isSelected = currentTheme.id === theme.id;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onSelectTheme(theme)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'border-neutral-900 dark:border-white ring-2 ring-neutral-900/10 dark:ring-white/20 shadow-sm'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
                }`}
              >
                {/* Visual miniature preview bar */}
                <div
                  className={`w-full h-8 rounded-lg mb-2.5 flex items-center justify-center p-1.5 ${theme.backgroundStyle} border border-black/10 dark:border-white/10`}
                >
                  <div
                    className={`w-3/4 h-3.5 ${
                      theme.buttonShape === 'pill'
                        ? 'rounded-full'
                        : theme.buttonShape === 'sharp'
                        ? 'rounded-none'
                        : 'rounded-md'
                    } ${theme.buttonBg} ${theme.buttonBorder} flex items-center justify-center`}
                  >
                    <span className={`text-[8px] font-bold ${theme.buttonText}`}>
                      Demo Button
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">
                    {theme.name}
                  </span>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-0.5">
                  {theme.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Button Shape Customizer */}
      <div className="space-y-2.5 pt-2 border-t border-neutral-200 dark:border-neutral-800">
        <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          Button Shape & Architecture
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {buttonShapes.map((shape) => {
            const isSelected = currentTheme.buttonShape === shape.id;

            return (
              <button
                key={shape.id}
                type="button"
                onClick={() => onUpdateTheme({ buttonShape: shape.id })}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800 font-bold'
                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900'
                }`}
              >
                <div className="w-full flex items-center justify-center py-1 mb-1">
                  <div
                    className={`w-16 h-5 border border-neutral-400 dark:border-neutral-500 flex items-center justify-center text-[9px] ${shape.previewClass}`}
                  >
                    Button
                  </div>
                </div>
                <span className="text-xs text-neutral-800 dark:text-neutral-200">
                  {shape.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Typography Customizer */}
      <div className="space-y-2.5 pt-2 border-t border-neutral-200 dark:border-neutral-800">
        <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          Typography Pairing
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {fontOptions.map((f) => {
            const isSelected = currentTheme.font === f.id;

            return (
              <button
                key={f.id}
                type="button"
                onClick={() =>
                  onUpdateTheme({
                    font: f.id,
                    headerFontClass: f.fontClass,
                    bodyFontClass: f.id === 'editorial' ? 'font-dm' : f.fontClass,
                  })
                }
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800 shadow-2xs'
                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-sm font-semibold text-neutral-900 dark:text-white ${f.fontClass}`}>
                    {f.label}
                  </span>
                  {isSelected && <Check size={14} className="text-neutral-900 dark:text-white" />}
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {f.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

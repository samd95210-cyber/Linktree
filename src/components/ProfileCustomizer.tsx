import React, { useRef } from 'react';
import { Camera, CheckCircle2, MapPin, Upload, Sparkles } from 'lucide-react';
import { ProfileData } from '../types';
import { AVATAR_PRESETS } from '../data/defaultData';

interface ProfileCustomizerProps {
  profile: ProfileData;
  onUpdateProfile: (profile: ProfileData) => void;
}

export const ProfileCustomizer: React.FC<ProfileCustomizerProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFieldChange = (field: keyof ProfileData, value: string | boolean) => {
    onUpdateProfile({
      ...profile,
      [field]: value,
    });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleFieldChange('avatarUrl', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-5">
      <div className="pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          Profile & Bio Details
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Personalize your name, handle, avatar, and personal statement
        </p>
      </div>

      {/* Avatar Section */}
      <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 space-y-3.5">
        <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          Profile Photo / Avatar
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-neutral-200 dark:ring-neutral-700 bg-neutral-100 dark:bg-neutral-800">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              title="Upload photo"
            >
              <Camera size={18} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="flex-1 w-full space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={profile.avatarUrl}
                onChange={(e) => handleFieldChange('avatarUrl', e.target.value)}
                placeholder="Image URL or upload below..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1 cursor-pointer flex-shrink-0"
              >
                <Upload size={13} />
                <span>Upload</span>
              </button>
            </div>

            {/* Avatar presets */}
            <div>
              <span className="text-[11px] text-neutral-500 block mb-1">
                Or choose a curated aesthetic preset:
              </span>
              <div className="flex items-center gap-2">
                {AVATAR_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleFieldChange('avatarUrl', preset.url)}
                    className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-neutral-300 hover:ring-2 hover:ring-neutral-900 dark:hover:ring-white transition-all cursor-pointer"
                    title={preset.label}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Info Form */}
      <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 space-y-3.5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-neutral-700 dark:text-neutral-300 font-semibold mb-1">
              Full Display Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="e.g. Elena Vance"
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-neutral-700 dark:text-neutral-300 font-semibold mb-1">
              Profile Handle / Username
            </label>
            <input
              type="text"
              value={profile.handle}
              onChange={(e) => handleFieldChange('handle', e.target.value)}
              placeholder="e.g. @elenavance"
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-neutral-700 dark:text-neutral-300 font-semibold mb-1">
            Short Bio / Tagline
          </label>
          <textarea
            rows={3}
            value={profile.bio}
            onChange={(e) => handleFieldChange('bio', e.target.value)}
            placeholder="Tell the world who you are and what you make..."
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white resize-none"
          />
        </div>

        {/* Status Bubble & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-neutral-700 dark:text-neutral-300 font-semibold mb-1">
              Current Status / Vibe
            </label>
            <input
              type="text"
              value={profile.statusText}
              onChange={(e) => handleFieldChange('statusText', e.target.value)}
              placeholder="e.g. ✨ Shipping spatial systems"
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-neutral-700 dark:text-neutral-300 font-semibold mb-1">
              Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              placeholder="e.g. San Francisco, CA"
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
            />
          </div>
        </div>

        {/* Verified Badge Checkbox */}
        <div className="pt-2 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="verified-badge-checkbox"
              checked={profile.verified}
              onChange={(e) => handleFieldChange('verified', e.target.checked)}
              className="w-4 h-4 rounded text-sky-500 focus:ring-sky-500"
            />
            <label
              htmlFor="verified-badge-checkbox"
              className="text-neutral-800 dark:text-neutral-200 font-medium select-none cursor-pointer flex items-center gap-1"
            >
              <span>Verified Creator Badge</span>
              <CheckCircle2 size={14} className="text-sky-500 fill-sky-500 text-white inline" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

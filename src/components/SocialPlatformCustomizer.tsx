import React from 'react';
import { ExternalLink, Check, Plus } from 'lucide-react';
import { SocialAccount, SocialPlatformType } from '../types';
import { SocialIcon } from './DynamicIcon';

interface SocialPlatformCustomizerProps {
  socials: SocialAccount[];
  onUpdateSocials: (socials: SocialAccount[]) => void;
}

export const SocialPlatformCustomizer: React.FC<SocialPlatformCustomizerProps> = ({
  socials,
  onUpdateSocials,
}) => {
  const handleToggle = (id: string) => {
    onUpdateSocials(
      socials.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleUrlChange = (id: string, url: string) => {
    onUpdateSocials(
      socials.map((s) => (s.id === id ? { ...s, url } : s))
    );
  };

  // Helper to smart-prefix usernames if user typed bare handle
  const handleUrlBlur = (item: SocialAccount) => {
    let raw = item.url.trim();
    if (!raw) return;

    if (!raw.startsWith('http://') && !raw.startsWith('https://') && !raw.startsWith('mailto:')) {
      if (item.platform === 'email') {
        raw = `mailto:${raw}`;
      } else if (item.platform === 'x') {
        raw = `https://x.com/${raw.replace('@', '')}`;
      } else if (item.platform === 'github') {
        raw = `https://github.com/${raw.replace('@', '')}`;
      } else if (item.platform === 'linkedin') {
        raw = raw.includes('/') ? `https://linkedin.com/${raw}` : `https://linkedin.com/in/${raw}`;
      } else if (item.platform === 'instagram') {
        raw = `https://instagram.com/${raw.replace('@', '')}`;
      } else if (item.platform === 'youtube') {
        raw = raw.startsWith('@') ? `https://youtube.com/${raw}` : `https://youtube.com/@${raw}`;
      } else if (item.platform === 'tiktok') {
        raw = `https://tiktok.com/@${raw.replace('@', '')}`;
      } else if (item.platform === 'threads') {
        raw = `https://threads.net/@${raw.replace('@', '')}`;
      } else if (item.platform === 'telegram') {
        raw = `https://t.me/${raw.replace('@', '')}`;
      } else {
        raw = `https://${raw}`;
      }
      handleUrlChange(item.id, raw);
    }
  };

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          Social Media Integrations
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Connect your social profiles. Icons will appear prominently in your bio header.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {socials.map((social) => {
          return (
            <div
              key={social.id}
              className={`p-3 rounded-xl border transition-all ${
                social.enabled
                  ? 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-2xs'
                  : 'border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/40 opacity-70'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Platform Icon & Status */}
                <button
                  type="button"
                  onClick={() => handleToggle(social.id)}
                  className={`p-2.5 rounded-lg flex-shrink-0 transition-colors cursor-pointer ${
                    social.enabled
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                  }`}
                  title={social.enabled ? 'Click to disable' : 'Click to enable'}
                >
                  <SocialIcon platform={social.platform} size={18} />
                </button>

                {/* Input Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                      {social.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggle(social.id)}
                      className={`text-[11px] font-medium transition-colors ${
                        social.enabled
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-neutral-400'
                      }`}
                    >
                      {social.enabled ? 'Active' : 'Hidden'}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={social.url}
                      onChange={(e) => handleUrlChange(social.id, e.target.value)}
                      onBlur={() => handleUrlBlur(social)}
                      placeholder={`Enter ${social.title} URL or handle...`}
                      className="w-full px-2.5 py-1 text-xs rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                    />

                    {social.url && (
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded flex-shrink-0"
                        title="Test link in new tab"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

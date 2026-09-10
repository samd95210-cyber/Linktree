import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  MapPin,
  CheckCircle2,
  Share2,
  QrCode,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { ProfileData, SocialAccount, LinkButton, ThemeConfig } from '../types';
import { DynamicIcon, SocialIcon } from './DynamicIcon';

interface LinktreeViewProps {
  profile: ProfileData;
  socials: SocialAccount[];
  buttons: LinkButton[];
  theme: ThemeConfig;
  onLinkClick?: (buttonId: string) => void;
  onOpenShare?: () => void;
  isFullView?: boolean;
}

export const LinktreeView: React.FC<LinktreeViewProps> = ({
  profile,
  socials,
  buttons,
  theme,
  onLinkClick,
  onOpenShare,
  isFullView = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const activeSocials = socials.filter((s) => s.enabled && s.url.trim() !== '');
  const activeButtons = buttons.filter((b) => b.enabled);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(activeButtons.map((b) => b.category).filter(Boolean))) as string[]];

  const filteredButtons = activeCategory === 'All'
    ? activeButtons
    : activeButtons.filter((b) => b.category === activeCategory);

  const handleButtonClick = (button: LinkButton, e: React.MouseEvent) => {
    if (onLinkClick) {
      onLinkClick(button.id);
    }
  };

  // Helper for button shape styles
  const getButtonShapeClass = () => {
    switch (theme.buttonShape) {
      case 'pill':
        return 'rounded-full';
      case 'sharp':
        return 'rounded-none';
      case 'brutalist':
        return 'rounded-xl border-2 border-neutral-900 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none';
      case 'glass':
        return 'rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 shadow-lg';
      case 'outline':
        return 'rounded-2xl border-2 border-current bg-transparent hover:bg-white/10';
      case 'soft':
        return 'rounded-2xl shadow-sm hover:shadow';
      case 'rounded':
      default:
        return 'rounded-2xl';
    }
  };

  return (
    <div
      className={`relative w-full min-h-full flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 transition-colors duration-300 ${theme.backgroundStyle} ${theme.bodyFontClass}`}
    >
      {/* Top Floating Action Bar */}
      <div className="w-full max-w-md flex items-center justify-between mb-4 z-10">
        <div className="flex items-center gap-1.5">
          {profile.statusText && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/5 dark:border-white/10 text-current opacity-90 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="truncate max-w-[200px]">{profile.statusText}</span>
            </span>
          )}
        </div>

        {onOpenShare && (
          <button
            onClick={onOpenShare}
            className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 backdrop-blur-sm text-current transition-all active:scale-95 shadow-2xs flex items-center gap-1 text-xs font-medium px-3"
            title="Share or QR Code"
            id="share-profile-btn"
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>
        )}
      </div>

      {/* Main Profile & Links Container */}
      <div className="w-full max-w-md flex-1 flex flex-col items-center z-10">
        {/* Profile Card / Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center text-center mb-6 w-full"
        >
          {/* Avatar with glow and verified badge */}
          <div className="relative mb-3.5 group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 ring-2 ring-current/20 shadow-md transition-transform duration-300 group-hover:scale-105">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback avatar on error
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
                }}
              />
            </div>

            {profile.verified && (
              <div
                className="absolute bottom-1 right-1 p-1 bg-sky-500 text-white rounded-full shadow-md"
                title="Verified Creator"
              >
                <CheckCircle2 size={16} strokeWidth={3} className="text-white" />
              </div>
            )}
          </div>

          {/* Name & Handle */}
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${theme.headerFontClass} ${theme.textColor}`}>
              {profile.name}
            </h1>
          </div>

          <p className={`text-sm font-medium tracking-wide mb-2 opacity-80 ${theme.textMuted}`}>
            {profile.handle}
          </p>

          {/* Bio */}
          {profile.bio && (
            <p className={`text-sm max-w-sm leading-relaxed mb-3 ${theme.textColor} opacity-90`}>
              {profile.bio}
            </p>
          )}

          {/* Location */}
          {profile.location && (
            <div className={`flex items-center justify-center gap-1 text-xs opacity-75 mb-3 ${theme.textMuted}`}>
              <MapPin size={13} />
              <span>{profile.location}</span>
            </div>
          )}

          {/* Social Platforms Row */}
          {activeSocials.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-2 mt-1 mb-2 px-2 py-1.5"
            >
              {activeSocials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.title}
                  title={social.title}
                  className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-current transition-all hover:scale-115 active:scale-95 shadow-2xs"
                  id={`social-${social.platform}`}
                >
                  <SocialIcon platform={social.platform} size={18} />
                </a>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Optional Category Filter Pills if more than 1 category */}
        {categories.length > 2 && (
          <div className="w-full flex items-center justify-center gap-1.5 mb-4 overflow-x-auto py-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                    : 'bg-black/5 dark:bg-white/10 text-current opacity-70 hover:opacity-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Buttons List */}
        <div className="w-full space-y-3 mb-6">
          <AnimatePresence>
            {filteredButtons.map((button, index) => {
              const isFeatured = button.featured;
              const shapeClass = getButtonShapeClass();

              return (
                <motion.div
                  key={button.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className="w-full relative"
                >
                  <a
                    href={button.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleButtonClick(button, e)}
                    id={`link-btn-${button.id}`}
                    className={`group relative w-full flex items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4 transition-all duration-200 ${shapeClass} ${
                      isFeatured
                        ? 'ring-2 ring-current ring-offset-2 ring-offset-transparent font-semibold shadow-md'
                        : `${theme.buttonBg} ${theme.buttonBorder} ${theme.buttonShadow}`
                    } ${button.animation === 'pulse' ? 'animate-pulse' : ''} ${
                      button.animation === 'bounce' ? 'hover:-translate-y-1' : 'hover:-translate-y-0.5'
                    }`}
                    style={{
                      backgroundColor: button.customColor || undefined,
                      color: button.customTextColor || undefined,
                    }}
                  >
                    {/* Left Icon */}
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <div className="flex-shrink-0 p-2 rounded-xl bg-black/5 dark:bg-white/10 group-hover:scale-110 transition-transform">
                        <DynamicIcon name={button.icon} size={19} className="text-current" />
                      </div>

                      {/* Title and Category */}
                      <div className="text-left flex-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm sm:text-base font-semibold truncate ${theme.buttonText}`}>
                            {button.title}
                          </span>
                        </div>
                        {button.category && (
                          <span className="text-[11px] opacity-60 tracking-wider uppercase">
                            {button.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right elements: Badge & Chevron */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {button.badgeText && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-black shadow-xs">
                          {button.badgeText}
                        </span>
                      )}

                      <div className="p-1 rounded-full opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-current">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredButtons.length === 0 && (
            <div className="text-center py-8 opacity-60 text-sm">
              No links in this category yet.
            </div>
          )}
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="w-full max-w-md text-center py-4 z-10">
        <button
          onClick={onOpenShare}
          className="inline-flex items-center gap-1.5 text-xs opacity-70 hover:opacity-100 transition-opacity font-medium tracking-wide text-current py-1 px-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
        >
          <Sparkles size={13} />
          <span>{profile.name}&apos;s Bio Linktree</span>
        </button>
      </footer>
    </div>
  );
};

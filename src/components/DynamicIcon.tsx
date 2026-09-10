import React from 'react';
import * as LucideIcons from 'lucide-react';
import { SocialPlatformType } from '../types';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', size = 20 }) => {
  // Check if icon exists directly in Lucide
  const IconComponent = (LucideIcons as Record<string, React.ElementType>)[name];

  if (IconComponent) {
    return <IconComponent className={className} size={size} />;
  }

  // Fallback
  return <LucideIcons.Globe className={className} size={size} />;
};

interface SocialIconProps {
  platform: SocialPlatformType;
  className?: string;
  size?: number;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ platform, className = 'w-5 h-5', size = 20 }) => {
  switch (platform) {
    case 'github':
      return <LucideIcons.Github className={className} size={size} />;
    case 'linkedin':
      return <LucideIcons.Linkedin className={className} size={size} />;
    case 'x':
      // Modern X icon
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'instagram':
      return <LucideIcons.Instagram className={className} size={size} />;
    case 'youtube':
      return <LucideIcons.Youtube className={className} size={size} />;
    case 'spotify':
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.308-1.76-8.793-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.809-.87 7.076-.496 9.722 1.115.294.18.386.562.207.855zm1.226-2.724c-.226.367-.707.482-1.074.256-2.69-1.653-6.79-2.133-9.972-1.167-.413.125-.853-.11-.978-.523-.125-.413.11-.853.523-.978 3.632-1.103 8.147-.568 11.247 1.338.367.226.482.707.254 1.074zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.494.15-1.02-.132-1.17-.627-.15-.494.133-1.02.627-1.17 3.535-1.072 9.404-.868 13.118 1.338.445.264.59.838.327 1.282-.264.444-.838.59-1.282.327z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.891 2.896 2.896 0 0 1-2.892-2.89 2.896 2.896 0 0 1 2.892-2.892c.365 0 .71.07 1.027.195V9.45a6.34 6.34 0 0 0-1.027-.084A6.337 6.337 0 0 0 3.146 15.7a6.337 6.337 0 0 0 6.337 6.337 6.337 6.337 0 0 0 6.337-6.337V8.508a8.17 8.17 0 0 0 4.769 1.52v-3.342h-1z" />
        </svg>
      );
    case 'twitch':
      return <LucideIcons.Twitch className={className} size={size} />;
    case 'discord':
      return <LucideIcons.Disc className={className} size={size} />;
    case 'threads':
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M19 12a7 7 0 1 0-7 7c2.2 0 4-1 4.7-2.6.5-1.1.3-2.4-.7-2.8-1.5-.6-2.5.4-3.5 1-.9.5-2 .5-2.5-.2-.5-.8-.3-1.9.4-2.6 1.4-1.4 3.7-.8 4.6.6" />
        </svg>
      );
    case 'bluesky':
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.01 1.05 1.516.42 2.658-.2 3.782-.016 5.564.9 6.848c1.332 1.868 3.57 3.325 5.57 3.792-2.316-.277-5.074.453-5.918 2.373-.854 1.942.203 4.28 2.052 4.475 2.502.264 4.86-1.57 6.396-3.888 1.536 2.318 3.894 4.152 6.396 3.888 1.849-.195 2.906-2.533 2.052-4.475-.844-1.92-3.602-2.65-5.918-2.373 2-.467 4.238-1.924 5.57-3.792.916-1.284 1.1-3.066.48-4.19-.63-1.142-2.146-1.648-4.782.147C16.046 4.747 13.087 8.686 12 10.8z" />
        </svg>
      );
    case 'email':
      return <LucideIcons.Mail className={className} size={size} />;
    case 'telegram':
      return <LucideIcons.Send className={className} size={size} />;
    case 'whatsapp':
      return <LucideIcons.PhoneCall className={className} size={size} />;
    case 'website':
    default:
      return <LucideIcons.Globe className={className} size={size} />;
  }
};

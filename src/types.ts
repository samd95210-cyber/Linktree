export type SocialPlatformType =
  | 'github'
  | 'linkedin'
  | 'x'
  | 'instagram'
  | 'youtube'
  | 'tiktok'
  | 'spotify'
  | 'twitch'
  | 'discord'
  | 'threads'
  | 'bluesky'
  | 'email'
  | 'telegram'
  | 'whatsapp'
  | 'website';

export interface SocialAccount {
  id: string;
  platform: SocialPlatformType;
  title: string;
  url: string;
  enabled: boolean;
}

export type ButtonShape =
  | 'rounded'
  | 'pill'
  | 'sharp'
  | 'brutalist'
  | 'glass'
  | 'outline'
  | 'soft';

export type ButtonAnimation =
  | 'none'
  | 'bounce'
  | 'pulse'
  | 'scale'
  | 'glow';

export interface LinkButton {
  id: string;
  title: string;
  url: string;
  icon: string;
  enabled: boolean;
  featured: boolean;
  badgeText?: string;
  animation?: ButtonAnimation;
  customColor?: string;
  customTextColor?: string;
  clicks: number;
  category?: string;
}

export interface ProfileData {
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  verified: boolean;
  statusText: string;
  location: string;
  email: string;
}

export type ThemeFont = 'jakarta' | 'editorial' | 'outfit' | 'dm' | 'spacemono';

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  font: ThemeFont;
  bodyFontClass: string;
  headerFontClass: string;
  backgroundStyle: string; // CSS background or Tailwind class
  containerBg: string;
  textColor: string;
  textMuted: string;
  accentColor: string;
  buttonShape: ButtonShape;
  buttonBg: string;
  buttonText: string;
  buttonBorder: string;
  buttonHoverBg: string;
  buttonShadow: string;
  cardGlass?: boolean;
}

export type DeviceType = 'iphone' | 'android' | 'tablet' | 'full';

export type ActiveTab = 'links' | 'profile' | 'socials' | 'appearance' | 'analytics';

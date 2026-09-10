import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Link as LinkIcon,
  User,
  Share2,
  Palette,
  BarChart3,
  Smartphone,
  Tablet,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sliders,
  ExternalLink,
  Eye,
  Check,
  Moon,
  Sun,
} from 'lucide-react';
import {
  ProfileData,
  SocialAccount,
  LinkButton,
  ThemeConfig,
  ActiveTab,
  DeviceType,
} from './types';
import {
  DEFAULT_PROFILE,
  DEFAULT_SOCIALS,
  DEFAULT_BUTTONS,
  THEMES,
} from './data/defaultData';
import { LinktreeView } from './components/LinktreeView';
import { ButtonCustomizer } from './components/ButtonCustomizer';
import { ProfileCustomizer } from './components/ProfileCustomizer';
import { SocialPlatformCustomizer } from './components/SocialPlatformCustomizer';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import { ShareModal } from './components/ShareModal';

const STORAGE_KEYS = {
  PROFILE: 'linktree_profile_v1',
  SOCIALS: 'linktree_socials_v1',
  BUTTONS: 'linktree_buttons_v1',
  THEME: 'linktree_theme_v1',
};

export default function App() {
  // Load initial state with localStorage fallback
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // use default
      }
    }
    return DEFAULT_PROFILE;
  });

  const [socials, setSocials] = useState<SocialAccount[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SOCIALS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // use default
      }
    }
    return DEFAULT_SOCIALS;
  });

  const [buttons, setButtons] = useState<LinkButton[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BUTTONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // use default
      }
    }
    return DEFAULT_BUTTONS;
  });

  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // use default
      }
    }
    return THEMES[0];
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('links');
  const [deviceType, setDeviceType] = useState<DeviceType>('iphone');
  const [isVisitorMode, setIsVisitorMode] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [showSavedFeedback, setShowSavedFeedback] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SOCIALS, JSON.stringify(socials));
  }, [socials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUTTONS, JSON.stringify(buttons));
  }, [buttons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(currentTheme));
  }, [currentTheme]);

  // Click tracking handler
  const handleLinkClick = (buttonId: string) => {
    setButtons((prev) =>
      prev.map((b) => (b.id === buttonId ? { ...b, clicks: (b.clicks || 0) + 1 } : b))
    );
  };

  const handleResetClicks = () => {
    setButtons((prev) => prev.map((b) => ({ ...b, clicks: 0 })));
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset your profile, links, and themes to default demo values?')) {
      setProfile(DEFAULT_PROFILE);
      setSocials(DEFAULT_SOCIALS);
      setButtons(DEFAULT_BUTTONS);
      setCurrentTheme(THEMES[0]);
      setShowSavedFeedback(true);
      setTimeout(() => setShowSavedFeedback(false), 2000);
    }
  };

  const handleUpdateTheme = (updates: Partial<ThemeConfig>) => {
    setCurrentTheme((prev) => ({ ...prev, ...updates }));
  };

  // Device frame width classes
  const getDeviceWidthClass = () => {
    switch (deviceType) {
      case 'iphone':
        return 'w-[375px] max-w-full h-[760px] max-h-[90vh] rounded-[48px] border-[10px] border-neutral-900 shadow-2xl';
      case 'android':
        return 'w-[412px] max-w-full h-[780px] max-h-[90vh] rounded-[36px] border-[8px] border-neutral-800 shadow-2xl';
      case 'tablet':
        return 'w-[560px] max-w-full h-[800px] max-h-[90vh] rounded-[32px] border-[12px] border-neutral-800 shadow-2xl';
      case 'full':
      default:
        return 'w-full h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg';
    }
  };

  // If in Pure Visitor Mode, render only the Linktree view
  if (isVisitorMode) {
    return (
      <main className="relative w-full min-h-screen">
        {/* Floating return to editor button */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <button
            onClick={() => setIsVisitorMode(false)}
            className="px-3.5 py-1.5 rounded-full bg-neutral-900/90 text-white hover:bg-neutral-900 backdrop-blur-md text-xs font-semibold shadow-lg flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            id="back-to-editor-btn"
          >
            <Minimize2 size={13} />
            <span>Customize Page</span>
          </button>
        </div>

        <LinktreeView
          profile={profile}
          socials={socials}
          buttons={buttons}
          theme={currentTheme}
          onLinkClick={handleLinkClick}
          onOpenShare={() => setIsShareModalOpen(true)}
          isFullView={true}
        />

        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          profile={profile}
          buttons={buttons}
          socials={socials}
          theme={currentTheme}
        />
      </main>
    );
  }

  return (
    <div className="w-full min-h-screen bg-neutral-100 dark:bg-neutral-950 flex flex-col font-sans text-neutral-900 dark:text-white">
      {/* Top Application Header */}
      <header className="w-full h-14 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-bold text-sm shadow-xs">
            <LinkIcon size={16} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-neutral-900 dark:text-white leading-tight">
              Personal Linktree Builder
            </h1>
            <p className="text-[11px] text-neutral-500 hidden sm:block">
              {profile.name} ({profile.handle})
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile toggle button between Editor & Preview */}
          <div className="flex lg:hidden bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setMobileView('editor')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                mobileView === 'editor'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-2xs'
                  : 'text-neutral-500'
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setMobileView('preview')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                mobileView === 'preview'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-2xs'
                  : 'text-neutral-500'
              }`}
            >
              Preview
            </button>
          </div>

          <button
            onClick={handleResetToDefaults}
            className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors hidden sm:flex items-center gap-1 text-xs"
            title="Reset to demo template"
          >
            <RotateCcw size={14} />
            <span className="text-[11px]">Reset</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            id="header-share-btn"
          >
            <Share2 size={14} />
            <span>Share & QR</span>
          </button>

          <button
            onClick={() => setIsVisitorMode(true)}
            className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-transform active:scale-98"
            id="view-live-page-btn"
          >
            <Eye size={14} />
            <span className="hidden sm:inline">Visitor Live View</span>
            <span className="sm:hidden">Live</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Editor Controls */}
        <section
          aria-label="Linktree configuration editor"
          className={`w-full lg:w-[480px] xl:w-[520px] flex-shrink-0 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col h-[calc(100vh-56px)] ${
            mobileView === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Editor Navigation Tabs */}
          <nav aria-label="Editor categories" className="flex border-b border-neutral-200 dark:border-neutral-800 px-3 pt-2 overflow-x-auto no-scrollbar flex-shrink-0">
            <button
              onClick={() => setActiveTab('links')}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'links'
                  ? 'border-neutral-900 text-neutral-900 dark:border-white dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
              }`}
            >
              <LinkIcon size={14} />
              <span>Links & Buttons</span>
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-100 dark:bg-neutral-800 font-mono">
                {buttons.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'border-neutral-900 text-neutral-900 dark:border-white dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
              }`}
            >
              <User size={14} />
              <span>Profile & Bio</span>
            </button>

            <button
              onClick={() => setActiveTab('socials')}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'socials'
                  ? 'border-neutral-900 text-neutral-900 dark:border-white dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
              }`}
            >
              <Share2 size={14} />
              <span>Socials</span>
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-100 dark:bg-neutral-800 font-mono">
                {socials.filter((s) => s.enabled).length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('appearance')}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'appearance'
                  ? 'border-neutral-900 text-neutral-900 dark:border-white dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
              }`}
            >
              <Palette size={14} />
              <span>Themes</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'border-neutral-900 text-neutral-900 dark:border-white dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
              }`}
            >
              <BarChart3 size={14} />
              <span>Stats</span>
            </button>
          </nav>

          {/* Active Tab Panel Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {activeTab === 'links' && (
              <ButtonCustomizer buttons={buttons} onUpdateButtons={setButtons} />
            )}

            {activeTab === 'profile' && (
              <ProfileCustomizer profile={profile} onUpdateProfile={setProfile} />
            )}

            {activeTab === 'socials' && (
              <SocialPlatformCustomizer socials={socials} onUpdateSocials={setSocials} />
            )}

            {activeTab === 'appearance' && (
              <ThemeCustomizer
                currentTheme={currentTheme}
                onSelectTheme={setCurrentTheme}
                onUpdateTheme={handleUpdateTheme}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsPanel buttons={buttons} onResetClicks={handleResetClicks} />
            )}
          </div>
        </section>

        {/* Right Column: Interactive Live Device Preview */}
        <section
          aria-label="Live preview viewport"
          className={`flex-1 bg-neutral-100 dark:bg-neutral-950 flex-col items-center justify-center p-3 sm:p-6 overflow-hidden ${
            mobileView === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Top Preview Control Bar */}
          <div className="w-full max-w-md flex items-center justify-between mb-3 text-xs">
            <div className="flex items-center gap-1 text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Interactive Live Preview
              </span>
            </div>

            {/* Device frame switchers */}
            <div className="flex items-center gap-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-0.5 rounded-lg shadow-2xs">
              <button
                onClick={() => setDeviceType('iphone')}
                className={`p-1.5 rounded-md transition-all ${
                  deviceType === 'iphone'
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                }`}
                title="iPhone frame (375px)"
              >
                <Smartphone size={14} />
              </button>
              <button
                onClick={() => setDeviceType('tablet')}
                className={`p-1.5 rounded-md transition-all ${
                  deviceType === 'tablet'
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                }`}
                title="Tablet frame"
              >
                <Tablet size={14} />
              </button>
              <button
                onClick={() => setDeviceType('full')}
                className={`p-1.5 rounded-md transition-all ${
                  deviceType === 'full'
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                }`}
                title="Full width container"
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>

          {/* Device Mockup Shell */}
          <div
            className={`relative transition-all duration-300 overflow-hidden flex flex-col bg-white ${getDeviceWidthClass()}`}
          >
            {/* Phone Speaker & Camera Notch (for iPhone & Android) */}
            {(deviceType === 'iphone' || deviceType === 'android') && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-neutral-900 text-white">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 border border-neutral-700" />
                <div className="w-12 h-2 rounded-full bg-neutral-800" />
              </div>
            )}

            {/* Scrollable Linktree container inside device */}
            <div className="w-full h-full overflow-y-auto relative pt-4">
              <LinktreeView
                profile={profile}
                socials={socials}
                buttons={buttons}
                theme={currentTheme}
                onLinkClick={handleLinkClick}
                onOpenShare={() => setIsShareModalOpen(true)}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        profile={profile}
        buttons={buttons}
        socials={socials}
        theme={currentTheme}
      />
    </div>
  );
}

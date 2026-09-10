import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import {
  X,
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { ProfileData, LinkButton, SocialAccount, ThemeConfig } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  buttons: LinkButton[];
  socials: SocialAccount[];
  theme: ThemeConfig;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  profile,
  buttons,
  socials,
  theme,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const shareUrl = window.location.href;

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(shareUrl, {
        width: 280,
        margin: 1.5,
        color: {
          dark: '#171717',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('Failed to generate QR code', err));
    }
  }, [isOpen, shareUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name} | Linktree`,
          text: profile.bio || `Check out ${profile.name}'s links!`,
          url: shareUrl,
        });
      } catch {
        // User canceled or failed
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `${profile.handle || 'linktree'}-qrcode.png`;
    a.click();
  };

  const handleExportHtml = () => {
    // Generate standalone static HTML
    const activeButtons = buttons.filter((b) => b.enabled);
    const activeSocials = socials.filter((s) => s.enabled && s.url);

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${profile.name} - Links</title>
  <meta name="description" content="${profile.bio}" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background: #fafafa;
      color: #171717;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px 16px;
    }
    .container {
      width: 100%;
      max-width: 440px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      margin-bottom: 16px;
    }
    .name {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .handle {
      font-size: 14px;
      color: #666;
      margin-bottom: 12px;
    }
    .bio {
      font-size: 14px;
      line-height: 1.5;
      color: #333;
      margin-bottom: 18px;
    }
    .socials {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .social-btn {
      padding: 8px 14px;
      background: #eee;
      border-radius: 20px;
      text-decoration: none;
      color: #111;
      font-size: 12px;
      font-weight: 600;
      transition: transform 0.2s;
    }
    .social-btn:hover { transform: scale(1.05); }
    .links-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 32px;
    }
    .link-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 20px;
      background: #ffffff;
      border: 1px solid #e5e5e5;
      border-radius: 16px;
      text-decoration: none;
      color: #171717;
      font-weight: 600;
      font-size: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.03);
      transition: all 0.2s ease;
    }
    .link-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      border-color: #171717;
    }
    .featured {
      border: 2px solid #171717;
    }
    .badge {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 12px;
      background: #f59e0b;
      color: #000;
      font-weight: 700;
      margin-left: 8px;
    }
    footer {
      font-size: 12px;
      color: #888;
      margin-top: auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="${profile.avatarUrl}" alt="${profile.name}" class="avatar" />
    <h1 class="name">${profile.name}</h1>
    <div class="handle">${profile.handle}</div>
    ${profile.bio ? `<p class="bio">${profile.bio}</p>` : ''}
    
    ${
      activeSocials.length > 0
        ? `<div class="socials">
        ${activeSocials
          .map(
            (s) =>
              `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-btn">${s.title}</a>`
          )
          .join('')}
      </div>`
        : ''
    }

    <div class="links-list">
      ${activeButtons
        .map(
          (b) => `
        <a href="${b.url}" target="_blank" rel="noopener noreferrer" class="link-card ${
            b.featured ? 'featured' : ''
          }">
          <span>${b.title}</span>
          ${b.badgeText ? `<span class="badge">${b.badgeText}</span>` : '<span>&rarr;</span>'}
        </a>
      `
        )
        .join('')}
    </div>

    <footer>
      <span>&copy; ${new Date().getFullYear()} ${profile.name}</span>
    </footer>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.handle ? profile.handle.replace('@', '') : 'linktree'}-bio.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-md w-full p-5 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Share Your Linktree
            </h3>
            <p className="text-xs text-neutral-500">
              Share with visitors via QR code, link, or export standalone file
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="py-5 flex flex-col items-center justify-center">
          <div className="p-3 bg-white rounded-2xl shadow-md border border-neutral-100 dark:border-neutral-800 mb-3">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Profile QR Code"
                className="w-48 h-48 rounded-xl object-contain"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-xs text-neutral-400">
                Generating QR code...
              </div>
            )}
          </div>

          <p className="text-xs text-neutral-500 text-center">
            Scan with any phone camera to visit <span className="font-semibold text-neutral-800 dark:text-neutral-200">{profile.name}</span>&apos;s linktree
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {/* Copy Link button */}
          <button
            onClick={handleCopyLink}
            className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-98 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={16} className="text-emerald-400 dark:text-emerald-600" />
                <span>Link Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Linktree URL</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-2">
            {/* Native Share button */}
            <button
              onClick={handleNativeShare}
              className="py-2 px-3 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium flex items-center justify-center gap-1.5"
            >
              <Share2 size={14} />
              <span>Share App</span>
            </button>

            {/* Download QR Image */}
            <button
              onClick={handleDownloadQr}
              className="py-2 px-3 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium flex items-center justify-center gap-1.5"
            >
              <Download size={14} />
              <span>Save QR Image</span>
            </button>
          </div>

          {/* Export standalone HTML */}
          <button
            onClick={handleExportHtml}
            className="w-full py-2 px-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-[11px] font-medium flex items-center justify-center gap-1.5"
          >
            <Code2 size={13} />
            <span>Export Standalone Single-File HTML</span>
          </button>
        </div>
      </div>
    </div>
  );
};

"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        setHeaderColor?: (color: string) => void;
        setBackgroundColor?: (color: string) => void;
        disableVerticalSwipes?: () => void;
      };
    };
  }
}

export function TelegramBridge() {
  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (!webApp) return;
    webApp.ready();
    webApp.expand();
    webApp.setHeaderColor?.("#080d25");
    webApp.setBackgroundColor?.("#080d25");
    webApp.disableVerticalSwipes?.();
  }, []);
  return null;
}

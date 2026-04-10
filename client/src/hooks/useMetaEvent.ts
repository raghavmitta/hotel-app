/**
 * useMetaEvent.ts
 * Drop into: client/src/hooks/useMetaEvent.ts
 *
 * Sends events to your PHP relay → Meta CAPI.
 * Also fires the browser Pixel (fbq) in parallel for deduplication.
 */

import { useCallback } from 'react';

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type MetaEventName =
  | 'PageView'
  | 'ViewContent'
  | 'Lead'
  | 'InitiateCheckout'
  | 'Contact'
  | 'Search'
  | 'SubmitApplication'   // treat as "form started"
  | 'CustomEvent';        // use event_custom_name for custom events

export interface MetaEventPayload {
  // Required
  event_name: MetaEventName;
  event_custom_name?: string;   // for CustomEvent type

  // User identity (PII — hashed server-side)
  email?: string;
  phone?: string;
  name?: string;
  city?: string;

  // B2B specific
  hotel_name?: string;
  quantity?: string | number;
  location?: string;
  source?: string;
  product_name?: string;
  spring_type?: string;
  message?: string;

  // Browser signals (auto-populated by the hook)
  fbp?: string;
  fbc?: string;
  page_url?: string;
  client_user_agent?: string;
  event_id?: string;
}

// ─── UTILITY ─────────────────────────────────────────────────────────────────

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : undefined;
}

function generateEventId(): string {
  return `rf_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// Declare global fbq for TypeScript
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ─── HOOK ─────────────────────────────────────────────────────────────────────

const META_API_ENDPOINT = '/api/meta-event.php'; // your PHP file path

export function useMetaEvent() {
  const sendEvent = useCallback(async (payload: MetaEventPayload) => {
    const eventId = payload.event_id ?? generateEventId();

    // Auto-attach browser signals
    const enrichedPayload: MetaEventPayload = {
      ...payload,
      event_id:          eventId,
      page_url:          payload.page_url ?? window.location.href,
      client_user_agent: payload.client_user_agent ?? navigator.userAgent,
      fbp:               payload.fbp ?? getCookie('_fbp'),
      fbc:               payload.fbc ?? getCookie('_fbc'),
    };

    // ── 1. Fire browser Pixel (for deduplication) ──────────────────────────
    if (typeof window.fbq === 'function') {
      const fbqEventName =
        payload.event_name === 'CustomEvent'
          ? payload.event_custom_name ?? 'CustomEvent'
          : payload.event_name;

      const customData: Record<string, unknown> = {};
      if (payload.hotel_name)   customData.hotel_name    = payload.hotel_name;
      if (payload.quantity)     customData.num_items      = payload.quantity;
      if (payload.product_name) customData.content_name  = payload.product_name;

      window.fbq('track', fbqEventName, customData, { eventID: eventId });
    }

    // ── 2. Send to server (CAPI) ────────────────────────────────────────────
    try {
      const response = await fetch(META_API_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(enrichedPayload),
      });

      if (!response.ok) {
        console.warn('[MetaCAPI] Server returned', response.status);
      }

      return await response.json();
    } catch (err) {
      // Non-blocking — never break UX for tracking
      console.warn('[MetaCAPI] Failed to send event:', err);
    }
  }, []);

  return { sendEvent };
}

// ─── STANDALONE FUNCTION (for use outside React components) ──────────────────

export async function sendMetaEvent(payload: MetaEventPayload): Promise<void> {
  const eventId = payload.event_id ?? generateEventId();

  const enrichedPayload = {
    ...payload,
    event_id:          eventId,
    page_url:          window.location.href,
    client_user_agent: navigator.userAgent,
    fbp:               getCookie('_fbp'),
    fbc:               getCookie('_fbc'),
  };

  // Browser pixel
  if (typeof window.fbq === 'function') {
    const fbqEventName =
      payload.event_name === 'CustomEvent'
        ? payload.event_custom_name ?? 'CustomEvent'
        : payload.event_name;
    window.fbq('track', fbqEventName, {}, { eventID: eventId });
  }

  // Server CAPI
  try {
    await fetch(META_API_ENDPOINT, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(enrichedPayload),
    });
  } catch (err) {
    console.warn('[MetaCAPI]', err);
  }
}

// Business Entity
export interface Business {
  id: string;
  name: string;
  websiteUrl: string;
  industry?: string;
  primaryChannel: 'EMAIL' | 'WHATSAPP' | 'FORM' | 'PHONE' | 'MAPS';
  contactEmail?: string; // Decision maker or generic
  contactPhone?: string;
  status: 'TARGET' | 'MONITORED' | 'POC' | 'CUSTOMER';
  address?: string;
}

// Diagnostic Log Definitions
export type ChannelType = 'EMAIL' | 'WHATSAPP' | 'CONTACT_FORM' | 'MAPS_MESSAGE' | 'BOOKING_FLOW';

export type DiagnosticResult = 'SUCCESS' | 'FAILURE' | 'PENDING' | 'TIMEOUT';

export interface DiagnosticLog {
  id: string;
  businessId: string;
  channel: ChannelType;
  timestampSent: Date;
  timestampReplied?: Date;
  responseDurationMs?: number;
  result: DiagnosticResult;
  evidence: string; // "Replied in 14 hours" or "No auto-confirmation received"
}

// Gaps Identifiied
export type GapSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

// Gap Types for automated logic
export type GapType = 'SLOW_RESPONSE' | 'BROKEN_FORM' | 'MISSED_FOLLOWUP' | 'GENERIC';

export interface Gap {
  id: string;
  businessId: string;
  diagnosticLogId: string;
  type: GapType; // Added for logic handling
  title: string;
  description: string;
  severity: GapSeverity;
  detectedAt: Date;
  status: 'OPEN' | 'ACKNOWLEDGED' | 'FIXED' | 'IGNORED';
}

// Outreach / Alerts
export interface Alert {
  id: string;
  businessId: string;
  gapId: string;
  sentAt: Date;
  channel: 'EMAIL'; // Outreach channel
  content: string; // The neutral, factual message
  status: 'SENT' | 'OPENED' | 'CLICKED' | 'REPLIED';
}

// Payment & Subscription
export interface Subscription {
  id: string;
  businessId: string;
  status: 'ACTIVE' | 'PAST_DUE' | 'CANCELED';
  plan: 'CONTINUOUS_MONITORING';
  amount: number;
  currency: 'USD';
  startedAt: Date;
  nextBillingDate: Date;
  paymentMethod: 'PAYPAL'; // Mock
}

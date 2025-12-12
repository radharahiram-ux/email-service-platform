export interface Email {
  id: number;
  from: string;
  fromName: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  starred: boolean;
  read: boolean;
  avatar: string;
  to?: string;
}

export interface ComposeData {
  to: string;
  subject: string;
  body: string;
  cc: string;
  bcc: string;
}

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

export type ActiveTab = 'inbox' | 'starred' | 'sent' | 'trash' | 'settings';
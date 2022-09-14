export interface Recipient {
  email: string;
  type: 'to' | 'bcc' | 'cc';
}

export interface EmailRequest {
  action: 'generateReply';
  email: string;
}

export interface AIResponse {
  suggestion: string;
  error?: string;
}
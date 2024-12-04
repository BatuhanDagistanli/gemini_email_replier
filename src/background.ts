import { generateEmailReply } from './services/ai-service';
import type { EmailRequest, AIResponse } from './types';

chrome.runtime.onMessage.addListener((request: EmailRequest, _sender, sendResponse) => {
  if (request.action === 'generateReply') {
    generateEmailReply(request.email)
      .then(suggestion => {
        sendResponse({ suggestion } as AIResponse);
      })
      .catch(error => {
        sendResponse({ error: error.message } as AIResponse);
      });
    return true; // Required to use sendResponse asynchronously
  }
});
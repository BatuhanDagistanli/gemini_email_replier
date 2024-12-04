import type { AIResponse } from './types';

function getOriginalEmail(composeBox: HTMLElement): string {
  // Find the quoted email section in Gmail's compose view
  const quotedContent = composeBox.closest('.gmail_quote') || 
                       composeBox.querySelector('.gmail_quote') ||
                       composeBox.previousElementSibling?.querySelector('.gmail_quote');
                       
  if (quotedContent) {
    return quotedContent.textContent?.trim() || '';
  }
  
  // Fallback: try to find the email in the expanded view
  const expandedEmail = document.querySelector('[role="listitem"] .a3s.aiL');
  if (expandedEmail) {
    return expandedEmail.textContent?.trim() || '';
  }
  
  return '';
}

function createSuggestButton(composeBox: HTMLElement): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = '✨ Suggest Reply';
  button.className = 'suggest-reply-btn';
  button.style.cssText = `
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 999;
    padding: 8px 16px;
    background: #1a73e8;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Google Sans', Roboto, sans-serif;
  `;
  
  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = '#1557b0';
  });
  
  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = '#1a73e8';
  });
  
  button.addEventListener('click', async () => {
    const originalEmail = getOriginalEmail(composeBox);
    
    if (!originalEmail) {
      alert('No email content found to reply to. Please make sure you are replying to an email.');
      return;
    }
    
    button.disabled = true;
    button.textContent = 'Generating...';
    button.style.backgroundColor = '#ccc';
    
    try {
      const response = await new Promise<AIResponse>((resolve) => {
        chrome.runtime.sendMessage({
          action: 'generateReply',
          email: originalEmail
        }, resolve);
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (composeBox instanceof HTMLElement) {
        const event = new InputEvent('input', { bubbles: true });
        composeBox.textContent = response.suggestion;
        composeBox.dispatchEvent(event);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate reply. Please try again.');
    } finally {
      button.disabled = false;
      button.textContent = '✨ Suggest Reply';
      button.style.backgroundColor = '#1a73e8';
    }
  });
  
  return button;
}

function observeEmailCompose() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          // Look for Gmail's compose box
          const composeBox = node.querySelector('[role="textbox"][aria-label*="Body"]');
          if (composeBox instanceof HTMLElement) {
            const existingButton = composeBox.parentElement?.querySelector('.suggest-reply-btn');
            if (!existingButton) {
              const button = createSuggestButton(composeBox);
              composeBox.parentElement?.appendChild(button);
            }
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Start observing when content script loads
observeEmailCompose();
import './style.css';
import { generateEmailReply } from './services/ai-service';

async function initializePopup() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  app.innerHTML = `
    <div class="container">
      <h2>Ez-Answer AI</h2>
      <div class="input-group">
        <textarea id="emailContent" placeholder="Paste email content here..."></textarea>
        <button id="generateBtn">Generate Reply</button>
      </div>
      <div class="output-group">
        <h3>Suggested Reply:</h3>
        <div id="suggestion" class="suggestion"></div>
      </div>
    </div>
  `;

  const generateBtn = document.querySelector<HTMLButtonElement>('#generateBtn');
  const emailContent = document.querySelector<HTMLTextAreaElement>('#emailContent');
  const suggestion = document.querySelector<HTMLDivElement>('#suggestion');

  if (!generateBtn || !emailContent || !suggestion) return;

  generateBtn.addEventListener('click', async () => {
    if (!emailContent.value.trim()) {
      alert('Please enter email content');
      return;
    }

    generateBtn.disabled = true;
    suggestion.textContent = 'Generating...';

    try {
      const reply = await generateEmailReply(emailContent.value);
      suggestion.textContent = reply;
    } catch (error) {
      suggestion.textContent = 'Error generating reply. Please try again.';
    } finally {
      generateBtn.disabled = false;
    }
  });
}

initializePopup();
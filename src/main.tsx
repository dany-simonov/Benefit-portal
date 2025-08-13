import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Принудительное обновление favicon для GitHub Pages
const updateFavicon = () => {
  const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
  if (favicon) {
    const newHref = favicon.href.split('?')[0] + '?v=' + Date.now();
    favicon.href = newHref;
  }
  
  // Также обновляем apple-touch-icon
  const appleIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
  if (appleIcon) {
    const newHref = appleIcon.href.split('?')[0] + '?v=' + Date.now();
    appleIcon.href = newHref;
  }
};

// Обновляем favicon при загрузке
updateFavicon();

createRoot(document.getElementById("root")!).render(<App />);

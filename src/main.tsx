 
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "./hooks/useTheme";

createRoot(document.getElementById('root')!).render(
 <ThemeProvider>
    <App />
  </ThemeProvider>
)

import { BrowserRouter } from 'react-router'
import { LanguageProvider } from '@/i18n/LanguageProvider'
import { AppRoutes } from './routes'

export function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  )
}

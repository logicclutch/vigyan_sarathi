import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Seo } from '@/lib/seo'
import { useLanguage } from '@/i18n/useLanguage'
import { AdminAuthProvider } from './AdminAuthProvider'
import { AdminShell } from './AdminShell'
import { A } from './strings'
import { useAdminAuth } from './useAdminAuth'

const LoginPage = lazy(() => import('./pages/Login'))
const OverviewPage = lazy(() => import('./pages/Overview'))
const ModulePage = lazy(() => import('./pages/Module'))
const MediaPage = lazy(() => import('./pages/Media'))
const PublishPage = lazy(() => import('./pages/Publish'))
const UsersPage = lazy(() => import('./pages/Users'))
const AccountPage = lazy(() => import('./pages/Account'))

function Fallback() {
  const { t } = useLanguage()
  return (
    <p role="status" className="p-6 text-sm text-ink-500">
      {t(A.loading)}
    </p>
  )
}

function Gate() {
  const { user, loading } = useAdminAuth()
  if (loading) return <Fallback />
  if (!user) {
    return (
      <Suspense fallback={<Fallback />}>
        <LoginPage />
      </Suspense>
    )
  }
  return (
    <AdminShell>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route index element={<OverviewPage />} />
          <Route path="content/:key" element={<ModulePage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="publish" element={<PublishPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Suspense>
    </AdminShell>
  )
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Seo title={A.panel} description={A.loginIntro} path="/admin" noindex />
      <Gate />
    </AdminAuthProvider>
  )
}

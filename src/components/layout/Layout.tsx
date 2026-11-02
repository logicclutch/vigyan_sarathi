import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { BackToTop } from './BackToTop'
import { PageTransition } from './PageTransition'
import { RouteFallback } from './RouteFallback'
import { ScrollManager } from './ScrollManager'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { SkipLink } from './SkipLink'

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <PageTransition>
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </PageTransition>
      </main>
      <SiteFooter />
      <BackToTop />
      <ScrollManager />
    </div>
  )
}

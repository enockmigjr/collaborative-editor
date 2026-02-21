import { useEffect, useMemo } from 'react'
import { faker } from '@faker-js/faker'
import { Header } from '@/components/Header'
import { LeftPanel } from '@/components/LeftPanel'
import { Editor } from '@/components/Editor'
import { RightPanel } from '@/components/RightPanel'
import { Footer } from '@/components/Footer'
import { MobileNav } from '@/components/MobileNav/MobileNav'
import { useUIStore } from '@/store/useUIStore'
import { useCollaboration } from '@/hooks/useCollaboration'
import clsx from 'clsx'
import type { User } from '@/types'

const App = () => {
  const isDarkMode = useUIStore((state) => state.isDarkMode)
  const activeMobileTab = useUIStore((state) => state.activeMobileTab)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])
  // Générer l'utilisateur courant une seule fois au montage
  const currentUser = useMemo<User>(
    () => ({
      id: faker.string.uuid(),
      name: 'Moi',
      color: '#0070F3', // Vercel blue
      avatar: faker.image.avatar(),
      isLocal: true,
    }),
    []
  )

  // Singleton d'orchestration Yjs (connexion, bots, log) attaché à la racine
  useCollaboration(currentUser)

  return (
    <div className="flex flex-col h-dvh w-full bg-vercel-black text-vercel-text overflow-hidden selection:bg-vercel-accent/30 selection:text-white">
      <Header />
      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden relative">
        <div
          className={clsx(
            'w-full lg:w-64 shrink-0 lg:flex h-full',
            activeMobileTab === 'users' ? 'flex' : 'hidden'
          )}
        >
          <LeftPanel />
        </div>

        <div
          className={clsx(
            'flex-1 bg-vercel-black lg:flex h-full min-w-0 flex-col',
            activeMobileTab === 'editor' ? 'flex' : 'hidden'
          )}
        >
          <Editor />
        </div>

        <div
          className={clsx(
            'w-full lg:w-72 shrink-0 lg:flex h-full',
            activeMobileTab === 'activity' ? 'flex' : 'hidden'
          )}
        >
          <RightPanel currentUser={currentUser} />
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}

export default App

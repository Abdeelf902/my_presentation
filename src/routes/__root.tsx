import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import SEO from '../components/SEO'
import WhatsAppFloat from '../components/WhatsAppFloat'
import { ThemeProvider } from '../contexts/ThemeContext'
import { MenuProvider } from '../contexts/MenuContext'
import { useMenu } from '../hooks/useMenu'

// Composant NotFound pour les erreurs 404
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center page-shell">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-main mb-4">404</h1>
        <p className="text-lg text-text-secondary mb-8">Page non trouvée</p>
        <p className="text-text-secondary mb-8">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

function RootComponent() {
  const { isMenuOpen } = useMenu()

  return (
    <HelmetProvider>
      <SEO />
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <div className="page-shell flex flex-col min-h-screen w-full mx-auto transition-all duration-300 ease-out p-3 sm:p-4 md:p-6 lg:p-8">
        <header role="banner">
          <Navbar />
        </header>
        <main role="main"
          id="main-content"
          className={`flex-1 h-auto transition-all duration-500 ease-out ${isMenuOpen ? 'pointer-events-none blur-sm scale-[0.98]' : ''}`}
        >
          <div className="h-full">
            <Outlet />
          </div>
        </main>

        {/* WhatsApp Flottant Global */}
        <WhatsAppFloat />

        <footer role="contentinfo" className="mt-4 sm:mt-6 md:mt-8 py-6 sm:py-8 text-center rounded-2xl glass-strong transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="tracking-normal font-medium text-sm sm:text-base mb-3 text-text-secondary">
              &copy; 2025 -  {new Date().getFullYear()} Abderrahmane El Farouah. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm mb-4">
              <Link
                to="/mentions-legales"
                className="text-accent hover:text-accent-foreground transition-colors font-medium hover:underline underline-offset-4"
              >
                Mentions légales
              </Link>
              <span className="text-text-muted">•</span>
              <Link
                to="/cgv"
                className="text-accent hover:text-accent-foreground transition-colors font-medium hover:underline underline-offset-4"
              >
                CGV
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-text-muted">
              <span className="font-medium">Expertises :</span>
              <Link to="/developpeur-angular-freelance" className="hover:text-accent transition-colors">Angular Freelance</Link>
              <span>•</span>
              <Link to="/developpeur-laravel-freelance" className="hover:text-accent transition-colors">Laravel Freelance</Link>
              <span>•</span>
              <Link to="/creation-site-web-yvelines" className="hover:text-accent transition-colors">Site Web Yvelines</Link>
              <span>•</span>
              <Link to="/applications-web-sur-mesure" className="hover:text-accent transition-colors">Applications Sur Mesure</Link>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  )
}

function RootWithProviders() {
  return (
    <ThemeProvider>
      <MenuProvider>
        <RootComponent />
      </MenuProvider>
    </ThemeProvider>
  )
}

export const Route = createRootRoute({
  component: RootWithProviders,
  notFoundComponent: NotFound,
})

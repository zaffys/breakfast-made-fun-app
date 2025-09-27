import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Utensils } from 'lucide-react';
const navLinkClasses = "transition-colors hover:text-coral-red";
const activeNavLinkClasses = "text-coral-red font-semibold";
export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-sunny-yellow rounded-full group-hover:rotate-12 transition-transform">
                <Utensils className="h-6 w-6 text-gray-800" />
              </div>
              <span className="font-fredericka text-2xl font-bold tracking-wider">
                SunriseFeasts
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
                  }
                >
                  Favorites
                </NavLink>
              </nav>
              <ThemeToggle className="relative" />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-muted">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>Built with ❤️ at Cloudflare</p>
        </div>
      </footer>
    </div>
  );
}
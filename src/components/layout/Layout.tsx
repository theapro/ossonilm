import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Footer } from "../footer/Footer"
import { Navbar } from "../navigation/Navbar"

function ScrollManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-ink antialiased">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Asosiy qismga o’tish
      </a>
      <Navbar />
      <main id="content" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollManager />
    </div>
  )
}

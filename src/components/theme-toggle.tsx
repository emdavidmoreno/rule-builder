import { MoonIcon, SunIcon } from "lucide-react"
import { useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"

const THEME_KEY = "rule-builder-theme"

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark")
}

function getServerSnapshot() {
  return false
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => {
        const nextDark = !document.documentElement.classList.contains("dark")
        document.documentElement.classList.toggle("dark", nextDark)
        localStorage.setItem(THEME_KEY, nextDark ? "dark" : "light")
      }}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}

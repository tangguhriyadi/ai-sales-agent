"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, FileText, Menu, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Chat",
    href: "/",
    icon: MessageCircle,
  },
  {
    name: "Documents",
    href: "/documents",
    icon: FileText,
  },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setCollapsed(true)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault()
        toggleSidebar()
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [collapsed])

  const toggleSidebar = () => setCollapsed(!collapsed)

  return (
    <div 
      className={cn(
        "flex h-full flex-col bg-background/80 backdrop-blur-sm border-r border-border/50 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="shrink-0"
          title={collapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
        {!collapsed && (
          <h1 className="ml-3 text-xl font-semibold transition-opacity duration-200">
            Sales Agent
          </h1>
        )}
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Button
              key={item.name}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full transition-all duration-200",
                collapsed ? "justify-center px-0" : "justify-start gap-3",
                isActive && "bg-secondary"
              )}
              onClick={() => router.push(item.href)}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <span className="transition-opacity duration-200">
                  {item.name}
                </span>
              )}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SuperAdminSidebar } from "@/components/layout/SuperAdminSidebar"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#f5f5f7] dark:bg-[#1d1d1f]">
        <SuperAdminSidebar />
        <main className="flex-1 flex flex-col overflow-y-auto">
          <header className="h-14 flex items-center border-b border-black/[0.04] dark:border-white/[0.06] px-6 bg-white/80 dark:bg-[#1d1d1f]/80 backdrop-blur-xl sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-3">
              <span className="text-[13px] text-muted-foreground font-medium hidden sm:block">Super Admin</span>
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                SA
              </div>
            </div>
          </header>
          <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

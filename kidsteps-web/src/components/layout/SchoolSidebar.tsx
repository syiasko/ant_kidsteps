import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar"
import { LayoutDashboard, Users, CalendarDays, Megaphone, Folder, PieChart, ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const menuItems = [
  {
    title: "Dashboard",
    url: "/school",
    icon: LayoutDashboard,
  },
  {
    title: "Data Master",
    url: "#",
    icon: Users,
    items: [
      { title: "Siswa", url: "/school/master/siswa" },
      { title: "Kelas", url: "/school/master/kelas" },
      { title: "Guru", url: "/school/master/guru" },
      { title: "Pengguna Aplikasi", url: "/school/master/pengguna" },
    ]
  },
  {
    title: "Planner",
    url: "#",
    icon: CalendarDays,
    items: [
      { title: "Weekly Planner", url: "/school/planner" },
      { title: "Monthly Planner", url: "/school/planner/monthly" },
    ]
  },
  {
    title: "Absensi",
    url: "#",
    icon: Users,
    items: [
      { title: "Input Absensi", url: "/school/attendance" },
      { title: "Daftar Hadir Hari Ini", url: "/school/attendance/today" },
      { title: "Riwayat Absensi", url: "/school/attendance/history" },
    ]
  },
  {
    title: "Smart Broadcast",
    url: "/school/broadcast",
    icon: Megaphone,
  },
  {
    title: "Documents",
    url: "/school/documents",
    icon: Folder,
  },
  {
    title: "Statistik",
    url: "/school/statistics",
    icon: PieChart,
  },
]

export function SchoolSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5 border-b border-black/[0.04] dark:border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold tracking-tight">K</span>
          </div>
          <div>
            <h2 className="font-semibold text-[15px] leading-tight tracking-tight">TK Pelangi</h2>
            <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">School Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 pt-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground/70 px-3">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                item.items ? (
                  <Collapsible key={item.title} defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <SidebarMenuButton render={<CollapsibleTrigger />}>
                        <item.icon className="w-4 h-4 opacity-60" />
                        <span className="text-[13px] font-medium">{item.title}</span>
                        <ChevronRight className="ml-auto w-3.5 h-3.5 opacity-40 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton render={<a href={subItem.url} />}>
                                <span className="text-[13px]">{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton render={<a href={item.url} />}>
                      <item.icon className="w-4 h-4 opacity-60" />
                      <span className="text-[13px] font-medium">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

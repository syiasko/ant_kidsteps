import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { LayoutDashboard, Building2, Settings, Activity, FileBox } from "lucide-react"

const menuItems = [
  {
    title: "Global Analytics",
    url: "/superadmin",
    icon: LayoutDashboard,
  },
  {
    title: "School Management",
    url: "/superadmin/schools",
    icon: Building2,
  },
  {
    title: "Subscriptions",
    url: "/superadmin/subscriptions",
    icon: FileBox,
  },
  {
    title: "Customization",
    url: "/superadmin/customization",
    icon: Settings,
  },
  {
    title: "Maintenance",
    url: "/superadmin/maintenance",
    icon: Activity,
  },
]

export function SuperAdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5 border-b border-black/[0.04] dark:border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold tracking-tight">K</span>
          </div>
          <div>
            <h2 className="font-semibold text-[15px] leading-tight tracking-tight">KidSteps HQ</h2>
            <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">Super Admin</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 pt-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground/70 px-3">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<a href={item.url} />}>
                    <item.icon className="w-4 h-4 opacity-60" />
                    <span className="text-[13px] font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

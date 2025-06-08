
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar";
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle,
  User
} from "lucide-react";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { open } = useSidebar();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "products", label: "Products", icon: Package },
    { id: "billing", label: "Billing", icon: ShoppingCart },
    { id: "reports", label: "Reports", icon: TrendingUp },
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <Sidebar className={`${open ? "w-56 sm:w-64" : "w-14 sm:w-16"} transition-all duration-300`}>
      <SidebarHeader className="p-3 sm:p-4">
        {open && (
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Package className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm sm:text-lg text-gray-900 truncate">DukaanBuddy</h2>
              <p className="text-xs text-gray-600 truncate">Smart Shop Assistant</p>
            </div>
          </div>
        )}
        {!open && (
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center mx-auto">
            <Package className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={`text-xs ${!open && "sr-only"}`}>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className={`w-full justify-start min-h-[44px] ${!open ? "px-2 justify-center" : "px-3"}`}
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    {open && <span className="text-sm sm:text-base truncate">{item.label}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 sm:p-4">
        {open && (
          <div className="space-y-2 sm:space-y-3">
            <div className="text-sm">
              <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">Shop Owner</p>
              <p className="text-gray-600 text-xs truncate">Shopkeeper</p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

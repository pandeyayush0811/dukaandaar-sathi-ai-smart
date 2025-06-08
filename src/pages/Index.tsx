
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Scan, Plus } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Dashboard from "@/components/Dashboard";
import ProductManagement from "@/components/ProductManagement";
import BillingSystem from "@/components/BillingSystem";
import ImprovedBarcodeScanner from "@/components/ImprovedBarcodeScanner";
import ReportsView from "@/components/ReportsView";
import UserProfile from "@/components/UserProfile";
import { AppSidebar } from "@/components/AppSidebar";
import AlertsView from "@/components/AlertsView";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showScanner, setShowScanner] = useState(false);

  if (showScanner) {
    return <ImprovedBarcodeScanner onClose={() => setShowScanner(false)} />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductManagement />;
      case "billing":
        return <BillingSystem />;
      case "reports":
        return <ReportsView />;
      case "profile":
        return <UserProfile />;
      case "alerts":
        return <AlertsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-white to-green-50">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col">
          {/* Mobile-optimized Header */}
          <div className="bg-white shadow-sm border-b sticky top-0 z-10">
            <div className="px-3 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <SidebarTrigger />
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 sm:w-5 sm:h-5 bg-white rounded-sm"></div>
                    </div>
                    <div className="hidden sm:block">
                      <h1 className="text-lg sm:text-xl font-bold text-gray-900">DukaanBuddy</h1>
                      <p className="text-xs text-gray-600">आपका स्मार्ट दुकान साथी</p>
                    </div>
                    <div className="sm:hidden">
                      <h1 className="text-base font-bold text-gray-900">DukaanBuddy</h1>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setShowScanner(true)}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg text-xs sm:text-sm px-3 sm:px-4 py-2 h-8 sm:h-10"
                  size="sm"
                >
                  <Scan className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Scan Product</span>
                  <span className="sm:hidden">Scan</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-3 sm:p-4 lg:p-6 pb-20 sm:pb-6">
            <div className="max-w-7xl mx-auto">
              {renderTabContent()}
            </div>
          </div>

          {/* Mobile FAB */}
          <div className="fixed bottom-4 right-4 sm:hidden">
            <Button 
              onClick={() => setShowScanner(true)}
              size="lg"
              className="w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;

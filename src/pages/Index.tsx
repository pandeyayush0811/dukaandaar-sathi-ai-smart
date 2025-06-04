
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  IndianRupee,
  Scan,
  Plus,
  LogOut,
  User
} from "lucide-react";
import Dashboard from "@/components/Dashboard";
import ProductManagement from "@/components/ProductManagement";
import BillingSystem from "@/components/BillingSystem";
import BarcodeScanner from "@/components/BarcodeScanner";
import ReportsView from "@/components/ReportsView";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/components/AuthProvider";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showScanner, setShowScanner] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600">Loading DukaanBuddy...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Welcome to DukaanBuddy</CardTitle>
              <p className="text-gray-600">आपका स्मार्ट दुकान साथी</p>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600"
                size="lg"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>
        <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      </>
    );
  }

  if (showScanner) {
    return <BarcodeScanner onClose={() => setShowScanner(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">DukaanBuddy</h1>
                <p className="text-sm text-gray-600">आपका स्मार्ट दुकान साथी</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setShowScanner(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                size="lg"
              >
                <Scan className="w-5 h-5 mr-2" />
                Scan Product
              </Button>
              <Button
                variant="outline"
                onClick={signOut}
                size="sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="billing">
            <BillingSystem />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsView />
          </TabsContent>

          <TabsContent value="alerts">
            <div className="space-y-4">
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <AlertTriangle className="w-5 h-5" />
                    Stock Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                    <div>
                      <p className="font-medium text-gray-900">Low stock items will appear here</p>
                      <p className="text-sm text-gray-600">Add products to see alerts</p>
                    </div>
                    <Badge variant="secondary">Coming Soon</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Action FAB */}
      <div className="fixed bottom-6 right-6">
        <Button 
          onClick={() => setShowScanner(true)}
          size="lg"
          className="w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
        >
          <Plus className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};

export default Index;

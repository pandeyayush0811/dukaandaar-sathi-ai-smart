
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  IndianRupee, 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users, 
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-4 sm:p-6 text-white">
        <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Welcome back, Rajesh ji! 🙏</h2>
        <p className="text-blue-100 text-sm sm:text-base">Here's how your shop is performing today</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-green-800">Today's Sales</CardTitle>
            <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold text-green-900">₹2,847</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Products Sold</CardTitle>
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">143</div>
            <p className="text-xs text-muted-foreground">Items sold today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Products</CardTitle>
            <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">In inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Customers</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Served today</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Button variant="outline" className="h-16 sm:h-20 flex-col text-xs sm:text-sm p-2">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
              Add Product
            </Button>
            <Button variant="outline" className="h-16 sm:h-20 flex-col text-xs sm:text-sm p-2">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
              New Sale
            </Button>
            <Button variant="outline" className="h-16 sm:h-20 flex-col text-xs sm:text-sm p-2">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
              View Reports
            </Button>
            <Button variant="outline" className="h-16 sm:h-20 flex-col text-xs sm:text-sm p-2">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
              Customer List
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base truncate">Tea Packets (5x)</p>
                <p className="text-xs sm:text-sm text-muted-foreground">12:45 PM</p>
              </div>
              <p className="font-semibold text-green-600 text-sm sm:text-base ml-2">₹125</p>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base truncate">Maggi Noodles (3x)</p>
                <p className="text-xs sm:text-sm text-muted-foreground">12:20 PM</p>
              </div>
              <p className="font-semibold text-green-600 text-sm sm:text-base ml-2">₹75</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base truncate">Biscuits Pack (2x)</p>
                <p className="text-xs sm:text-sm text-muted-foreground">11:55 AM</p>
              </div>
              <p className="font-semibold text-green-600 text-sm sm:text-base ml-2">₹60</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              Important Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 sm:p-6 pt-0">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">5 products low in stock</p>
                <p className="text-xs text-gray-600">Reorder soon</p>
              </div>
              <Badge variant="destructive" className="text-xs">Urgent</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">3 items expiring soon</p>
                <p className="text-xs text-gray-600">Within 5 days</p>
              </div>
              <Badge variant="secondary" className="text-xs">Warning</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Download, 
  Calendar, 
  IndianRupee,
  Package,
  Users
} from "lucide-react";

const ReportsView = () => {
  return (
    <div className="space-y-6">
      {/* Header with Export */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sales Reports</h2>
          <p className="text-muted-foreground">Track your business performance</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          {/* Today's Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Today's Revenue</p>
                    <p className="text-2xl font-bold">₹2,847</p>
                  </div>
                  <IndianRupee className="w-8 h-8 text-green-200" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+12% vs yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Items Sold</p>
                    <p className="text-2xl font-bold">143</p>
                  </div>
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <Badge variant="secondary" className="mt-2">+8 vs yesterday</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Customers</p>
                    <p className="text-2xl font-bold">89</p>
                  </div>
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <Badge variant="secondary" className="mt-2">+5 vs yesterday</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Avg. Order</p>
                    <p className="text-2xl font-bold">₹32</p>
                  </div>
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <Badge className="mt-2 bg-green-100 text-green-800">+₹3 vs yesterday</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Top Selling Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-green-800">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Tea Packets Premium</p>
                      <p className="text-sm text-muted-foreground">25 units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹3,125</p>
                    <p className="text-sm text-green-600">+15%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-800">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Maggi 2-Minute Noodles</p>
                      <p className="text-sm text-muted-foreground">18 units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹450</p>
                    <p className="text-sm text-green-600">+8%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-800">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Biscuit Pack Chocolate</p>
                      <p className="text-sm text-muted-foreground">12 units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹360</p>
                    <p className="text-sm text-red-600">-3%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Timeline (Today)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">09:00 - 12:00</div>
                  <div className="flex-1 bg-green-200 h-4 rounded-full">
                    <div className="bg-green-600 h-4 rounded-full" style={{width: '70%'}}></div>
                  </div>
                  <div className="text-sm font-semibold">₹1,250</div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">12:00 - 15:00</div>
                  <div className="flex-1 bg-green-200 h-4 rounded-full">
                    <div className="bg-green-600 h-4 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <div className="text-sm font-semibold">₹890</div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">15:00 - 18:00</div>
                  <div className="flex-1 bg-green-200 h-4 rounded-full">
                    <div className="bg-green-600 h-4 rounded-full" style={{width: '35%'}}></div>
                  </div>
                  <div className="text-sm font-semibold">₹707</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="w-16 h-16 mx-auto mb-4" />
                <p>Weekly reports coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="w-16 h-16 mx-auto mb-4" />
                <p>Monthly reports coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsView;

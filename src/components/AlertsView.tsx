
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

const AlertsView = () => {
  return (
    <div className="space-y-4">
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-orange-800 text-lg sm:text-xl">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
            Stock Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm sm:text-base truncate">Low stock items will appear here</p>
              <p className="text-xs sm:text-sm text-gray-600">Add products to see alerts</p>
            </div>
            <Badge variant="secondary" className="ml-2 text-xs">Coming Soon</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsView;

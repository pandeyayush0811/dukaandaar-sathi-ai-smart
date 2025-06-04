
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Plus, Edit, AlertTriangle } from "lucide-react";

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock product data
  const products = [
    {
      id: "1",
      name: "Maggi 2-Minute Noodles",
      barcode: "8901030825181",
      price: 25,
      stock: 15,
      expiryDate: "2024-12-31",
      status: "low"
    },
    {
      id: "2",
      name: "Tea Packets Premium",
      barcode: "8901234567890",
      price: 125,
      stock: 45,
      expiryDate: "2025-06-15",
      status: "good"
    },
    {
      id: "3",
      name: "Biscuit Pack Chocolate",
      barcode: "8901876543210",
      price: 30,
      stock: 8,
      expiryDate: "2024-06-10",
      status: "expiring"
    },
    {
      id: "4",
      name: "Rice Basmati 1kg",
      barcode: "8901456789012",
      price: 180,
      stock: 25,
      expiryDate: "2025-01-30",
      status: "good"
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)
  );

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "expiring") {
      return <Badge variant="destructive">Expiring Soon</Badge>;
    }
    if (status === "low" || stock < 10) {
      return <Badge variant="secondary">Low Stock</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products or scan barcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Code: {product.barcode}
                  </p>
                </div>
                <Package className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                {getStatusBadge(product.status, product.stock)}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Stock:</span>
                  <span className={`font-medium ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                    {product.stock} units
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expires:</span>
                  <span className="text-gray-900">{product.expiryDate}</span>
                </div>
              </div>

              {(product.status === "low" || product.status === "expiring") && (
                <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-orange-800">
                    {product.status === "low" ? "Reorder needed" : "Expires soon"}
                  </span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Update Stock
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="p-8 text-center">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Add your first product to get started"}
          </p>
          <Button>Add Product</Button>
        </Card>
      )}
    </div>
  );
};

export default ProductManagement;

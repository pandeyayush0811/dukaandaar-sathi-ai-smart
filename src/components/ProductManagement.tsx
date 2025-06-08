
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Plus, AlertTriangle, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { AddProductModal } from "./AddProductModal";

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const { products, isLoading, updateProduct } = useProducts();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.barcode && product.barcode.includes(searchTerm))
  );

  const getStatusBadge = (product: any) => {
    const today = new Date();
    const expiryDate = product.expiry_date ? new Date(product.expiry_date) : null;
    const daysUntilExpiry = expiryDate ? Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : null;

    if (daysUntilExpiry !== null && daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
      return <Badge variant="destructive" className="text-xs">Expiring Soon</Badge>;
    }
    if (daysUntilExpiry !== null && daysUntilExpiry <= 0) {
      return <Badge variant="destructive" className="text-xs">Expired</Badge>;
    }
    if (product.stock <= product.min_stock) {
      return <Badge variant="secondary" className="text-xs">Low Stock</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800 text-xs">In Stock</Badge>;
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    updateProduct({ id: productId, stock: newStock });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products or scan barcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-green-600 to-green-700 text-sm h-10"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 sm:pb-3 p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm sm:text-lg leading-tight truncate">{product.name}</CardTitle>
                  {product.barcode && (
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">
                      Code: {product.barcode}
                    </p>
                  )}
                </div>
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-2xl font-bold text-green-600">₹{product.price}</span>
                {getStatusBadge(product)}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Stock:</span>
                  <span className={`font-medium ${product.stock <= product.min_stock ? 'text-red-600' : 'text-gray-900'}`}>
                    {product.stock} units
                  </span>
                </div>
                {product.expiry_date && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Expires:</span>
                    <span className="text-gray-900 truncate">{new Date(product.expiry_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {(product.stock <= product.min_stock) && (
                <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                  <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-orange-800">Reorder needed</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs h-8"
                  onClick={() => handleStockUpdate(product.id, product.stock + 10)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add 10
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs h-8"
                  onClick={() => handleStockUpdate(product.id, Math.max(0, product.stock - 1))}
                >
                  Sell 1
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && !isLoading && (
        <Card className="p-6 sm:p-8 text-center">
          <Package className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-base sm:text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            {searchTerm ? "Try adjusting your search terms" : "Add your first product to get started"}
          </p>
          <Button onClick={() => setShowAddModal(true)}>Add Product</Button>
        </Card>
      )}

      <AddProductModal open={showAddModal} onOpenChange={setShowAddModal} />
    </div>
  );
};

export default ProductManagement;


import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Camera, Package, AlertCircle } from "lucide-react";

interface BarcodeScannerProps {
  onClose: () => void;
}

const BarcodeScanner = ({ onClose }: BarcodeScannerProps) => {
  const [scannedCode, setScannedCode] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    barcode: "",
    price: "",
    stock: "",
    expiryDate: ""
  });

  // Mock function to simulate barcode scanning
  const simulateScan = () => {
    const mockBarcode = "8901030825181"; // Sample barcode
    setScannedCode(mockBarcode);
    
    // Mock product lookup
    const mockProduct = {
      id: "1",
      name: "Maggi 2-Minute Noodles",
      barcode: mockBarcode,
      price: 25,
      stock: 15,
      expiryDate: "2024-12-31"
    };
    
    setProduct(mockProduct);
  };

  const handleAddNewProduct = () => {
    console.log("Adding new product:", newProduct);
    // Here you would typically save to database
    onClose();
  };

  const handleUpdateStock = (action: 'add' | 'sale', quantity: number) => {
    console.log(`${action} ${quantity} units of ${product?.name}`);
    // Here you would update the database
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Barcode Scanner</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* Camera Preview Area */}
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-8 text-center">
              <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">Position barcode within the frame</p>
              <Button onClick={simulateScan} className="w-full">
                Simulate Scan
              </Button>
            </CardContent>
          </Card>

          {/* Manual Entry Option */}
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => setIsManualEntry(!isManualEntry)}
              className="w-full"
            >
              Enter Barcode Manually
            </Button>
          </div>

          {isManualEntry && (
            <div className="space-y-2">
              <Label htmlFor="manual-barcode">Barcode Number</Label>
              <Input
                id="manual-barcode"
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
                placeholder="Enter barcode number"
              />
              <Button 
                onClick={() => simulateScan()} 
                className="w-full"
                disabled={!scannedCode}
              >
                Search Product
              </Button>
            </div>
          )}

          {/* Scanned Code Display */}
          {scannedCode && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-blue-800">Scanned Code:</p>
                <p className="text-blue-900 font-mono">{scannedCode}</p>
              </CardContent>
            </Card>
          )}

          {/* Product Found */}
          {product && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Package className="w-5 h-5" />
                  Product Found
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-lg">{product.name}</p>
                  <p className="text-green-700">Price: ₹{product.price}</p>
                  <p className="text-green-700">Current Stock: {product.stock} units</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => handleUpdateStock('add', 10)}
                    variant="outline"
                  >
                    Add Stock (+10)
                  </Button>
                  <Button 
                    onClick={() => handleUpdateStock('sale', 1)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Make Sale (-1)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Product Not Found - Add New */}
          {scannedCode && !product && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <AlertCircle className="w-5 h-5" />
                  Product Not Found
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-orange-700">Add this as a new product to your inventory:</p>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="product-name">Product Name *</Label>
                    <Input
                      id="product-name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="Enter product name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="price">Price (₹) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Initial Stock *</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="expiry">Expiry Date (Optional)</Label>
                    <Input
                      id="expiry"
                      type="date"
                      value={newProduct.expiryDate}
                      onChange={(e) => setNewProduct({...newProduct, expiryDate: e.target.value})}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleAddNewProduct}
                    className="w-full"
                    disabled={!newProduct.name || !newProduct.price || !newProduct.stock}
                  >
                    Add Product to Inventory
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;

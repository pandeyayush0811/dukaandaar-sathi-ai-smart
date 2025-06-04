
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Camera, Package, AlertCircle, Scan } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useToast } from "@/hooks/use-toast";

interface ImprovedBarcodeScannerProps {
  onClose: () => void;
}

const ImprovedBarcodeScanner = ({ onClose }: ImprovedBarcodeScannerProps) => {
  const [scannedCode, setScannedCode] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    barcode: "",
    price: "",
    stock: "",
    min_stock: "5",
    expiry_date: ""
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { products, addProduct } = useProducts();
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please use manual entry.",
        variant: "destructive",
      });
      setIsManualEntry(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const searchProduct = (barcode: string) => {
    const foundProduct = products.find(p => p.barcode === barcode);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setProduct(null);
      setNewProduct(prev => ({ ...prev, barcode }));
    }
  };

  const simulateScan = () => {
    const mockBarcode = "8901030" + Math.floor(Math.random() * 1000000);
    setScannedCode(mockBarcode);
    searchProduct(mockBarcode);
  };

  const handleManualSearch = () => {
    if (scannedCode) {
      searchProduct(scannedCode);
    }
  };

  const handleAddNewProduct = async () => {
    try {
      await addProduct({
        name: newProduct.name,
        barcode: newProduct.barcode,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        min_stock: parseInt(newProduct.min_stock),
        expiry_date: newProduct.expiry_date || undefined,
      });
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleStockAction = (action: 'add' | 'sale', quantity: number) => {
    console.log(`${action} ${quantity} units of ${product?.name}`);
    toast({
      title: `Stock ${action === 'add' ? 'Added' : 'Sold'}`,
      description: `${quantity} units ${action === 'add' ? 'added to' : 'sold from'} ${product?.name}`,
    });
    onClose();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Scan className="w-5 h-5" />
            Barcode Scanner
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* Camera or Manual Entry */}
          {!isManualEntry ? (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="p-4">
                {isCameraActive ? (
                  <div className="space-y-4">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-48 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex gap-2">
                      <Button onClick={simulateScan} className="flex-1">
                        Capture Barcode
                      </Button>
                      <Button variant="outline" onClick={stopCamera}>
                        Stop Camera
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <Camera className="w-16 h-16 mx-auto text-gray-400" />
                    <div className="space-y-2">
                      <p className="text-gray-600">Scan product barcode</p>
                      <Button onClick={startCamera} className="w-full">
                        <Camera className="w-4 h-4 mr-2" />
                        Start Camera
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              <Label htmlFor="manual-barcode">Enter Barcode Manually</Label>
              <div className="flex gap-2">
                <Input
                  id="manual-barcode"
                  value={scannedCode}
                  onChange={(e) => setScannedCode(e.target.value)}
                  placeholder="Enter barcode number"
                  className="flex-1"
                />
                <Button onClick={handleManualSearch} disabled={!scannedCode}>
                  Search
                </Button>
              </div>
            </div>
          )}

          {/* Toggle Manual Entry */}
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => setIsManualEntry(!isManualEntry)}
              className="w-full"
            >
              {isManualEntry ? "Use Camera" : "Enter Manually"}
            </Button>
          </div>

          {/* Scanned Code Display */}
          {scannedCode && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-3">
                <p className="text-sm font-medium text-blue-800">Scanned Code:</p>
                <p className="text-blue-900 font-mono text-lg">{scannedCode}</p>
              </CardContent>
            </Card>
          )}

          {/* Product Found */}
          {product && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Package className="w-5 h-5" />
                  Product Found
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-green-900">{product.name}</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <p className="text-green-700">Price: ₹{product.price}</p>
                    <p className="text-green-700">Stock: {product.stock} units</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => handleStockAction('add', 10)}
                    variant="outline"
                  >
                    Add Stock (+10)
                  </Button>
                  <Button 
                    onClick={() => handleStockAction('sale', 1)}
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
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <AlertCircle className="w-5 h-5" />
                  Product Not Found
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-orange-700">Add this as a new product:</p>
                
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

export default ImprovedBarcodeScanner;

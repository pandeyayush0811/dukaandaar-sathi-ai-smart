
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Sale {
  id: string;
  customer_name?: string;
  customer_phone?: string;
  total_amount: number;
  payment_method: string;
  status: string;
  created_at: string;
  sale_items?: SaleItem[];
}

export interface SaleItem {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  products?: {
    name: string;
    barcode?: string;
  };
}

export function useSales() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: sales = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sales")
        .select(`
          *,
          sale_items (
            *,
            products (name, barcode)
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Sale[];
    },
  });

  const createSaleMutation = useMutation({
    mutationFn: async (saleData: {
      customer_name?: string;
      customer_phone?: string;
      total_amount: number;
      payment_method: string;
      items: Array<{
        product_id: string;
        quantity: number;
        unit_price: number;
        total_price: number;
      }>;
    }) => {
      const { data: sale, error: saleError } = await supabase
        .from("sales")
        .insert([{
          customer_name: saleData.customer_name,
          customer_phone: saleData.customer_phone,
          total_amount: saleData.total_amount,
          payment_method: saleData.payment_method,
          status: "completed",
        }])
        .select()
        .single();

      if (saleError) throw saleError;

      const saleItems = saleData.items.map(item => ({
        ...item,
        sale_id: sale.id,
      }));

      const { error: itemsError } = await supabase
        .from("sale_items")
        .insert(saleItems);

      if (itemsError) throw itemsError;

      return sale;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Sale completed",
        description: "Sale has been recorded successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to complete sale. Please try again.",
        variant: "destructive",
      });
      console.error("Create sale error:", error);
    },
  });

  return {
    sales,
    isLoading,
    error,
    createSale: createSaleMutation.mutate,
    isCreatingSale: createSaleMutation.isPending,
  };
}

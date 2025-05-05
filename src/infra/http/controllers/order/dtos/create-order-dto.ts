
export interface CreateOrderDTO {
    restaurantId: string;
    customerId?: string;
    tableNumber?: number;
    observations?: string;
    items: Array<{
      dishId: string;
      quantity: number;
    }>;
  }
  
  
  export interface UpdateOrderStatusDTO {
    status: "PENDING" | "IN_PROGRESS" | "DELIVERED" | "CANCELED";
  }
import { Order } from "../enterprise/entities/order";
import { OrderItem } from "../enterprise/entities/order-item";

export interface OrderRepository {
  create(order: Order, items: OrderItem[]): Promise<void>;
  updateStatus(orderId: string, status: string): Promise<void>;
  findById(orderId: string): Promise<Order | null>;
  listByRestaurant(restaurantId: string): Promise<Order[]>;
  listByCustomer(customerId: string): Promise<Order[]>;
}
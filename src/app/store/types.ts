// types.ts
export interface CartItemType {
  id: string;
  name: string;
  priceInCents: number;
  imagePath: string;
  description: string;
  isAvailableForPurchase: Boolean;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
}

export interface CartState {
  cart: CartItemType[];
}

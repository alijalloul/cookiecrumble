// cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartItemType } from "./types";

const initialState: CartState = {
  cart: [
    {
      "id": "3a4cb4b6-d6cc-4230-aafe-ec09bba9e6bb",
      "name": "Red Fruit Puff Pastry",
      "priceInCents": 1600,
      "imagePath":
        "/images/7c28ad2f-8414-4c10-a9bf-910b3aa42a9e-Gemini_Generated_Image_6y2c4a6y2c4a6y2c.jpg",
      "description":
        "Buttery puff pastry filled with a variety of red fruits topped with some whipped cream",
      "isAvailableForPurchase": true,
      "createdAt": new Date("2024-05-18T13:54:04.321Z"),
      "updatedAt": new Date("2024-05-18T13:54:11.882Z"),
      "quantity": 1,
    },
    // {
    //   "id": "3c5faa62-0554-414b-8b88-8d6b9eb1eab4",
    //   "name": "Key Lime Pie",
    //   "priceInCents": 1500,
    //   "imagePath":
    //     "/images/cd379689-af48-470e-a6ea-cdf63889871b-Gemini_Generated_Image_sjzteosjzteosjzt.jpg",
    //   "description":
    //     "A sweet and sour shiny key lime pie made with organically grown lemons",
    //   "isAvailableForPurchase": true,
    //   "createdAt": new Date("2024-05-18T13:52:19.076Z"),
    //   "updatedAt": new Date("2024-05-18T13:54:10.336Z"),
    //   "quantity": 2,
    // },
    // {
    //   "id": "6890cf6b-f3d4-4763-9922-cf584dcd3c6e",
    //   "name": "Brownie",
    //   "priceInCents": 200,
    //   "imagePath":
    //     "/images/342b7d34-87df-44c7-9f67-edecd4fbfec5-Gemini_Generated_Image_sjztepsjztepsjzt.jpg",
    //   "description": "Fudgy Brownie with a single walnut on top",
    //   "isAvailableForPurchase": true,
    //   "createdAt": new Date("2024-05-18T13:51:19.068Z"),
    //   "updatedAt": new Date("2024-05-18T13:54:07.123Z"),
    //   "quantity": 1,
    // },
    // {
    //   "id": "15370d72-699a-4102-b3c5-3fc99236a62f",
    //   "name": "Croissant",
    //   "priceInCents": 300,
    //   "imagePath":
    //     "/images/d15f0a7b-40ff-4152-8f9c-79ad8d4bf4ed-Gemini_Generated_Image_3p78543p78543p78.jpg",
    //   "description": "French Butter Croissant",
    //   "isAvailableForPurchase": true,
    //   "createdAt": new Date("2024-05-18T13:50:23.599Z"),
    //   "updatedAt": new Date("2024-05-18T13:54:08.543Z"),
    //   "quantity": 3,
    // },
    {
      "id": "3d805cbd-16a4-49b4-8a7c-8a11f2ab2fa4",
      "name": "Chocolate Chip Cookie",
      "priceInCents": 150,
      "imagePath":
        "/images/7990086b-1861-4c84-b8c5-9c39952a6a35-Gemini_Generated_Image_wl2wxowl2wxowl2w.jpg",
      "description": "Gooey chocolate chip cookies. (min order 6 pieces)",
      "isAvailableForPurchase": true,
      "createdAt": new Date("2024-05-21T12:27:29.904Z"),
      "updatedAt": new Date("2024-05-21T12:27:35.412Z"),
      "quantity": 2,
    },
    // {
    //   "id": "9f955556-2552-4607-97dc-f4e51b1173db",
    //   "name": "Artisan Bread",
    //   "priceInCents": 750,
    //   "imagePath":
    //     "/images/5e0b5af0-3887-4b7a-aa95-5738fedc47c8-Gemini_Generated_Image_on0ywuon0ywuon0y.jpg",
    //   "description":
    //     "Hard crust artisan bread made using sourdough and organic flour",
    //   "isAvailableForPurchase": true,
    //   "createdAt": new Date("2024-05-21T12:28:18.845Z"),
    //   "updatedAt": new Date("2024-05-21T12:28:22.456Z"),
    //   "quantity": 1,
    // },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<Omit<CartItemType, "quantity">>
    ) => {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    decrementProduct: (state, action: PayloadAction<string>) => {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload
      );
      if (existingProduct) {
        existingProduct.quantity -= 1;
        if (existingProduct.quantity <= 0) {
          state.cart = state.cart.filter((item) => item.id !== action.payload);
        }
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

// Export the actions generated by createSlice
export const { addProduct, decrementProduct, removeProduct, clearCart } =
  cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;

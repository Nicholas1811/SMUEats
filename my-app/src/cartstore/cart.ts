import { create } from 'zustand'
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      cart: {},
      addToCart: (foodName, addonItem) => {
        set((state) => {
          const currentItems = state.cart[foodName] || [];
          // Stringify to compare deep equality
          const newItemStr = JSON.stringify(addonItem);
          const sameItems = currentItems.filter(item => JSON.stringify(item) === newItemStr);
          const occurrence = sameItems.length;
          console.log(`Item occurs ${occurrence} times already`);
          if (occurrence > 0) {
            const updatedItems = currentItems.map((item) =>
              JSON.stringify(item) === JSON.stringify(addonItem)
                ? { ...item, totalAmt: occurrence+1 }
                : item
            );
            return {
            cart: {
              ...state.cart,
              [foodName]: updatedItems,
            },
          };
          }
          else{
            addonItem.totalAmt = occurrence + 1
            return {
            cart: {
              ...state.cart,
              [foodName]: [...currentItems, addonItem],
            },
          };
          }
          
          
        });
      },
      clearCart: () => set({ cart: {} })
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);
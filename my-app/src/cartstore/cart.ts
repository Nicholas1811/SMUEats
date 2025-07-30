
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      cart: {},
      addToCart: (foodName: string | number, addonItem: { totalAmt?: number }, currentAmt: number) => {
        set((state) => {
          let currentItems: any[] = [];

          if (foodName in state.cart) {
            currentItems = state.cart[foodName];

            //processing user input. stringify user input for comparison with my current cart.
            //user input processing (this will be the place we conduct checking with the other variables.)
            const originalCopy = { ...addonItem }
            delete originalCopy.totalAmt;
            const comparisonString = JSON.stringify(originalCopy)

            //if there is a match, between the current item, i need to do something.
            //we need to check from our current cart if there is anything that is duplicated
            const updatedCartItems = currentItems.filter((item) => {
              const copyLoop = { ...item }
              delete copyLoop.totalAmt;
              return JSON.stringify(copyLoop) == comparisonString
            })

            //there is a duplicate, so we need to use the string to match and find which one.
            //if there is a duplicate, it should be in a list. then within the list, we will create a copy, and json stringify again to check,
            //if is true and we found the duplicate, we add it into the cart by returning the current item we have, then we change the values.
            // else if no match, just return the original item.
            if (updatedCartItems.length == 1) {
              const newAdditions = currentItems.map((item) => {
                //convert item to string (must make duplicate to check)
                const newObject = { ...item }
                delete newObject.totalAmt;
                if (JSON.stringify(newObject) == comparisonString) {
                  return { ...item, totalAmt: currentAmt + item.totalAmt }
                } else {
                  return item
                }
              });
              //after processing value newAdditions, this will be the value of it. foodAdditions should be a list.
              return { cart: { ...state.cart, [foodName]: newAdditions } } //we update the list with something new.
            }
            //if there is no duplicate found, we just add this new entry.
            const anotherAddition = { ...addonItem, totalAmt: currentAmt }
            return {
              cart: {
                ...state.cart,
                [foodName]: [...currentItems, anotherAddition]
              }
            };
          } else {
            //when there is totally nothing.
            const newItem = { ...addonItem, totalAmt: currentAmt };
            return {
              cart: {
                ...state.cart,
                [foodName]: [newItem]
              }
            };
          }
        });
      },

      clearCart: () => set({ cart: {} }),

      getCart: () => get().cart,

      updateAmount: (kn: any, f: any, a: any) => {
        //state
        const currentCart = get().cart;
        const copyOfCurrentCart = { ...currentCart }
        const currentChanges = copyOfCurrentCart[kn]
        const newF = JSON.stringify(f)

        const newArr = currentChanges.map((item) => {
          const newItem = { ...item }
          const stringC = JSON.stringify(newItem)
          if (stringC == newF) {

            if (Number(a) == 0) {
              set((state) => {
                console.log('run')
                let currentFoodAO = []
                if (kn in state.cart) {
                  currentFoodAO = state.cart[kn]
                  const newF = { ...f }
                  const newCompare = JSON.stringify(newF)
                  const matching = currentFoodAO.filter((item) => {
                    return !(JSON.stringify(item) == newCompare)
                      ;
                  })
                  console.log(matching)
                  //set the value to matching.
                  return { cart: { ...state.cart, [kn]: matching } }
                }
              })
            }
            if (Number(a) >= Number(item.totalAmt) || Number(a) < Number(item.totalAmt)) {
              set((state) => {
                console.log('run')
                let currentFoodAO = []
                if (kn in state.cart) {
                  currentFoodAO = state.cart[kn]
                  const newF = { ...f }
                  const newCompare = JSON.stringify(newF)
                  const matching = currentFoodAO.map((item) => {
                    const itemMatch = { ...item }
                    if (JSON.stringify(itemMatch) == newCompare) {
                      itemMatch.totalAmt = Number(a)
                    }
                    return itemMatch
                  })
                  console.log(matching)
                  //set the value to matching.
                  return { cart: { ...state.cart, [kn]: matching } }
                }
              })
            }
           
            console.log(a, 0)

          } else {
            return item
          }
        });
        console.log(newArr, 'line 93')
        return { kn, f, a }
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);

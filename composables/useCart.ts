import type { ProductCard } from "~/types";

interface CartState {
  items: ProductCard[];
}

const state = reactive<CartState>({
  items: getLocalStorageData<ProductCard[]>("cartItems")
    ? getLocalStorageData<ProductCard[]>("cartItems")
    : [],
});

export default () => {
  const { showMessage } = useStore();
  const { items } = toRefs(state);

  const addItem = (payload: ProductCard) => {
    const currentItems = state.items;
    const existingItem = currentItems.find((item) => item.id === payload.id);

    if (existingItem) {
      return showMessage({
        title: "Item already in cart",
        variant: "destructive",
      });
    }

    state.items = [...state.items, payload];

    setLocalStorageData<ProductCard[]>("cartItems", state.items);

    showMessage({ title: "Item added to cart", variant: "default" });
  };

  const removeItem = (id: string) => {
    state.items = [...state.items.filter((item) => item.id !== id)];

    setLocalStorageData<ProductCard[]>("cartItems", state.items);

    showMessage({ title: "Item Removed from cart", variant: "default" });
  };

  const removeAllItems = () => {
    state.items = [];

    setLocalStorageData<ProductCard[]>("cartItems", null);

    showMessage({ title: "Cart cleared", variant: "default" });
  };

  return {
    items,
    addItem,
    removeItem,
    removeAllItems,
  };
};

import type { ProductCard } from "~/types";

interface PreviewModal {
  isOpen: boolean;
  selectedProduct?: ProductCard;
}

const state = reactive<PreviewModal>({
  isOpen: false,
  selectedProduct: undefined,
});

export default () => {
  const { isOpen, selectedProduct } = toRefs(state);
  const onOpen = (payload: ProductCard) => {
    // state.isOpen = true;
    state.selectedProduct = payload;
  };

  const onClose = () => {
    state.isOpen = false;
    state.selectedProduct = undefined;
  };

  return {
    onClose,
    onOpen,
    isOpen,
    selectedProduct,
  };
};

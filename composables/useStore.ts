import type { APIError } from "~/types";
import { useToast } from "@/components/ui/toast/use-toast";

interface state {
  isLoading: boolean;
  appError: APIError | null;
  isAlertModalOpen: boolean;
}

const state = reactive<state>({
  isLoading: false,
  appError: null,
  isAlertModalOpen: false,
});

export default () => {
  const { isLoading, appError, isAlertModalOpen } = toRefs(state);
  const { toast } = useToast();

  const toggleAlertModal = (v: boolean) => {
    state.isAlertModalOpen = v;
  };
  const toggleLoading = (v: boolean) => {
    state.isLoading = v;
  };

  const toggleError = (error: null | APIError) => {
    state.appError = error;
  };

  const showError = (error: APIError) => {
    toast({
      variant: "destructive",
      title: error.statusCode + "",
      description: error.message ? error.message : error.statusMessage,
    });
  };

  const showMessage = (content: {
    title: string;
    description?: string;
    variant: "destructive" | "default" | null | undefined;
  }) => {
    toast({
      variant: content.variant,
      title: content.title,
      description: content.description,
    });
  };

  return {
    isLoading,
    isAlertModalOpen,
    appError,
    showError,
    showMessage,
    toggleError,
    toggleLoading,
    toggleAlertModal,
  };
};

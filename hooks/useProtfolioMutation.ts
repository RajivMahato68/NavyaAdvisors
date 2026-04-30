import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addStock,
  deleteStock,
  updateStock,
} from "@/services/api/portfolioApi";
import { showToast } from "@/app/utils/toasts";


export const usePortfolioActions = () => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: ["portfolio"],
    });
  };

  //  ADD STOCK
  const add = useMutation({
    mutationFn: addStock,
    onSuccess: () => {
      invalidate();
      showToast.success("Stock added successfully");
    },
    onError: () => {
      showToast.error("Failed to add stock");
    },
  });

  //  DELETE STOCK
  const remove = useMutation({
    mutationFn: deleteStock,
    onSuccess: () => {
      invalidate();
      showToast.success("Stock deleted successfully");
    },
    onError: () => {
      showToast.error("Failed to delete stock");
    },
  });

  //  UPDATE STOCK
  const update = useMutation({
    mutationFn: updateStock,
    onSuccess: () => {
      invalidate();
      showToast.success("Stock updated successfully");
    },
    onError: () => {
      showToast.error("Failed to update stock");
    },
  });

  return {
    addStock: add.mutate,
    deleteStock: remove.mutate,
    updateStock: update.mutate,
  };
};
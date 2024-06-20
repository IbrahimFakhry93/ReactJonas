// we didn't place

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

// this hook into this hooks folder because this one

// is really only for hooks that are reusable

// across multiple features, but this one here

// really is related to the cabin's feature

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    //* or:  mutationFn: deleteCabin,

    //* onSuccess if mutation is successful
    onSuccess: () => {
      toast.success("cabin successfully deleted");
      //* to refetch the data after mutation and update the UI after mutation
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}

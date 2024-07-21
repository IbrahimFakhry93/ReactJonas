import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success(" User account successfully updated");
      //* to update the data manually in the cache so once we upload the image, it updates right away without reloading the page
      queryClient.setQueryData(["user"], user);
      // queryClient.invalidateQueries({ queryKeys: ["user"] }); //! no need
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}

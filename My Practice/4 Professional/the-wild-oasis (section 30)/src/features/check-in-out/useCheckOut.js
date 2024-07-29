import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Check out of booking #${data.id} is Successful`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error("there was error while checking out");
    },
  });

  return { checkOut, isCheckingOut };
}

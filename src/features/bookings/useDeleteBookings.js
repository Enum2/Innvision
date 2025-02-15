import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBookings() {
  const queryClient = useQueryClient();

  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries("bookings");
      toast.success("Booking deleted successfully");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isLoading, isError, error, deleteBooking: mutate };
}

export default useDeleteBookings;

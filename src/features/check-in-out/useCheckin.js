import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast = {} }) => {
      if (!bookingId) {
        throw new Error("Booking ID is missing.");
      }
      return updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      });
    },
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries(["bookings"]); // Adjust query key as needed
      setTimeout(() => navigate("/"), 100); // Delay to ensure state consistency
    },
    onError: (error) => {
      toast.error(error.message || "There was an error while checking in");
    },
  });

  return { checkin, isCheckingIn };
}

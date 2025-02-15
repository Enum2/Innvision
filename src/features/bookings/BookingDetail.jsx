import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useBookings } from "./useBookings";
import { HiArrowDownCircle, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading, error } = useBookings();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { checkout, isCheckingOut } = useCheckout();

  if (isLoading) return <Spinner />;
  if (error || !booking) {
    return (
      <div>
        <p>There was an error loading the booking details.</p>
        <ButtonText onClick={moveBack}>Go Back</ButtonText>
      </div>
    );
  }

  const { status = "unconfirmed", id: bookingId } = booking;
  console.log(booking);

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const handleDelete = async () => {
    try {
      await deleteBooking({ bookingId });
      toast.success("Booking deleted successfully");
      navigate(-1); // Navigate back after successful deletion
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
  };

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            icon={<HiArrowDownCircle />}
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout({ bookingId })}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        {/* Modal for Delete Confirmation */}
        <Modal.Open opens="delete">
          <Button variation="danger">Delete</Button>
        </Modal.Open>

        <Modal.Window name="delete">
          <ConfirmDelete resourceName="booking" onConfirm={handleDelete} />
        </Modal.Window>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Modal>
  );
}

export default BookingDetail;

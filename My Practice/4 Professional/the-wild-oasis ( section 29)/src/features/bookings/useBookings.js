import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  //* Filter:

  const filterValue = searchParams.get("status"); //*
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "totalPrice", value: 6000, method: "gt" }; //* pass this object (filter) to getBookings
  //* Sort

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, isLoading, error };
}

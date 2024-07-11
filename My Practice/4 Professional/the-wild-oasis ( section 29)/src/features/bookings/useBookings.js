import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  //* Filter:

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "totalPrice", value: 6000, method: "gt" }; //* pass this object (filter) to getBookings

  //!=============================================
  //* Sort:

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //!=============================================
  //* Pagination:
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //!=============================================
  const {
    //* use empty object because initially the data is not existed so to avoid undefined error, so concept of using optional chaining
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { bookings, isLoading, error, count };
}

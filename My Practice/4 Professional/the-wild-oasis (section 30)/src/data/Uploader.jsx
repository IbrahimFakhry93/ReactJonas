import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

//^=====================================

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  //* Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object,
  //* it will calculate them on its own. So it might be different for different people,
  //* especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds,
  //* and then replace the original IDs in the booking data with the actual ones from the DB

  //^===================

  //! Fetching Guest and Cabin IDs:
  //* The purpose of this function (createBookings) is to create bookings, which require both a guestId and a cabinId.
  //* Since Supabase generates unique IDs for each object, we can’t predict these IDs in advance.
  //* Therefore, we first fetch all the guest IDs and cabin IDs from the database.
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");

  console.log(guestsIds); //* [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  //* 0: {id: 64}

  //! Mapping IDs:
  //* We extract the actual IDs from the fetched data.
  //* guestsIds and cabinsIds contain arrays of objects with an id property.
  //* We create two arrays: allGuestIds and allCabinIds, containing only the extracted IDs.
  const allGuestIds = guestsIds.map((guest) => guest.id);
  console.log(allGuestIds); //* [64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93]

  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id"); //* sorting them by default ascending

  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  //^==========
  const finalBookings = bookings.map((booking) => {
    //^ open: data-bookings
    //^ open: data-cabins

    // Here relying on the order of cabins, as they don't have an ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    //* We need to get the cabin so we can get later the price for each booking
    //* (-1) because the array is zero indexed.

    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    //! Determine the booking status based on the start and end dates.
    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      //! return for the map method callback function
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  //^==========
  console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

//^=====================================

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;

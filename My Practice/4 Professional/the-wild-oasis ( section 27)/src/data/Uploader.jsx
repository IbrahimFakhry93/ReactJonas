import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import { supabaseUrl } from "../services/supabase";
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

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

// async function createCabins() {
//   const { error } = await supabase.from("cabins").insert(cabins);
//   if (error) console.log(error.message);
// }

// async function createCabins() {
//   // Upload images and get their URLs
//   const cabinsWithImageUrls = await Promise.all(
//     cabins.map(async (cabin) => {
//       const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll(
//         "/",
//         ""
//       );
//       console.log(cabin.image);
//       const { error: storageError } = await supabase.storage
//         .from("cabins-images") // Use your storage bucket name
//         .upload(imageName, cabin.image);

//       if (storageError) {
//         await supabase.from("cabins").delete().eq("id", cabin.id); //* the data that we received from supabase will already contain the new ID

//         console.error(storageError);
//         throw new Error(
//           "Cabin image could not be upload and cabin wasn't created"
//         );
//       }
//     })
//   );
//   console.log(cabinsWithImageUrls);
//   // Insert cabins with image URLs
//   const { error: insertError } = await supabase
//     .from("cabins")
//     .insert(cabinsWithImageUrls);
//   if (insertError) {
//     console.error("Error inserting cabins:", insertError.message);
//   } else {
//     console.log("Cabins inserted successfully");
//   }
// }

// async function createCabins() {
//   try {
//     const cabinsWithImageUrls = await Promise.all(
//       cabins.map(async (cabin) => {
//         const imageName = `${Math.random()}-${cabin.image}`.replaceAll("/", "");
//         const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

//         cabin.image = imageUrl;
//         console.log(cabin.image);
//         const { error: storageError } = await supabase.storage
//           .from("cabins-images")
//           .upload(imageName, cabin.image);

//         if (storageError) {
//           await supabase.from("cabins").delete().eq("id", cabin.id);
//           console.error(storageError);
//           throw new Error(
//             "Cabin image could not be uploaded, and cabin wasn't created"
//           );
//         }

//         return cabin; // Return the cabin object with the updated image URL
//       })
//     );

//     const { error: insertError } = await supabase
//       .from("cabins")
//       .insert(cabinsWithImageUrls);
//     if (insertError) {
//       console.error("Error inserting cabins:", insertError.message);
//     } else {
//       console.log("Cabins inserted successfully");
//     }
//   } catch (e) {
//     console.error("An error occurred:", e.message);
//   }
// }

async function createCabins(cabins) {
  try {
    const createdCabins = [];

    for (const newCabin of cabins) {
      const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
      );
      const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

      // Create Cabin
      const { data, error } = await supabase
        .from("cabins")
        .insert([{ ...newCabin, image: imagePath }])
        .select();

      if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
      }

      // Upload image
      const { error: storageError } = await supabase.storage
        .from("cabins-images")
        .upload(imageName, newCabin.image);

      // Delete the cabin if there was an error uploading the image
      if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
          "Cabin image could not be uploaded, and cabin wasn't created"
        );
      }

      createdCabins.push(data);
    }

    console.log("All cabins created successfully:", createdCabins);
    return createdCabins;
  } catch (e) {
    console.error("An error occurred:", e.message);
    throw e;
  }
}

// Usage example:
const cabinsToCreate = [
  // Array of cabins here...
];

createCabins(cabinsToCreate);

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((cabin) => cabin.id);
  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

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

  // console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

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
    await createCabins(cabins);
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

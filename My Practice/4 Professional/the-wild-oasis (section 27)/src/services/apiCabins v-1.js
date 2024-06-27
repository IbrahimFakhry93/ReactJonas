import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  //* this line of code from supabase API Docs
  const { data, error } = await supabase.from("cabins").select("*");

  //* error handling by Jonas
  if (error) {
    console.error(error);
    throw new Error("error in supa");
  }

  return data;
}

// So from the supabase client

// we can now create queries with the from method.

// And so then we specify the name

// of the table and then the fields that we want.

// And so here we want basically all of them.
// So from the supabase client

// we can now create queries with the from method.

// And so then we specify the name

// of the table and then the fields that we want.

// And so here we want basically all of them.

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  ); //*  remove the slash: because if this cabin name contains any slashes, then super base will create folders based on that.

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`; //* cabins-images: name of the bucket
  //* imagePath url form, we get from the url in the created bucket in Supabase then we make it generic as above

  //~ 1. Create Cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //~ 2. Upload image:

  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image); //* newCabin.image is the actual image

  //~ 3. Delete the cabin from supaBase data if there was an error uploading the image
  //! prevent a new cabin from being created in case that this file actually didn't upload correctly.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id); //* the data that we received from supabase will already contain the new ID

    console.error(storageError);
    throw new Error("Cabin image could not be upload and cabin wasn't created");
  }
  return data;
}

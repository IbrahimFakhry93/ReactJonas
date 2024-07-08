import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("error in supa");
  }

  return data;
}

//* From the supabase client (supabase)
//* we can now create queries with the from method (.from("cabins"))
//* And then we specify the name of the table (cabins)
//* and then the fields that we want and so we want all of them (select("*"))

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);

  const imageName = `${Math.random()}-${newCabin.image?.name}`?.replaceAll(
    "/",
    ""
  ); //*  remove the slash: because if this cabin name contains any slashes, then super base will create folders based on that.

  console.log(imageName);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;
  //* cabins-images: name of the bucket
  //* imagePath url form, we get from the url in the created bucket in Supabase then we make it generic as above

  //~ 1. Create / Edit Cabin

  //* create query and attach to rest of methods
  //* It's a commonly used technique  when we want to reuse parts of the query.
  let query = supabase.from("cabins");

  //! A) Create Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //! B) Edit Cabin
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  //! add select and single
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //~ 2. Upload image:
  //* if image already has a path (has already been uploaded)
  //* so no need to upload again.
  //* so add this:
  if (hasImagePath) return data;

  //? code to upload image to bucket storage in Supabase
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image); //* newCabin.image is the actual image

  //* 3. Delete the cabin if there was an error uploading the image
  //! prevent a new cabin from being created in case that this file actually didn't upload correctly.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id); //* data that we received from supabase will already contain the new ID

    console.error(storageError);
    throw new Error("Cabin image could not be upload and cabin wasn't created");
  }
  return data;
}

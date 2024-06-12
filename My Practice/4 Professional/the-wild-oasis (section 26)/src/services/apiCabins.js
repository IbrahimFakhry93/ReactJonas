import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

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

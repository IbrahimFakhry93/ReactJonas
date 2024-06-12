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
// And so supabase.from("cabins").select("*") returns a promise which we then await.

// And the result of that

// gives us the data and a possible error.

// So if there is no error, then we simply return that data.

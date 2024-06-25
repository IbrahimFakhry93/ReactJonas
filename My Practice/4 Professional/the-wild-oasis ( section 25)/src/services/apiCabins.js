import supabase from "./supabase";

export async function getCabins() {
  //* copy this code from all rows
  const { data, error } = await supabase.from("cabins").select("*");

  //* error handling is added by jonas
  if (error) {
    console.error(error);
    throw new Error("error in supa");
  }

  return data;
}

//* So from the supabase client
//* we can now create queries with the from method.
//* And so then we specify the name of the table and then the fields that we want.
//* And so here we want basically all of them And so select("*")
//* And supabase.from("cabins").select("*") returns a promise which we then await.
//* And the result of that gives us the data and a possible error.
//* So if there is no error, then we simply return that data.

import supabase from "./supabase";

export async function signup({ email, password, fullName }) {
  console.log("signup");
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}

//* we manage these states (data) using ReactQuery

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  // console.log(data);
  return data;
}

export async function getCurrentUser() {
  //* check if there is an active session
  //* It will get access from local storage
  // console.log("hello");
  // const { data: session } = await supabase.auth.getSession();
  // console.log(session);
  // if (!session.session) return null;  //! return null if there is no logged in user

  //* we get the user from the session instead of using getUser as follows
  //* but it's a bit secure to redownload everything from supabase
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  // console.log(data?.user);
  return data?.user;
}

//* no need to return any data
//* as always we will call logout using react query
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

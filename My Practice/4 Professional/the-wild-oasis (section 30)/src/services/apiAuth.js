import supabase, { supabaseUrl } from "./supabase";

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
  console.log(data);
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
  //* but it's a bit secure to re-download everything from supabase
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

//* consume this function in another custom hook
export async function updateCurrentUser({ fullName, password, avatar }) {
  //* 1. Update password or FullName (we can never update both at the same time
  //* because they are located here in different forms (UpdatePasswordForm - UpdateUserDataForm) )

  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (!avatar) return data; //* if there is no avatar, return the data

  //* 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  //* 3. Update avatar in the user
  //* add the url added to the uploaded image
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}

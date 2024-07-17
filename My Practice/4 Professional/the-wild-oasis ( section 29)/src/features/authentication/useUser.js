// this function will basically get the current user

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

// and store it into cache.

// And so then, it will not have to be redownloaded

// each time that it's necessary.

// export function useUser() {
//   const { isLoading, data: user } = useQuery({
//     queryKey: ["user"],
//     queryFn: getCurrentUser,
//   });

//   console.log(user);
//   return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
// }

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  console.log(user);

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}

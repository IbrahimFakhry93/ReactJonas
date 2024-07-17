import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      loginApi({ email, password });
    },
    onSuccess: (user) => {
      console.log(user);
      queryClient.setQueryData(["user"], user); //* set data in the query cache
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });
  return { login, isLoading };
}

//* err is the same error.message in login in apiAuth
//* user in onSuccess is the data received (returned) from login function in apiAuth

//* onSuccess received the data returned from mutate function (ex. login) as input in its arrow function

//*

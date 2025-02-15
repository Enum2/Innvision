import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onError: () => toast.error("provided credentials are invalid"),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user", user]);
      navigate("/dashboard");
    },
  });
  return { login: mutate, isLoading };
}

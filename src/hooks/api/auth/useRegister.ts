"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await axiosInstance.post("/auth/register", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("register success");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useRegister;

// const useRegister = () => {
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     const handleRegister = async(payload) =< {
//         try {
//             const { data } = await axios.post("http://localhost:8000", payload)
//             toast.success("Register Success");
//         } catch (error) {
//             console.log(error);

//         } finally {
//             setIsLoading(false)
//         }
//     }
//   return { handleRe};
// };
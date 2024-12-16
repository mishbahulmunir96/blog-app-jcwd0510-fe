"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useAxios from "../useAxios";
import { useRouter } from "next/navigation";

interface createBlogPayload {
  title: string;
  category: string;
  description: string;
  content: string;
  thumbnail: File | null;
}

const useCreateBlog = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: createBlogPayload) => {
      const createBlogForm = new FormData();

      createBlogForm.append("title", payload.title);
      createBlogForm.append("category", payload.category);
      createBlogForm.append("description", payload.description);
      createBlogForm.append("content", payload.content);
      createBlogForm.append("thumbnail", payload.thumbnail!);

      const { data } = await axiosInstance.post("/blogs", payload);
      return data;
    },
    onSuccess: async (data) => {
      toast.success("create blog success");
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useCreateBlog;

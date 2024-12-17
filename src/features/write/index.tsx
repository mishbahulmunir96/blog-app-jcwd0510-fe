"use client";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateBlog from "@/hooks/api/blog/useCreateBlog";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

const WritePage = () => {
  const { mutateAsync: createBlog, isPending } = useCreateBlog();

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      content: "",
      thumbnail: null,
    },
    onSubmit: async (values) => {
      console.log(values);

      await createBlog(values);
    },
  });

  const [selectedImage, setSelectedImage] = useState("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const onCangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeThumbnail = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  return (
    <main className="container mx-auto max-w-5xl px-4">
      <form
        action=""
        className="mt-10 space-y-2"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            type="text"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {!!formik.touched.title && !!formik.errors.title ? (
            <p className="text-xs text-red-500">{formik.errors.title}</p>
          ) : null}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">Category</Label>
          <Input
            name="category"
            type="text"
            placeholder="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {!!formik.touched.category && !!formik.errors.category ? (
            <p className="text-xs text-red-500">{formik.errors.category}</p>
          ) : null}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">Description</Label>
          <Textarea
            name="description"
            placeholder="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={4}
            style={{ resize: "none" }}
          />

          {!!formik.touched.description && !!formik.errors.description ? (
            <p className="text-xs text-red-500">{formik.errors.description}</p>
          ) : null}
        </div>

        <RichTextEditor
          label="Content"
          value={formik.values.content}
          onChange={(value: string) => formik.setFieldValue("content", value)}
          isError={!!formik.errors.content}
        />

        {selectedImage && (
          <div>
            <div className="relative h-[150px] w-[200px]">
              <Image
                src={selectedImage}
                alt="thumbnail"
                className="object-cover"
                fill
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={removeThumbnail}
            >
              Remove
            </Button>
          </div>
        )}

        <div className="flex flex-col space-y-1.5">
          <Label>Thumbnail</Label>
          <Input
            ref={thumbnailRef}
            type="file"
            accept="image/*"
            onChange={onCangeThumbnail}
          />
        </div>

        <div className="flex justify-center">
          <Button type="submit" className="my-10" disabled={isPending}>
            {isPending ? "loading" : "submit"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default WritePage;

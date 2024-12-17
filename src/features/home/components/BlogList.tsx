"use client";

import useGetBlogs from "@/hooks/api/blog/useGetBlogs";
import React, { useState } from "react";
import BlogCard from "./BlogCard";
import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import { parseAsInteger, useQueryState } from "nuqs";

const BlogList = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  const [debouncedValue] = useDebounceValue(search, 500);

  const { data, isPending } = useGetBlogs({ page, search: debouncedValue });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <Input
        className="mx-auto my-4 max-w-xl"
        placeholder="search..."
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        value={search}
      ></Input>

      {isPending && (
        <div className="flex h-[350px] items-center justify-center">
          <h1 className="text-center">Loading...</h1>
        </div>
      )}

      {!data?.data.length ? (
        <div className="flex h-[350px] items-center justify-center">
          <h1 className="text-center">No Data</h1>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {data?.data.map((blog, index) => {
              return <BlogCard key={index} blog={blog} />;
            })}
          </div>

          <PaginationSection
            onChangePage={onChangePage}
            page={page}
            take={data.meta.take}
            total={data.meta.total}
          />
        </>
      )}
    </>
  );
};

export default BlogList;

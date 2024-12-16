import BlogDeatilPage from "@/features/blog/BlogDeatilPage";
import React from "react";

const BlogDetail = ({ params }: { params: { id: string } }) => {
  return <BlogDeatilPage blogId={Number(params.id)} />;
};

export default BlogDetail;

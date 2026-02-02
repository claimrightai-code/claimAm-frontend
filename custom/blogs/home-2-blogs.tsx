import React from "react";
import Link from "next/link";
import blog_data from "@/data/blog-data";
import BlogItemTwo from "./blog-item/blog-item-two";

const HomeTwoBlogs = () => {
  const blog_item = blog_data.filter((b) => b.page === "home");
  return (
    <div className="blog-section-one position-relative mt-150 lg-mt-80 pt-120 lg-pt-80">
      <div className="container">
       
      </div>
    </div>
  );
};

export default HomeTwoBlogs;

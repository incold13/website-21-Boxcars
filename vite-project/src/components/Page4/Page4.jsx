import React from "react";
import "./Page4.scss";
import Blog_sect1 from "./blog_sect1/blog_sect1.jsx";
import List_sect3 from "../Page2/list_sect3/list_sect3.jsx";

export default function Page4() {
  return (
    <div className="page4_wrapper">
      <div className="page4_white_block">
        <div className="page4_top_spacer" />
        <Blog_sect1 />
        <div className="page4_bottom_spacer" />
      </div>
      <List_sect3 />
    </div>
  );
}
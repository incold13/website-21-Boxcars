import React from "react";
import "./Page1.scss";
import Hero_sect1 from "./Hero_sect1/Hero_sect1.jsx";
import Hero_sect2 from "./Hero_sect2/Hero_sect2.jsx";
import Hero_sect3 from "./Hero_sect3/Hero_sect3.jsx";
import Hero_sect4 from "./Hero_sect4/Hero_sect4.jsx";
import Hero_sect5 from "./Hero_sect5/Hero_sect5.jsx";
import Hero_sect6 from "./Hero_sect6/Hero_sect6.jsx";
import Hero_sect7 from "./Hero_sect7/Hero_sect7.jsx";
import Hero_sect8 from "./Hero_sect8/Hero_sect8.jsx";
import Hero_sect9 from "./Hero_sect9/Hero_sect9.jsx";
import Hero_sect10 from "./Hero_sect10/Hero_sect10.jsx";

export default function Page1() {
  return (
    <div className="page1">
      <main className="page1_main">
        <Hero_sect1 />
        <Hero_sect2 />
        <Hero_sect3 />
        <Hero_sect4 />
        <Hero_sect5 />
        <Hero_sect6 />
        <Hero_sect7 />
        <Hero_sect8 />
        <Hero_sect9 />
        <Hero_sect10 />
      </main>
    </div>
  );
}

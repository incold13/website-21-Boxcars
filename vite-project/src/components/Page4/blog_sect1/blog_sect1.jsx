import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./blog_sect1.scss";
import { Photo } from "../../../photo.js";

const blogPostsPage1 = [
  {
    id: 1,
    image: Photo.p2_car8_660x440,
    badge: "Sound",
    author: "Admin",
    date: "November 22, 2023",
    title: "2024 BMW ALPINA XB7 with exclusive details, extraordinary",
  },
  {
    id: 2,
    image: Photo.p2_car19_660x440,
    badge: "Accessories",
    author: "Admin",
    date: "November 22, 2023",
    title: "BMW X6 M50i is designed to exceed your sportiest.",
  },
  {
    id: 3,
    image: Photo.p2_car14_660x440,
    badge: "Exterior",
    author: "Admin",
    date: "November 22, 2023",
    title: "BMW X5 Gold 2024 Sport Review: Light on Sport",
  },
  {
    id: 4,
    image: Photo.p2_car13_660x440,
    badge: "Body Kit",
    author: "Admin",
    date: "November 22, 2023",
    title: "2024 Kia Sorento Hybrid Review: Big Vehicle With Small-Vehicle",
  },
  {
    id: 5,
    image: Photo.p2_car5_660x440,
    badge: "Fuel Systems",
    author: "Admin",
    date: "November 22, 2023",
    title: "2024 Audi Hybrid gives up nothing with its optimized",
  },
  {
    id: 6,
    image: Photo.p2_car12_660x440,
    badge: "Exterior",
    author: "Admin",
    date: "November 22, 2023",
    title: "2024 BMW X3 M Sport Seats – available as a standalone option",
  },
  {
    id: 7,
    image: Photo.p2_car9_660x440,
    badge: "Body Kit",
    author: "Admin",
    date: "November 22, 2023",
    title: "2023 Carnival Standard blind-spot & forward collision avoidance",
  },
  {
    id: 8,
    image: Photo.p2_car1_660x440,
    badge: "Sound",
    author: "Admin",
    date: "September 19, 2023",
    title: "Golf vs Polo: A Comparison of Two Volkswagen Classics",
  },
  {
    id: 9,
    image: Photo.p2_car6_660x440,
    badge: "Oil & Filters",
    author: "Admin",
    date: "September 19, 2023",
    title: "Battle of the SUVs – Kia Sportage vs Hyundai Tucson",
  },
];

const blogPostsPage2 = [
  {
    id: 10,
    image: Photo.p2_car3_660x440,
    badge: "Sound",
    author: "Admin",
    date: "September 15, 2023",
    title: "Electric Vehicle Battery Lifespan: Everything You Need to Know",
  },
  {
    id: 11,
    image: Photo.p2_car11_660x440,
    badge: "Exterior",
    author: "Admin",
    date: "September 10, 2023",
    title: "Top 10 Most Reliable Used Luxury Sedans Under Fifty Thousand",
  },
  {
    id: 12,
    image: Photo.p2_car17_660x440,
    badge: "Accessories",
    author: "Admin",
    date: "September 05, 2023",
    title: "Essential Winter Car Care Tips to Protect Your Engine & Paint",
  },
];

export default function Blog_sect1() {
  const [currentPage, setCurrentPage] = useState(1);

  const posts = currentPage === 1 ? blogPostsPage1 : blogPostsPage2;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="blog_sect1">
      <div className="blog_sect1_header">
        <div className="blog_sect1_breadcrumbs">
          <Link to="/" className="blog_sect1_crumb_link">
            Home
          </Link>
          <span className="blog_sect1_crumb_sep"> / </span>
          <span className="blog_sect1_crumb_current">Blog</span>
        </div>
        <h1 className="blog_sect1_title">Blog</h1>
      </div>

      <div className="blog_sect1_grid">
        {posts.map((post) => (
          <article key={post.id} className="blog_sect1_card">
            <div className="blog_sect1_img_box">
              <img
                src={post.image}
                alt={post.title}
                className="blog_sect1_img"
              />
              <span className="blog_sect1_badge">{post.badge}</span>
            </div>
            <div className="blog_sect1_meta">
              <span className="blog_sect1_author">{post.author}</span>
              <span className="blog_sect1_dot">•</span>
              <span className="blog_sect1_date">{post.date}</span>
            </div>
            <h2 className="blog_sect1_card_title">{post.title}</h2>
          </article>
        ))}
      </div>

      <div className="blog_sect1_pagination">
        <button
          type="button"
          className={`blog_sect1_page_btn ${currentPage === 1 ? "active" : ""}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
        <button
          type="button"
          className={`blog_sect1_page_btn ${currentPage === 2 ? "active" : ""}`}
          onClick={() => handlePageChange(2)}
        >
          2
        </button>
        <button
          type="button"
          className="blog_sect1_next_btn"
          onClick={() => handlePageChange(currentPage === 1 ? 2 : 1)}
          aria-label="Next page"
        >
          <svg
            className="blog_sect1_next_icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
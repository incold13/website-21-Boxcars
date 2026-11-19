import React from "react";
import "./Hero_sect8.scss";
import { Photo } from "../../../photo.js";

const blogPosts = [
  {
    id: 1,
    image: Photo.p1_s8_detail_post_qgcqjbpfnsa2eljzsmpa5fzwhwfyhukx3izjwiox88,
    badge: "Sound",
    author: "Admin",
    date: "November 22, 2023",
    title: "2024 BMW ALPINA XB7 with exclusive details, extraordinary",
  },
  {
    id: 2,
    image: Photo.p1_s8_blog7_qgcqjcn9umbcq7imn53wpxrd3abbpjonfnn1dsnj20,
    badge: "Accessories",
    author: "Admin",
    date: "November 22, 2023",
    title: "BMW X6 M50i is designed to exceed your sportiest.",
  },
  {
    id: 3,
    image: Photo.p1_s8_blog9_qgcqjcn9umbcq7imn53wpxrd3abbpjonfnn1dsnj20,
    badge: "Exterior",
    author: "Admin",
    date: "November 22, 2023",
    title: "BMW X5 Gold 2024 Sport Review: Light on Sport",
  },
];

export default function Hero_sect8() {
  return (
    <section className="sect8">
      <div className="sect8_all">
        <div className="sect8_header">
          <h2 className="sect8_title">Latest Blog Posts</h2>
          <button className="sect8_view_all_btn">
            <span className="sect8_view_all_text">View All</span>
            <img
              className="sect8_view_all_arrow"
              src={Photo.p1_s4_arrow_diag}
              alt="View All"
            />
          </button>
        </div>

        <div className="sect8_cards">
          {blogPosts.map((post) => (
            <article className="sect8_card" key={post.id}>
              <div
                className="sect8_card_img_box"
                style={{ backgroundImage: `url(${post.image})` }}
              >
                <div className="sect8_card_badge_bar">
                  <span className="sect8_badge">{post.badge}</span>
                </div>
              </div>

              <div className="sect8_card_info">
                <div className="sect8_meta">
                  <span className="sect8_author">{post.author}</span>
                  <span className="sect8_dot">•</span>
                  <span className="sect8_date">{post.date}</span>
                </div>
                <h3 className="sect8_card_title">{post.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

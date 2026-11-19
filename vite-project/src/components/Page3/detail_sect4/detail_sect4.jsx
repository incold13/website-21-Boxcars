import React, { useState } from "react";
import "./detail_sect4.scss";
import { Photo } from "../../../photo.js";

export default function Detail_sect4() {
  const [reviews, setReviews] = useState([
    {
      author: "Demo",
      date: "November 30, 2023",
      avatar: Photo.p3_team2_150x150,
      score: "4.8",
      text: "Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis,",
    },
  ]);

  const [formRatings, setFormRatings] = useState({
    comfort: 5,
    exterior: 5,
    performance: 5,
    interior: 5,
    value: 5,
    reliability: 5,
  });

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formReview, setFormReview] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  const ratingSummaryCol1 = [
    { name: "Comfort", score: 5.0, label: "Perfect" },
    { name: "Exterior Styling", score: 4.0, label: "Good" },
    { name: "Performance", score: 5.0, label: "Perfect" },
  ];

  const ratingSummaryCol2 = [
    { name: "Interior Design", score: 5.0, label: "Perfect" },
    { name: "Value For The Money", score: 5.0, label: "Perfect" },
    { name: "Reliability", score: 5.0, label: "Perfect" },
  ];

  const ratingCategoriesCol1 = [
    { id: "comfort", name: "Comfort" },
    { id: "exterior", name: "Exterior Styling" },
    { id: "performance", name: "Performance" },
  ];

  const ratingCategoriesCol2 = [
    { id: "interior", name: "Interior Design" },
    { id: "value", name: "Value For The Money" },
    { id: "reliability", name: "Reliability" },
  ];

  const handleRatingChange = (catId, starIndex) => {
    setFormRatings((prev) => ({ ...prev, [catId]: starIndex }));
  };

  const handleSubmitReview = () => {
    if (!formReview.trim()) {
      alert("Please enter a review message.");
      return;
    }

    const avgScore = (
      Object.values(formRatings).reduce((a, b) => a + b, 0) / 6
    ).toFixed(1);

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const newRev = {
      author: formName.trim() || "User",
      date: formattedDate,
      avatar: Photo.p3_team2_150x150,
      score: avgScore,
      text: formReview.trim(),
    };

    setReviews([newRev, ...reviews]);
    setFormReview("");
    setFormName("");
    setFormEmail("");
    alert("Thank you for your review!");
  };

  const circleRadius = 48;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const overallScore = 4.0;
  const strokeOffset = circleCircumference * (1 - overallScore / 5.0);

  return (
    <div className="detail_sect4">
      <div className="detail_sect4_divider" />

      <div className="detail_sect4_header">
        <h2 className="detail_sect4_title">
          {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
        </h2>
      </div>

      <div className="detail_sect4_summary_box">
        <div className="detail_sect4_chart_box">
          <svg className="detail_sect4_circle_svg" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={circleRadius}
              className="detail_sect4_circle_bg"
              strokeWidth="7"
            />
            <circle
              cx="60"
              cy="60"
              r={circleRadius}
              className="detail_sect4_circle_fg"
              strokeWidth="7"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeOffset}
            />
          </svg>
          <div className="detail_sect4_circle_text">
            <span className="detail_sect4_circle_sub">Overral Rating</span>
            <span className="detail_sect4_circle_num">{overallScore.toFixed(1)}</span>
            <span className="detail_sect4_circle_out">Out of 5</span>
          </div>
        </div>

        <div className="detail_sect4_categories_grid">
          <div className="detail_sect4_categories_col">
            {ratingSummaryCol1.map((item, idx) => (
              <div key={idx} className="detail_sect4_cat_item">
                <div className="detail_sect4_cat_top">
                  <span className="detail_sect4_cat_title">{item.name}</span>
                  <div className="detail_sect4_cat_score">
                    <img
                      src={Photo.detail_star_blue}
                      alt=""
                      className="detail_sect4_star_icon"
                    />
                    <span>{item.score.toFixed(1)}</span>
                  </div>
                </div>
                <span className="detail_sect4_cat_desc">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="detail_sect4_categories_col">
            {ratingSummaryCol2.map((item, idx) => (
              <div key={idx} className="detail_sect4_cat_item">
                <div className="detail_sect4_cat_top">
                  <span className="detail_sect4_cat_title">{item.name}</span>
                  <div className="detail_sect4_cat_score">
                    <img
                      src={Photo.detail_star_blue}
                      alt=""
                      className="detail_sect4_star_icon"
                    />
                    <span>{item.score.toFixed(1)}</span>
                  </div>
                </div>
                <span className="detail_sect4_cat_desc">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="detail_sect4_review_list">
        {reviews.map((rev, idx) => (
          <div key={idx} className="detail_sect4_rev_card">
            <div className="detail_sect4_rev_header">
              <img src={rev.avatar} alt="" className="detail_sect4_rev_avatar" />
              <div className="detail_sect4_rev_user_info">
                <span className="detail_sect4_rev_author">{rev.author}</span>
                <span className="detail_sect4_rev_date">{rev.date}</span>
              </div>
            </div>
            <div className="detail_sect4_rev_stars_row">
              {[1, 2, 3, 4, 5].map((star) => (
                <img
                  key={star}
                  src={Photo.detail_star_blue}
                  alt=""
                  className="detail_sect4_star_icon"
                />
              ))}
              <span className="detail_sect4_rev_score">{rev.score}</span>
            </div>
            <p className="detail_sect4_rev_body">{rev.text}</p>
          </div>
        ))}
      </div>

      <div className="detail_sect4_divider" />

      <div className="detail_sect4_form_block">
        <h3 className="detail_sect4_form_heading">Add a review</h3>

        <div className="detail_sect4_ratings_grid">
          <div className="detail_sect4_ratings_col">
            {ratingCategoriesCol1.map((cat) => (
              <div key={cat.id} className="detail_sect4_rating_row">
                <span className="detail_sect4_rating_name">{cat.name}</span>
                <div className="detail_sect4_interactive_stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <img
                      key={s}
                      src={
                        s <= formRatings[cat.id]
                          ? Photo.detail_star_blue
                          : Photo.detail_star_gray
                      }
                      alt=""
                      className="detail_sect4_click_star"
                      onClick={() => handleRatingChange(cat.id, s)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="detail_sect4_ratings_col">
            {ratingCategoriesCol2.map((cat) => (
              <div key={cat.id} className="detail_sect4_rating_row">
                <span className="detail_sect4_rating_name">{cat.name}</span>
                <div className="detail_sect4_interactive_stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <img
                      key={s}
                      src={
                        s <= formRatings[cat.id]
                          ? Photo.detail_star_blue
                          : Photo.detail_star_gray
                      }
                      alt=""
                      className="detail_sect4_click_star"
                      onClick={() => handleRatingChange(cat.id, s)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail_sect4_inputs_grid">
          <div className="detail_sect4_field_box">
            <span className="detail_sect4_field_label">Name</span>
            <input
              type="text"
              className="detail_sect4_field_input"
              placeholder="Ali..."
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>
          <div className="detail_sect4_field_box">
            <span className="detail_sect4_field_label">Email</span>
            <input
              type="email"
              className="detail_sect4_field_input"
              placeholder="Example..."
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
            />
          </div>
        </div>

        <label className="detail_sect4_checkbox_row">
          <input
            type="checkbox"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
            className="detail_sect4_checkbox"
          />
          <span className="detail_sect4_checkbox_text">
            Save my name, email, and website in this browser for the next time I comment.
          </span>
        </label>

        <div className="detail_sect4_field_box detail_sect4_textarea_box">
          <span className="detail_sect4_field_label">Review</span>
          <textarea
            className="detail_sect4_field_textarea"
            value={formReview}
            onChange={(e) => setFormReview(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="detail_sect4_submit_btn"
          onClick={handleSubmitReview}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
import { useState } from "react";
import "./list_sect3.scss";

export default function List_sect3() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="list_sect3">
      <div className="list_sect3_all">
        <div className="list_sect3_left">
          <h2 className="list_sect3_title">Join BoxCar</h2>
          <p className="list_sect3_sub">
            {isSubscribed
              ? "Thank you for subscribing to BoxCar updates!"
              : "Receive pricing updates, shopping tips & more!"}
          </p>
        </div>

        <form className="list_sect3_form" onSubmit={handleSubmit}>
          <div className="list_sect3_input_spacer_left" />
          <input
            className="list_sect3_input"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="list_sect3_btn" type="submit">
            <span className="list_sect3_btn_text">Sign Up</span>
          </button>
          <div className="list_sect3_btn_spacer_right" />
        </form>
      </div>
    </section>
  );
}
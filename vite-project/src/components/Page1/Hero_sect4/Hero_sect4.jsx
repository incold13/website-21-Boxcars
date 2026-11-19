import { useState, useEffect } from "react";
import "./Hero_sect4.scss";
import { Photo } from "../../../photo.js";
import { fetchCars } from "../../../api/carsApi.js";

const tabs = ["In Stock", "Sedan", "SUV", "Convertible"];

const defaultCars = [
  {
    id: 10,
    image: Photo.p1_s3_car9_660x440,
    badge: null,
    title: "T-Cross – 2023",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AW...",
    miles: "15 Miles",
    fuel: "Petrol",
    transmission: "CVT",
    oldPrice: null,
    price: "$15,000",
    body: "SUV",
  },
  {
    id: 13,
    image: Photo.p1_s3_car10_660x440,
    badge: { text: "Great Price", type: "green" },
    title: "BMW X8 – 5.0",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AW...",
    miles: "100 Miles",
    fuel: "Hybrid",
    transmission: "CVT",
    oldPrice: null,
    price: "$12,000",
    body: "Sedan",
  },
  {
    id: 7,
    image: Photo.p1_s3_car11_660x440,
    badge: { text: "Sale", type: "blue" },
    title: "Ranger Black – 2021",
    subtitle: "2.0 D5 PowerPulse Momentum 5dr AW...",
    miles: "250 Miles",
    fuel: "Petrol",
    transmission: "Manual",
    oldPrice: "$180,000",
    price: "$165,000",
    body: "Sedan",
  },
  {
    id: 6,
    image: Photo.p1_s3_car20_660x440,
    badge: { text: "Sale", type: "blue" },
    title: "Audi A4 – 2022",
    subtitle: "2.0 D5 PowerPulse Momentum 5dr AW...",
    miles: "150 Miles",
    fuel: "Diesel",
    transmission: "CVT",
    oldPrice: null,
    price: "$120,000",
    body: "SUV",
  },
];

function resolveCarPhoto(car) {
  if (!car) return Photo.p1_s3_car9_660x440;
  if (car.image && Photo[car.image]) return Photo[car.image];
  if (car.image && typeof car.image === "string" && (car.image.startsWith("/") || car.image.startsWith("data:"))) return car.image;
  const n = (car.title || car.name || "").toLowerCase();
  if (n.includes("t-cross")) return Photo.p1_s3_car9_660x440;
  if (n.includes("bmw") || n.includes("x8")) return Photo.p1_s3_car10_660x440;
  if (n.includes("ranger black")) return Photo.p1_s3_car11_660x440;
  if (n.includes("audi a4")) return Photo.p1_s3_car20_660x440;
  if (n.includes("camry")) return Photo.p2_car8_660x440;
  if (n.includes("c class") || n.includes("mercedes")) return Photo.p1_s6_car14_660x440 || Photo.p2_car8_660x440;
  if (n.includes("ranger white")) return Photo.p1_s6_car19_660x440 || Photo.p2_car19_660x440;
  if (n.includes("explorer") || n.includes("ford explorer")) return Photo.p1_s6_car13_660x440 || Photo.p2_car13_660x440;
  if (n.includes("audi a6")) return Photo.p2_car5_660x440;
  if (n.includes("glc")) return Photo.p2_car6_660x440;
  if (n.includes("transit")) return Photo.p2_car3_660x440;
  if (n.includes("corolla")) return Photo.p2_car17_660x440;
  return Photo.p1_s3_car9_660x440;
}

function getBadgeType(badge) {
  if (!badge) return "";
  const t = (badge.type || "").toLowerCase();
  const txt = (badge.text || "").toLowerCase();
  if (t === "green" || txt.includes("great") || txt.includes("price")) return "sect4_badge_green";
  return "sect4_badge_blue";
}

function formatCarItem(item) {
  return {
    id: item.id,
    image: resolveCarPhoto(item),
    badge: item.badge,
    title: item.name || item.title,
    subtitle: item.subtitle,
    miles: item.quickSpecs?.miles || item.miles || "100 Miles",
    fuel: item.quickSpecs?.fuel || item.fuel || "Petrol",
    transmission: item.quickSpecs?.transmission || item.transmission || "Automatic",
    oldPrice: item.formattedOldPrice || item.oldPrice,
    price: item.formattedPrice || item.price,
    body: item.overview?.body || item.body || "",
  };
}

export default function Hero_sect4() {
  const [activeTab, setActiveTab] = useState("In Stock");
  const [allCars, setAllCars] = useState(defaultCars);
  const [startIndex, setStartIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState({});

  useEffect(() => {
    let isMounted = true;
    fetchCars().then((result) => {
      if (!isMounted || !result.data || result.data.length === 0) return;
      const formatted = result.data.map(formatCarItem);
      const ordered = [...defaultCars];
      formatted.forEach((c) => {
        const titleLower = (c.title || "").toLowerCase();
        const already = ordered.some(
          (o) => (o.title || "").toLowerCase() === titleLower || o.id === c.id
        );
        if (!already) {
          ordered.push(c);
        }
      });
      setAllCars(ordered);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCars = activeTab && activeTab !== "In Stock"
    ? allCars.filter((c) => (c.body || "").toLowerCase() === activeTab.toLowerCase())
    : allCars;

  const currentCars = filteredCars.length > 0 ? filteredCars : allCars;
  const total = currentCars.length;

  const visibleCars = [];
  const count = Math.min(4, total);
  for (let i = 0; i < count; i++) {
    const idx = (startIndex + i) % total;
    visibleCars.push(currentCars[idx]);
  }

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setStartIndex(0);
  };

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="sect4">
      <div className="sect4_all">
        <div className="sect4_header">
          <h2 className="sect4_title">The Most Searched Cars</h2>
        </div>

        <div className="sect4_nav_wrap">
          <div className="sect4_tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`sect4_tab_btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabClick(tab)}
              >
                <span className="sect4_tab_text">{tab}</span>
                {activeTab === tab && <div className="sect4_tab_line" />}
              </button>
            ))}
          </div>
        </div>

        <div className="sect4_cards">
          {visibleCars.map((car) => (
            <div className="sect4_card" key={car.id}>
              <div
                className="sect4_card_img_box"
                style={{ backgroundImage: `url(${car.image})` }}
              >
                <div className="sect4_card_top_bar">
                  {car.badge ? (
                    <div className={`sect4_badge ${getBadgeType(car.badge)}`}>
                      {car.badge.text}
                    </div>
                  ) : (
                    <div className="sect4_badge_placeholder" />
                  )}
                  <button
                    className={`sect4_bookmark_btn ${bookmarked[car.id] ? "active" : ""}`}
                    onClick={() => toggleBookmark(car.id)}
                    aria-label="Bookmark"
                  >
                    <img
                      className="sect4_bookmark_icon"
                      src={Photo.p1_s4_bookmark}
                      alt="Bookmark"
                    />
                  </button>
                </div>
              </div>

              <div className="sect4_card_body">
                <div className="sect4_card_content">
                  <div className="sect4_card_info">
                    <h3 className="sect4_card_title">{car.title}</h3>
                    <p className="sect4_card_subtitle">{car.subtitle}</p>
                  </div>

                  <div className="sect4_divider" />

                  <div className="sect4_specs">
                    <div className="sect4_spec_item">
                      <img
                        className="sect4_spec_icon"
                        src={Photo.p1_s4_speedometer}
                        alt="Miles"
                      />
                      <span className="sect4_spec_text">{car.miles}</span>
                    </div>
                    <div className="sect4_spec_item">
                      <img
                        className="sect4_spec_icon"
                        src={Photo.p1_s4_fuel}
                        alt="Fuel"
                      />
                      <span className="sect4_spec_text">{car.fuel}</span>
                    </div>
                    <div className="sect4_spec_item">
                      <img
                        className="sect4_spec_icon"
                        src={Photo.p1_s4_transmission}
                        alt="Transmission"
                      />
                      <span className="sect4_spec_text">{car.transmission}</span>
                    </div>
                  </div>

                  <div className="sect4_divider" />

                  <div className="sect4_footer">
                    <div className="sect4_price_box">
                      {car.oldPrice && (
                        <span className="sect4_old_price">{car.oldPrice}</span>
                      )}
                      <span className="sect4_price">{car.price}</span>
                    </div>
                    <a
                      href={`/car/${car.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sect4_details_btn"
                    >
                      <span className="sect4_details_text">View Details</span>
                      <img
                        className="sect4_details_arrow"
                        src={Photo.p1_s4_arrow_diag}
                        alt="Arrow"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sect4_pagination">
          <button
            className="sect4_pag_btn"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <img
              className="sect4_pag_arrow"
              src={Photo.p1_s4_arrow_left}
              alt="Previous"
            />
          </button>
          <button
            className="sect4_pag_btn"
            onClick={handleNext}
            aria-label="Next"
          >
            <img
              className="sect4_pag_arrow"
              src={Photo.p1_s4_arrow_right}
              alt="Next"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

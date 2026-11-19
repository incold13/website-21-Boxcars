import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./list_sect2.scss";
import { Photo } from "../../../photo.js";
import { fetchCars } from "../../../api/carsApi.js";

const sortOptions = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Mileage: Low to High", value: "mileage-asc" },
  { label: "Mileage: High to Low", value: "mileage-desc" },
];

function resolveCarPhoto(car) {
  if (!car) return Photo.p2_car8_660x440;
  if (car.image && Photo[car.image]) return Photo[car.image];
  if (car.image && typeof car.image === "string" && (car.image.startsWith("/") || car.image.startsWith("data:"))) {
    return car.image;
  }
  const n = (car.name || car.title || "").toLowerCase();
  if (n.includes("camry")) return Photo.p2_car8_660x440;
  if (n.includes("c-class") && !n.includes("mercedes-benz,")) return Photo.p2_car14_660x440;
  if (n.includes("transit")) return Photo.p2_car13_660x440;
  if (n.includes("glc")) return Photo.p2_car19_660x440;
  if (n.includes("audi a6")) return Photo.p2_car5_660x440;
  if (n.includes("audi a4, 4.5")) return Photo.p2_car6_660x440;
  if (n.includes("ranger black")) return Photo.p2_car11_660x440;
  if (n.includes("mercedes-benz, c class")) return Photo.p2_car12_660x440;
  if (n.includes("ranger white")) return Photo.p2_car3_660x440;
  if (n.includes("t-cross")) return Photo.p2_car9_660x440;
  if (n.includes("corolla")) return Photo.p2_car17_660x440;
  if (n.includes("explorer")) return Photo.p2_car1_660x440;
  if (n.includes("x8") || n.includes("bmw")) return Photo.p1_s3_car10_660x440;
  if (n.includes("audi a4 – 2022")) return Photo.p1_s3_car20_660x440;
  if (n.includes("amg")) return Photo.p1_s4_car1_660x440;
  return Photo.p2_car8_660x440;
}

function getBadgeClass(badge) {
  if (!badge) return "";
  const type = (badge.type || "").toLowerCase();
  const text = (badge.text || "").toLowerCase();
  if (type === "green" || text.includes("great") || text.includes("price")) {
    return "list_sect2_badge_green";
  }
  return "list_sect2_badge_blue";
}

export default function List_sect2({ filters = {} }) {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState({});
  const sortRef = useRef(null);

  const pageSize = 12;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let minPrice = undefined;
    let maxPrice = undefined;
    if (filters.price && filters.price !== "All Prices") {
      if (filters.price.includes("Under")) {
        maxPrice = 20000;
      } else if (filters.price.includes("20,000 – $50,000")) {
        minPrice = 20000;
        maxPrice = 50000;
      } else if (filters.price.includes("50,000 – $100,000")) {
        minPrice = 50000;
        maxPrice = 100000;
      } else if (filters.price.includes("Over")) {
        minPrice = 100000;
      }
    }

    const apiFilters = {
      ...filters,
      minPrice,
      maxPrice,
      sort: selectedSort.value,
    };

    fetchCars(apiFilters).then((res) => {
      if (res && res.data) {
        setCars(res.data);
      }
    });
    setCurrentPage(1);
  }, [filters, selectedSort]);

  const totalResults = cars.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalResults);
  const displayedCars = cars.slice(startIdx, endIdx);

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(1);
    }
  };

  return (
    <section className="list_sect2">
      <div className="list_sect2_all">
        <div className="list_sect2_header">
          <div className="list_sect2_breadcrumbs">
            <Link to="/" className="list_sect2_bc_link">Home</Link>
            <span className="list_sect2_bc_sep">/</span>
            <span className="list_sect2_bc_current">Listing v1</span>
          </div>

          <h1 className="list_sect2_title">Listing v1</h1>

          <div className="list_sect2_controls">
            <div className="list_sect2_results_count">
              Showing {totalResults > 0 ? startIdx + 1 : 0} – {endIdx} of {totalResults} results
            </div>

            <div className="list_sect2_sort_wrap" ref={sortRef}>
              <span className="list_sect2_sort_label">Sort by</span>
              <button
                className="list_sect2_sort_btn"
                onClick={() => setIsSortOpen((prev) => !prev)}
              >
                <span className="list_sect2_sort_text">{selectedSort.label}</span>
                <img
                  className="list_sect2_sort_arrow"
                  src={Photo.h_arrow}
                  alt=""
                />
              </button>

              {isSortOpen && (
                <div className="list_sect2_sort_dropdown">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      className={`list_sect2_sort_item ${selectedSort.value === opt.value ? "active" : ""}`}
                      onClick={() => {
                        setSelectedSort(opt);
                        setIsSortOpen(false);
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="list_sect2_grid">
          {displayedCars.map((car) => (
            <div className="list_sect2_card" key={car.id}>
              <div
                className="list_sect2_card_img_box"
                style={{ backgroundImage: `url(${resolveCarPhoto(car)})` }}
              >
                <div className="list_sect2_card_top_bar">
                  {car.badge ? (
                    <div className={`list_sect2_badge ${getBadgeClass(car.badge)}`}>
                      {car.badge.text}
                    </div>
                  ) : (
                    <div className="list_sect2_badge_placeholder" />
                  )}

                  <button
                    className={`list_sect2_bookmark_btn ${bookmarked[car.id] ? "active" : ""}`}
                    onClick={() => toggleBookmark(car.id)}
                    aria-label="Bookmark"
                  >
                    <img
                      className="list_sect2_bookmark_icon"
                      src={Photo.p1_s4_bookmark}
                      alt="Bookmark"
                    />
                  </button>
                </div>
              </div>

              <div className="list_sect2_card_body">
                <div className="list_sect2_card_content">
                  <div className="list_sect2_card_info">
                    <h3 className="list_sect2_card_title">{car.name || car.title}</h3>
                    <p className="list_sect2_card_subtitle">{car.subtitle}</p>
                  </div>

                  <div className="list_sect2_divider" />

                  <div className="list_sect2_specs">
                    <div className="list_sect2_spec_item">
                      <img
                        className="list_sect2_spec_icon"
                        src={Photo.p1_s4_speedometer}
                        alt="Miles"
                      />
                      <span className="list_sect2_spec_text">
                        {car.quickSpecs?.miles || "100 Miles"}
                      </span>
                    </div>

                    <div className="list_sect2_spec_item">
                      <img
                        className="list_sect2_spec_icon"
                        src={Photo.p1_s4_fuel}
                        alt="Fuel"
                      />
                      <span className="list_sect2_spec_text">
                        {car.quickSpecs?.fuel || "Petrol"}
                      </span>
                    </div>

                    <div className="list_sect2_spec_item">
                      <img
                        className="list_sect2_spec_icon"
                        src={Photo.p1_s4_transmission}
                        alt="Transmission"
                      />
                      <span className="list_sect2_spec_text">
                        {car.quickSpecs?.transmission || "Automatic"}
                      </span>
                    </div>
                  </div>

                  <div className="list_sect2_divider" />

                  <div className="list_sect2_card_footer">
                    <div className="list_sect2_price_box">
                      {(car.formattedOldPrice || car.oldPrice) && (
                        <span className="list_sect2_old_price">
                          {car.formattedOldPrice || car.oldPrice}
                        </span>
                      )}
                      <span className="list_sect2_price">
                        {car.formattedPrice || (typeof car.price === "number" ? `$${car.price.toLocaleString()}` : car.price)}
                      </span>
                    </div>

                    <a
                      href={`/car/${car.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="list_sect2_details_btn"
                    >
                      <span className="list_sect2_details_text">View Details</span>
                      <img
                        className="list_sect2_details_arrow"
                        src={Photo.p1_s4_arrow_diag}
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="list_sect2_pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`list_sect2_pag_num ${currentPage === pageNum ? "active" : ""}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            ))}

            <button
              className="list_sect2_pag_next"
              onClick={handleNextPage}
              aria-label="Next page"
            >
              <img
                className="list_sect2_pag_arrow"
                src={Photo.p1_s4_arrow_right}
                alt="Next"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
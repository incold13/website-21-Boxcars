import { useState, useRef, useEffect } from "react";
import "./list_sect1.scss";
import { Photo } from "../../../photo.js";

const conditions = ["Condition", "New", "Used"];
const makes = ["Any Makes", "Audi", "BMW", "Ford", "Mercedes-Benz", "Toyota", "Volkswagen"];
const models = ["Any Models", "A4", "A6", "C-Class", "Camry", "Corolla", "Explorer", "GLC", "Ranger", "T-Cross"];
const prices = ["All Prices", "Under $20,000", "$20,000 – $50,000", "$50,000 – $100,000", "Over $100,000"];

export default function List_sect1({ onSearch }) {
  const [selectedCondition, setSelectedCondition] = useState("Condition");
  const [selectedMake, setSelectedMake] = useState("Any Makes");
  const [selectedModel, setSelectedModel] = useState("Any Models");
  const [selectedPrice, setSelectedPrice] = useState("All Prices");
  const [openDropdown, setOpenDropdown] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleSelect = (setter, value) => {
    setter(value);
    setOpenDropdown(null);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        condition: selectedCondition !== "Condition" ? selectedCondition : "",
        make: selectedMake !== "Any Makes" ? selectedMake : "",
        model: selectedModel !== "Any Models" ? selectedModel : "",
        price: selectedPrice !== "All Prices" ? selectedPrice : "",
      });
    }
  };

  return (
    <section className="list_sect1">
      <div className="list_sect1_all">
        <div className="list_sect1_form" ref={formRef}>
          <div className="list_sect1_spacer_left" />

          <div className="list_sect1_field_wrap">
            <button
              className="list_sect1_field_btn"
              onClick={() => toggleDropdown("condition")}
            >
              <span className="list_sect1_field_text">{selectedCondition}</span>
              <img
                className="list_sect1_arrow"
                src={Photo.h_arrow}
                alt=""
              />
            </button>
            {openDropdown === "condition" && (
              <div className="list_sect1_dropdown">
                {conditions.map((item) => (
                  <button
                    key={item}
                    className="list_sect1_dropdown_item"
                    onClick={() => handleSelect(setSelectedCondition, item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="list_sect1_divider" />

          <div className="list_sect1_field_wrap">
            <button
              className="list_sect1_field_btn"
              onClick={() => toggleDropdown("make")}
            >
              <span className="list_sect1_field_text">{selectedMake}</span>
              <img
                className="list_sect1_arrow"
                src={Photo.h_arrow}
                alt=""
              />
            </button>
            {openDropdown === "make" && (
              <div className="list_sect1_dropdown">
                {makes.map((item) => (
                  <button
                    key={item}
                    className="list_sect1_dropdown_item"
                    onClick={() => handleSelect(setSelectedMake, item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="list_sect1_divider" />

          <div className="list_sect1_field_wrap">
            <button
              className="list_sect1_field_btn"
              onClick={() => toggleDropdown("model")}
            >
              <span className="list_sect1_field_text">{selectedModel}</span>
              <img
                className="list_sect1_arrow"
                src={Photo.h_arrow}
                alt=""
              />
            </button>
            {openDropdown === "model" && (
              <div className="list_sect1_dropdown">
                {models.map((item) => (
                  <button
                    key={item}
                    className="list_sect1_dropdown_item"
                    onClick={() => handleSelect(setSelectedModel, item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="list_sect1_divider" />

          <div className="list_sect1_field_wrap list_sect1_field_wrap_price">
            <button
              className="list_sect1_field_btn list_sect1_field_btn_price"
              onClick={() => toggleDropdown("price")}
            >
              <span className="list_sect1_price_label">Prices:</span>
              <span className="list_sect1_price_value">{selectedPrice}</span>
            </button>
            {openDropdown === "price" && (
              <div className="list_sect1_dropdown list_sect1_dropdown_price">
                {prices.map((item) => (
                  <button
                    key={item}
                    className="list_sect1_dropdown_item"
                    onClick={() => handleSelect(setSelectedPrice, item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="list_sect1_divider" />

          <button className="list_sect1_filter_btn">
            <img
              className="list_sect1_filter_icon"
              src={Photo.filter_sliders}
              alt="More Filters"
            />
            <span className="list_sect1_filter_text">More Filters</span>
          </button>

          <button className="list_sect1_submit_btn" onClick={handleSearch}>
            <img
              className="list_sect1_search_icon"
              src={Photo.search_icon_white}
              alt=""
            />
            <span className="list_sect1_submit_text">Find Listing</span>
          </button>

          <div className="list_sect1_spacer_right" />
        </div>
      </div>
    </section>
  );
}
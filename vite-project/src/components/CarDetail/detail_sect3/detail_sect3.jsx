import React, { useState, useEffect } from "react";
import "./detail_sect3.scss";

export default function Detail_sect3({ car }) {
  const [priceInput, setPriceInput] = useState(car?.price || 165000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTermMonths, setLoanTermMonths] = useState(36);
  const [downPayment, setDownPayment] = useState(5000);
  const [monthlyPayment, setMonthlyPayment] = useState(4750);

  useEffect(() => {
    if (car?.price) {
      setPriceInput(car.price);
    }
  }, [car]);

  useEffect(() => {
    const principal = Math.max(0, priceInput - downPayment);
    const monthlyRate = interestRate / 100 / 12;
    if (loanTermMonths <= 0) {
      setMonthlyPayment(0);
      return;
    }
    if (monthlyRate === 0) {
      setMonthlyPayment(Math.round(principal / loanTermMonths));
      return;
    }
    const payment =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, loanTermMonths)) /
      (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
    setMonthlyPayment(Math.round(payment));
  }, [priceInput, interestRate, loanTermMonths, downPayment]);

  return (
    <div className="detail_sect3">
      <div className="detail_sect3_divider" />
      <div className="detail_sect3_header">
        <h2 className="detail_sect3_title">Financing Calculator</h2>
      </div>

      <div className="detail_sect3_box">
        <div className="detail_sect3_grid">
          <div className="detail_sect3_field">
            <label className="detail_sect3_label">Price ($)</label>
            <input
              type="number"
              className="detail_sect3_input"
              value={priceInput}
              onChange={(e) => setPriceInput(Number(e.target.value))}
            />
          </div>
          <div className="detail_sect3_field">
            <label className="detail_sect3_label">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              className="detail_sect3_input"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
          </div>
          <div className="detail_sect3_field">
            <label className="detail_sect3_label">Loan Term (Months)</label>
            <input
              type="number"
              className="detail_sect3_input"
              value={loanTermMonths}
              onChange={(e) => setLoanTermMonths(Number(e.target.value))}
            />
          </div>
          <div className="detail_sect3_field">
            <label className="detail_sect3_label">Down Payment ($)</label>
            <input
              type="number"
              className="detail_sect3_input"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="detail_sect3_bottom">
          <div className="detail_sect3_result">
            <span className="detail_sect3_res_label">Estimated Monthly Payment</span>
            <span className="detail_sect3_res_val">${monthlyPayment.toLocaleString()} /mo</span>
          </div>
          <button
            type="button"
            className="detail_sect3_calc_btn"
            onClick={() => alert(`Calculated Monthly Payment: $${monthlyPayment.toLocaleString()}`)}
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
}

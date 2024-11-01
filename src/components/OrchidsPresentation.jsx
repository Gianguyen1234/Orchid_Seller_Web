import React from "react";
import "./OrchidsPresentation.css";
import Fire from "../assets/fire.png";
import OrchidCard from "./OrchidCard";

export default function OrchidsPresentation({ orchidData }) {
  return (
    <section className="orchid_list">
      <header className="align_center orchid_list_header">
        <h4 className="align_center orchid_list_heading">
          Hot Sales <img src={Fire} alt='"fire emoji' className="navbar_emoji" />
        </h4>

        <div className="align_center orchid_list_fs">
          <ul className="align_center orchid_filter">
            <li className="orchid_filter_item active">5 Star</li>
            <li className="orchid_filter_item">4+ Star</li>
            <li className="orchid_filter_item">3+ Star</li>
          </ul>

          <select name="" id="" className="orchid_sorting">
            <option value="">SortBy</option>
            <option value="">Natural</option>
            <option value="">Rating</option>
          </select>
          <select name="" id="" className="orchid_sorting">
            <option value="">Ascending</option>
            <option value="">Descending</option>
          </select>
        </div>
      </header>

      <div className="orchid_cards">
        {orchidData.map((orchid) => (
          <OrchidCard key={orchid.id} orchid={orchid} />
        ))}
      </div>
    </section>
  );
}

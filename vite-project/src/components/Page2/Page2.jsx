import { useState } from "react";
import "./Page2.scss";
import List_sect1 from "./list_sect1/list_sect1.jsx";
import List_sect2 from "./list_sect2/list_sect2.jsx";
import List_sect3 from "./list_sect3/list_sect3.jsx";

export default function Page2() {
  const [filters, setFilters] = useState({});

  return (
    <div className="page2">
      <main className="page2_main">
        <List_sect1 onSearch={setFilters} />
        <List_sect2 filters={filters} />
        <List_sect3 />
      </main>
    </div>
  );
}
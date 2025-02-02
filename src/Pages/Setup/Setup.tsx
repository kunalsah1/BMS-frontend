import { useState } from "react";
import Companies from "../SetupSubPages/Companies";
import CompanyAddress from "../SetupSubPages/CompanyAddress";
import CompanyWorking from "../SetupSubPages/CompanyWorking";
import Unit from "../SetupSubPages/Unit";

const Setup = () => {
  const [page, setPage] = useState("companies");
  return (
    <section className="pt-20 flex gap-4">
      <div className="bg-white bg-opacity-20 w-96 h-full text-white m-2 rounded-xl p-2">
        <h2 className="border-b font-medium text-lg">Setup</h2>
        <ul className="flex flex-col gap-2 mt-4">
          <li
            className={`  p-2 cursor-pointer ${
              page === "companies" &&
              "bg-white text-black rounded-md font-medium"
            }`}
            onClick={() => setPage("companies")}
          >
            Companies
          </li>
          <li
            className={`cursor-pointer  p-2 ${
              page === "address" && "bg-white text-black rounded-md font-medium"
            }`}
            onClick={() => setPage("address")}
          >
            Address
          </li>
          <li
            className={` cursor-pointer p-2 ${
              page === "working" && "bg-white text-black rounded-md font-medium"
            }`}
            onClick={() => setPage("working")}
          >
            Working
          </li>
          <li
            className={` cursor-pointer p-2 ${
              page === "unit" && "bg-white text-black rounded-md font-medium"
            }`}
            onClick={() => setPage("unit")}
          >
            Units
          </li>
        </ul>
      </div>
      <div className="bg-white bg-opacity-20 w-full h-full text-white m-2 rounded-xl p-2">
        {page === "companies" && <Companies />}
        {page === "address" && <CompanyAddress />}
        {page === "working" && <CompanyWorking />}
        {page === "unit" && <Unit />}
      </div>
    </section>
  );
};

export default Setup;

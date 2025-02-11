import { PiPlusCircle } from "react-icons/pi";
import Table from "../../Components/Table";

import { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { getUnits } from "../../authentication/apis";
import { dateTime } from "../../utils/dateTime";
import AddUnit from "../Modals/AddUnits";

interface Company {
  name: string;
  created_at: string;
  abbreviation: string;
}
const Unit = () => {
  const [units, setUnits] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const fetchUnits = async () => {
    try {
      const res = await getUnits();
      setUnits(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUnits();
  }, []);

  const column: TableColumn<Company>[] = [
    {
      name: "Unit",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Abbreviation",
      selector: (row) => (row.abbreviation ? row.abbreviation : "-"),
      sortable: true,
    },
    {
      name: "Created on",
      selector: (row) => dateTime(row.created_at),
      sortable: true,
    },
  ];

  return (
    <section>
      <h2 className="font-medium text-lg border-b">Units</h2>
      <div className="flex items-center gap-2 p-2">
        <input
          type="text"
          name=""
          id=""
          className="border-gray-500 bg-transparent border-b w-full p-2 outline-none"
          placeholder="Search by company name"
        />
        <button
          className="flex items-center gap-2 p-2 rounded-md bg-green-500"
          onClick={() => setAddModal(true)}
        >
          <PiPlusCircle /> Units
        </button>
      </div>
      <div>
        {" "}
        <Table columns={column} data={units} />{" "}
      </div>
      {addModal && (
        <AddUnit
          fetchUnits={fetchUnits}
          isModalOpen={addModal}
          setIsModalOpen={() => setAddModal(false)}
        />
      )}
    </section>
  );
};

export default Unit;

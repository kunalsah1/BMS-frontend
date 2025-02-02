import { PiPlusCircle } from "react-icons/pi";
import Table from "../../Components/Table";

import { getCompanies } from "../../authentication/apis";
import { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import AddCompanyModal from "../Modals/AddCompanyModal";

interface Company {
  name: string;
  description: string;
}
const Companies = () => {
  const [companyData, setCompanyData] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const fetchCompanies = async () => {
    try {
      const res = await getCompanies();
      setCompanyData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCompanies();
  }, []);
  const column: TableColumn<Company>[] = [
    {
      name: "Company",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
  ];

  return (
    <section>
      <h2 className="font-medium text-lg border-b">Companies</h2>
      <div className="flex items-center gap-2 p-2">
        <input
          type="text"
          name=""
          id=""
          className="border-gray-500 bg-transparent border-b w-full p-2 outline-none"
          placeholder="Search by name"
        />
        <button
          className="flex items-center gap-2 p-2 rounded-md bg-green-500"
          onClick={() => setAddModal(true)}
        >
          <PiPlusCircle /> Companies
        </button>
      </div>
      <div>
        {" "}
        <Table columns={column} data={companyData} />{" "}
      </div>
      {addModal && (
        <AddCompanyModal
          isModalOpen={addModal}
          setIsModalOpen={() => setAddModal(false)}
          fetchCompanies={fetchCompanies}
        />
      )}
    </section>
  );
};

export default Companies;

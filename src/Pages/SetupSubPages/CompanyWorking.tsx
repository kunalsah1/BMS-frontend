import { PiPlusCircle } from "react-icons/pi";
import Table from "../../Components/Table";

import { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { getCompanyWorking } from "../../authentication/apis";

import AddCompanyWorkingModal from "../Modals/AddCompanyWorkingModal";

interface Company {
  company_name: string;
  title: string;
}
const CompanyWorking = () => {
  const [companyData, setCompanyData] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const fetchCompanyWorkings = async () => {
    try {
      const res = await getCompanyWorking();
      setCompanyData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCompanyWorkings();
  }, []);
  const column: TableColumn<Company>[] = [
    {
      name: "Company",
      selector: (row) => row.company_name,
      sortable: true,
    },
    {
      name: "Working",
      selector: (row) => row.title,
      sortable: true,
    },
  ];

  return (
    <section>
      <h2 className="font-medium text-lg border-b">Workings</h2>
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
          <PiPlusCircle /> Working
        </button>
      </div>
      <div>
        {" "}
        <Table columns={column} data={companyData} />{" "}
      </div>
      {addModal && (
        <AddCompanyWorkingModal
          isModalOpen={addModal}
          setIsModalOpen={() => setAddModal(false)}
          fetchWorkings={fetchCompanyWorkings}
        />
      )}
    </section>
  );
};

export default CompanyWorking;

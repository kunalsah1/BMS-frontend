import { PiPlusCircle } from "react-icons/pi";
import Table from "../../Components/Table";

import { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { getCompanyAddress } from "../../authentication/apis";
import AddCompanyAddressModal from "../Modals/AddCompanyAddressModal";

interface Company {
  company_name: string;
  address: string;
}
const CompanyAddress = () => {
  const [companyData, setCompanyData] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const fetchCompanyAddress = async () => {
    try {
      const res = await getCompanyAddress();
      setCompanyData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCompanyAddress();
  }, []);
  const column: TableColumn<Company>[] = [
    {
      name: "Company",
      selector: (row) => row.company_name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
  ];

  return (
    <section>
      <h2 className="font-medium text-lg border-b">Addresses</h2>
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
          <PiPlusCircle /> Add
        </button>
      </div>
      <div>
        {" "}
        <Table columns={column} data={companyData} />{" "}
      </div>
      {addModal && (
        <AddCompanyAddressModal
          isModalOpen={addModal}
          setIsModalOpen={() => setAddModal(false)}
          fetchAddresses={fetchCompanyAddress}
        />
      )}
    </section>
  );
};

export default CompanyAddress;

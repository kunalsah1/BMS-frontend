import { useEffect, useState } from "react";
import Button from "../../Components/buttons/Button";
import { downloadQuotationPdf, getQuotation } from "../../authentication/apis";
import { TableColumn } from "react-data-table-component";
import Table from "../../Components/Table";
import { BsEyeFill } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";
interface Company {
  company_name: string;
  quotation_date: string;
  created_by: string;
  client_name: string;
  id: number;
  total_amount: number;
}
const Quotation = () => {
  const [quotations, setQuotations] = useState([]);
  const fetchQuotation = async () => {
    try {
      const res = await getQuotation();
      setQuotations(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchQuotation();
  }, []);
  const handleDownloadQuotationPdf = async (
    quoteId: number,
    client_name: string,
    date: string
  ) => {
    console.log(quoteId);
    try {
      const response = await downloadQuotationPdf(quoteId);

      if (response.data) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${client_name}-${date}.pdf`;

        // Programmatically trigger the link click to download the file
        link.click();
        toast.success("Quotation Downloaded successfully");
      } else {
        toast.error("Failed to download quotation PDF");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while downloading PDF");
    }
  };

  const column: TableColumn<Company>[] = [
    {
      name: "Company",
      selector: (row) => row.company_name,
      sortable: true,
    },
    {
      name: "Client",
      selector: (row) => row.client_name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.quotation_date,
      sortable: true,
    },
    {
      name: "Created by",
      selector: (row) => row.quotation_date,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.total_amount,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <BsEyeFill className="text-blue-500" />
          <button
            onClick={() =>
              handleDownloadQuotationPdf(
                row.id,
                row.client_name,
                row.quotation_date
              )
            }
            className="text-green-500"
          >
            <FaDownload />
          </button>
        </div>
      ),
      sortable: true,
    },
  ];
  return (
    <section className="mt-20 text-white p-2">
      <div className="flex justify-between p-4">
        <h2 className="font-medium text-xl">Quotation</h2>
        <Button
          children={"Add"}
          href="/add/quotation"
          isLink
          bgColor="bg-green-400"
        />
      </div>
      <div>
        <Table columns={column} data={quotations} />
      </div>
    </section>
  );
};

export default Quotation;

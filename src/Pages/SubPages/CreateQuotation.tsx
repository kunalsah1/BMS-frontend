// import React from "react";

import { useEffect, useState } from "react";
import SelectField from "../../Containers/SelectField";
import TextField from "../../Containers/TextField";
import Button from "../../Components/buttons/Button";
import { FaTrash } from "react-icons/fa";
import useGetQuery from "../../Components/query/useGetQuery";
import {
  getCompanies,
  getFilteredAddress,
  getFilteredCompanyWorking,
  getUnits,
  postQuotation,
} from "../../authentication/apis";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type particulars = {
  particular: string;
  rate: number;
  quantity: number;
  amount: number;
  unit: string;
};
const CreateQuotation = () => {
  const billQuotation = [
    { id: "bill", label: "Bill" },
    { id: "quotation", label: "Quotation" },
  ];
  const [particulars, setParticulars] = useState<particulars[]>([
    {
      particular: "",
      rate: 0,
      quantity: 0,
      amount: 0,
      unit: "",
    },
  ]);
  const totalMaterialAmount = particulars.reduce(
    (acc, current) => acc + current.amount,
    0
  );
  const { data, error, loading } = useGetQuery({
    apiFunction: getCompanies,
    dependencies: [],
  });
  const companies = data?.map((comp: any) => ({
    label: comp.name,
    id: comp.id,
  }));
  console.log(data);
  console.log(error);
  console.log(loading);

  const addParticulars = () => {
    setParticulars([
      ...particulars,
      {
        particular: "",
        rate: 0,
        quantity: 0,
        amount: 0,
        unit: "",
      },
    ]);
  };
  const handleChange = (
    index: number,
    name: keyof particulars,
    value: string | number
  ) => {
    const updatedParticulars = [...particulars];
    if (name === "particular" || name === "unit") {
      updatedParticulars[index][name] = value as string;
    } else {
      updatedParticulars[index][name] = +value as number;
    }
    updatedParticulars[index].amount =
      updatedParticulars[index].rate * updatedParticulars[index].quantity;
    setParticulars(updatedParticulars);
  };
  const handleDelete = (index: number) => {
    const updatedParticulars = particulars.filter((_, i) => i !== index);
    setParticulars(updatedParticulars);
  };

  const [formData, setFormData] = useState({
    companyId: "",
    addressId: "",
    workingId: "",
    date: "",
    clientName: "",
    clientAddress1: "",
    clientAddress2: "",
    type: "",
    mobile: "",
    emailId: "",
    labour: "",
  });
  const [units, setUnits] = useState([]);
  const fetchUnits = async () => {
    try {
      const res = await getUnits();
      const organizedOptions = res?.data?.map((option: any) => ({
        label: option?.name,
        id: option?.name,
      }));
      setUnits(organizedOptions);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUnits();
  }, []);
  const totalAmount = totalMaterialAmount + Number(formData.labour);
  const [companyAddresses, setCompanyAddresses] = useState([]);
  const [companyWorkings, setCompanyWorkings] = useState([]);
  const handleQuotationChange = (e: any) => {
    const fetchCompanyAddress = async (companyId: number) => {
      try {
        const res = await getFilteredAddress(companyId);
        const addresses = res?.data?.map((address: any) => ({
          label: address.address,
          id: address.id,
        }));
        setCompanyAddresses(addresses);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCompanyWorking = async (companyId: number) => {
      try {
        const res = await getFilteredCompanyWorking(companyId);
        const workings = res?.data?.map((working: any) => ({
          label: working?.title,
          id: working?.id,
        }));
        setCompanyWorkings(workings);
      } catch (error) {
        console.log(error);
      }
    };
    if (e.target.type === "select-one" && e.target.name === "companyId") {
      const compId = Number(e.target.value);
      console.log(e.target.value);
      fetchCompanyAddress(compId);
      fetchCompanyWorking(compId);
      setFormData({ ...formData, companyId: compId.toString() });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const userId = getItemInLocalStorage("userId");
  const navigate = useNavigate();
  const handleCreateQuotation = async () => {
    const postData = new FormData();
    postData.append("company_id", formData.companyId);
    postData.append("address_id", formData.addressId);
    postData.append("working_id", formData.workingId);
    postData.append("mobile_number", formData.mobile);
    postData.append("email_id", formData.emailId);
    postData.append("quotation_date", formData.date);
    postData.append("client_name", formData.clientName);
    postData.append("client_address1", formData.clientAddress1);
    postData.append("client_address2", formData.clientAddress1);
    postData.append("bill_or_quotation", formData.type);
    postData.append("user", userId);
    postData.append("total_materials", totalMaterialAmount.toString());
    postData.append("total_labour", formData.labour.toString());
    postData.append("total_amount", totalAmount.toString());

    postData.append("materials", JSON.stringify(particulars));
    try {
      await postQuotation(postData);
      toast.success("Quotation created successfully");
      navigate("/quotation");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full pt-20 text-white">
      <div className="bg-gray-400 m-2 rounded-xl p-2 bg-opacity-20 ">
        <h2 className="font-medium border-b border-white text-center text-xl">
          Create Quotation
        </h2>
        <div className="md:p-4 w-full justify-center flex flex-col ">
          <div className="grid md:grid-cols-3 gap-4 p-2 w-full">
            <SelectField
              label="Select Company"
              options={companies}
              value={formData.companyId}
              onChange={handleQuotationChange}
              name="companyId"
            />
            <SelectField
              label="Select Address"
              options={companyAddresses}
              value={formData.addressId}
              name="addressId"
              onChange={handleQuotationChange}
            />
            <SelectField
              label="Select Working"
              options={companyWorkings}
              value={formData.workingId}
              name="workingId"
              onChange={handleQuotationChange}
            />
            <TextField
              label="Mobile number"
              type="text"
              value={formData.mobile}
              name="mobile"
              onChange={handleQuotationChange}
              placeholder="Enter mobile number"
            />
            <TextField
              label="Email"
              type="email"
              value={formData.emailId}
              name="emailId"
              onChange={handleQuotationChange}
              placeholder="Enter email Id"
            />
            <TextField
              label="Date"
              type="date"
              value={formData.date}
              name="date"
              onChange={handleQuotationChange}
            />
            <TextField
              label="Client Name"
              placeholder="Enter Client name"
              value={formData.clientName}
              name="clientName"
              onChange={handleQuotationChange}
            />
            <TextField
              label="Client Address 1"
              placeholder="Address 1"
              value={formData.clientAddress1}
              name="clientAddress1"
              onChange={handleQuotationChange}
            />
            <TextField
              label="Client Address 2"
              placeholder="Address 2"
              name="clientAddress2"
              value={formData.clientAddress2}
              onChange={handleQuotationChange}
            />
            <SelectField
              label="Select Bill/Quotation"
              options={billQuotation}
              value={formData.type}
              name="type"
              onChange={handleQuotationChange}
            />
          </div>
          <div>
            <h2 className="border-b font-medium text-xl">
              Material/Labour Details
            </h2>
            {particulars.map((particular, index) => (
              <>
                <div className="grid md:grid-cols-4 gap-2 p-2" key={index}>
                  <TextField
                    placeholder="Enter Description"
                    label="Particular"
                    value={particular.particular}
                    onChange={(e) =>
                      handleChange(index, "particular", e.target.value)
                    }
                  />
                  <div className="grid grid-cols-2 items-center w-full gap-2">
                    <TextField
                      placeholder="Enter Quantity"
                      label="Quantity"
                      type="number"
                      value={
                        particular.quantity === 0 ? "" : particular.quantity
                      }
                      onChange={(e) =>
                        handleChange(index, "quantity", e.target.value)
                      }
                    />
                    <SelectField
                      label="Select unit"
                      name="unit"
                      onChange={(e) =>
                        handleChange(index, "unit", e.target.value)
                      }
                      options={units}
                    />
                  </div>
                  <TextField
                    placeholder="Enter Rate"
                    label="Rate"
                    type="number"
                    value={particular.rate === 0 ? "" : particular.rate}
                    onChange={(e) =>
                      handleChange(index, "rate", e.target.value)
                    }
                  />
                  <TextField
                    placeholder="Enter Amount"
                    label="Amount"
                    type="number"
                    value={particular.amount === 0 ? "" : particular.amount}
                    onChange={(e) =>
                      handleChange(index, "amount", e.target.value)
                    }
                    readonly={true}
                  />
                </div>
                <div className="col-span-4 flex justify-end">
                  <button onClick={() => handleDelete(index)}>
                    {" "}
                    <FaTrash className="text-red-400" />
                  </button>
                </div>
              </>
            ))}

            <div className="m-2">
              <Button
                bgColor="bg-green-400 text-white"
                children={"Add"}
                isButton
                onClick={addParticulars}
              />
            </div>
            <div className="border rounded-xl p-2">
              <div className="w-full flex items-center justify-between font-medium">
                <p>Total Material cost :</p>
                <p> ₹{totalMaterialAmount}</p>
              </div>
              <div className="w-full flex items-center justify-between font-medium">
                <label>Total Labour cost :</label>
                <TextField
                  placeholder="₹ Labour cost"
                  value={formData.labour}
                  onChange={handleQuotationChange}
                  name="labour"
                  type="number"
                />
              </div>
              <div className="w-full flex items-center justify-between font-medium">
                <label>Total Amount :</label>
                <p>{totalAmount}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center border-t mt-1 p-2">
          <Button
            bgColor="bg-green-400 text-white"
            isButton
            children={"Create Quotation"}
            onClick={handleCreateQuotation}
          />
        </div>
      </div>
    </section>
  );
};

export default CreateQuotation;

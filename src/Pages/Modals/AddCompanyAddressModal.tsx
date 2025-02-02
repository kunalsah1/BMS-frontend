import { useEffect, useState } from "react";
import Modal from "../../Components/Modal";

import SelectField from "../../Containers/SelectField";
import { getCompanies, postCompanyAddress } from "../../authentication/apis";

import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../utils/localStorage";
interface addressProps {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  fetchAddresses: () => void;
}

const AddCompanyAddressModal = ({
  setIsModalOpen,
  isModalOpen,
  fetchAddresses,
}: addressProps) => {
  const [formData, setFormData] = useState({
    companyId: "",
    address: "",
  });
  const [companyData, setCompanyData] = useState([]);
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchCompanies = async () => {
    try {
      const res = await getCompanies();
      const companies = res?.data?.map((company: any) => ({
        label: company.name,
        id: company.id,
      }));
      setCompanyData(companies);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCompanies();
  }, []);
  const userId = getItemInLocalStorage("userId");
  const handleAddAddress = async () => {
    if (!formData.companyId || !formData.address) {
      return toast.error("Company and Address are required");
    }
    const sendData = new FormData();
    sendData.append("company", formData.companyId);
    sendData.append("address", formData.address);
    sendData.append("user", userId);
    try {
      await postCompanyAddress(sendData);
      setIsModalOpen();
      fetchAddresses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen()}
      title="Add Address"
    >
      <div className="text-black w-96">
        <SelectField
          label="Select Company"
          options={companyData}
          value={formData.companyId}
          onChange={handleChange}
          name="companyId"
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="">Address</label>
          <textarea
            rows={3}
            className="border p-1 bg-transparent outline-none rounded-md"
            placeholder="Enter description"
            value={formData.address}
            name="address"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex justify-center gap-2 my-1 text-white border-t p-1">
          <button
            className="bg-red-400 p-1 px-4 rounded-md"
            onClick={() => setIsModalOpen()}
          >
            Close
          </button>
          <button
            className="bg-green-400 p-1 px-4 rounded-md"
            onClick={handleAddAddress}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCompanyAddressModal;

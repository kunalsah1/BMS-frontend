// import { useState } from "react";
import { useState } from "react";
import Modal from "../../Components/Modal";
import TextField from "../../Containers/TextField";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { postCompanies } from "../../authentication/apis";
interface companyModal {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  fetchCompanies: () => void;
}

const AddCompanyModal = ({
  isModalOpen,
  setIsModalOpen,
  fetchCompanies,
}: companyModal) => {
  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const userId = getItemInLocalStorage("userId");
  const handleAddCompany = async () => {
    if (!formData.companyName) {
      return toast.error("Please enter Company name");
    }
    const sendData = new FormData();
    sendData.append("name", formData.companyName);
    sendData.append("description", formData.description);
    sendData.append("user", userId);
    try {
      await postCompanies(sendData);
      setIsModalOpen();
      fetchCompanies();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen()}
      title="Add Company"
    >
      <div className="text-black w-96">
        <TextField
          label="Company"
          placeholder="Enter company"
          value={formData.companyName}
          name="companyName"
          onChange={handleChange}
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="">Description</label>
          <textarea
            rows={3}
            className="border p-1 bg-transparent outline-none rounded-md"
            placeholder="Enter description"
            value={formData.description}
            name="description"
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
            onClick={handleAddCompany}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCompanyModal;

import { useEffect, useState } from "react";
import SelectField from "../../Containers/SelectField";
import Modal from "../../Components/Modal";
import { getCompanies, postCompanyWorking } from "../../authentication/apis";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../utils/localStorage";

interface workingProps {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  fetchWorkings: () => void;
}
const AddCompanyWorkingModal = ({
  isModalOpen,
  setIsModalOpen,
  fetchWorkings,
}: workingProps) => {
  const [companyData, setCompanyData] = useState([]);
  const [formData, setFormData] = useState({
    companyId: "",
    working: "",
  });
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
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const userId = getItemInLocalStorage("userId");
  const handleAddWorking = async () => {
    if (!formData.companyId || !formData.working) {
      return toast.success("Company and Working are required");
    }
    const sendData = new FormData();
    sendData.append("company", formData.companyId);
    sendData.append("title", formData.working);
    sendData.append("user", userId);
    try {
      await postCompanyWorking(sendData);
      setIsModalOpen();
      fetchWorkings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen()}
      title="Add Working"
    >
      <div className="text-black w-96">
        <SelectField
          label="Select Company"
          options={companyData}
          value={formData.companyId}
          onChange={handleChange}
          name="companyId"
        />
        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="" className="font-medium">
            Working
          </label>
          <textarea
            rows={3}
            className="border p-1 bg-transparent outline-none rounded-md"
            placeholder="Enter description"
            value={formData.working}
            name="working"
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
            onClick={handleAddWorking}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCompanyWorkingModal;

import { useState } from "react";
import Modal from "../../Components/Modal";
import { postUnits } from "../../authentication/apis";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../utils/localStorage";
import TextField from "../../Containers/TextField";

interface unitPros {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  fetchUnits: () => void;
}
const AddUnit = ({ isModalOpen, setIsModalOpen, fetchUnits }: unitPros) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const userId = getItemInLocalStorage("userId");
  const handleAddUnit = async () => {
    if (!formData.name) {
      return toast.error("Unit name is required");
    }
    const sendData = new FormData();
    sendData.append("name", formData.name);
    sendData.append("user", userId);
    try {
      await postUnits(sendData);
      setIsModalOpen();
      fetchUnits();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.name.join(", "));
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen()}
      title="Add Units"
    >
      <div className="text-black w-96">
        <div className="flex flex-col gap-1 mt-2">
          <TextField
            label="Unit"
            placeholder="Enter unit"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
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
            onClick={handleAddUnit}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddUnit;

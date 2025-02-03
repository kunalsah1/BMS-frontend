import { getItemInLocalStorage } from "../../utils/localStorage";
import Button from "../../Components/buttons/Button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const firstName = getItemInLocalStorage("FIRSTNAME");
  const lastName = getItemInLocalStorage("LASTNAME");
  const email = getItemInLocalStorage("EMAIL");
  const mobile = getItemInLocalStorage("MOBILE");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("EMAIL");
    localStorage.removeItem("FIRSTNAME");
    localStorage.removeItem("LASTNAME");
    localStorage.removeItem("MOBILE");
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <section className="mt-20 flex items-center justify-center h-full w-full p-4">
      <div className="bg-gray-100 bg-opacity-5 w-96 border border-gray-200 flex flex-col gap-4 items-center justify-center p-4 rounded-xl">
        {" "}
        <div className="text-white flex justify-between w-full items-center">
          <p className="font-medium">Name : </p>
          <p>{`${firstName} ${lastName}`}</p>
        </div>
        <div className="text-white flex justify-between w-full items-center">
          <p className="font-medium">Email : </p>
          <p>{email}</p>
        </div>
        <div className="text-white flex justify-between w-full items-center">
          <p className="font-medium">Mobile : </p>
          <p>{mobile}</p>
        </div>
        <Button
          isButton
          bgColor="bg-red-400 text-white hover:bg-white hover:text-red-400"
          children={"Logout"}
          onClick={handleLogout}
        />
      </div>
    </section>
  );
};

export default Profile;

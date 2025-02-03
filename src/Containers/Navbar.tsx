import Button from "../Components/buttons/Button";
import { getItemInLocalStorage } from "../utils/localStorage";

const Navbar = () => {
  const firstName = getItemInLocalStorage("FIRSTNAME");
  const lastName = getItemInLocalStorage("LASTNAME");
  return (
    <nav className="h-16 w-full bg-gray-300 fixed top-0 left-0 flex items-center px-4 ">
      <div className="text-lg font-bold text-gray-800 flex justify-end items-center w-full">
        <Button isLink={true} children={"Dashboard"} href="/dashboard" />
        <Button isLink={true} children={"Quotation"} href="/quotation" />
        <Button isLink={true} children={"Setup"} href="/setup" />
        <Button
          isLink={true}
          children={`${firstName} ${lastName}`}
          href="/profile"
        />
      </div>
    </nav>
  );
};

export default Navbar;

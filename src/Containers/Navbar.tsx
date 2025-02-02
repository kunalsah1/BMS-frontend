import Button from "../Components/buttons/Button";

const Navbar = () => {
  return (
    <nav className="h-16 w-full bg-gray-300 fixed top-0 left-0 flex items-center px-4 ">
      <div className="text-lg font-bold text-gray-800 flex justify-end items-center w-full">
        <Button isLink={true} children={"Dashboard"} href="/dashboard" />
        <Button isLink={true} children={"Quotation"} href="/quotation" />
        <Button isLink={true} children={"Setup"} href="/setup" />
      </div>
    </nav>
  );
};

export default Navbar;

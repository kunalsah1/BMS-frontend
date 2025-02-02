import { Link, useNavigate } from "react-router-dom";
import TextField from "../../Containers/TextField";
import { useState } from "react";
import toast from "react-hot-toast";
import { registerUser } from "../../authentication/apis";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleRegister = async () => {
    if (!formData.email || !formData.password) {
      return toast.error("Please provide all the data");
    }
    const registerData = new FormData();
    registerData.append("email", formData.email);
    registerData.append("password", formData.password);
    registerData.append("first_name", formData.firstName);
    registerData.append("last_name", formData.lastName);
    registerData.append("mobile_number", formData.mobile);
    try {
      const res = await registerUser(registerData);
      console.log(res);
      toast.success("Registration completed");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="bg-white text-black h-fit w-96 p-6 rounded-xl">
        <h2 className="text-center font-semibold text-lg border-b">Register</h2>
        <div className="flex flex-col gap-2 my-4">
          <TextField
            label="First Name"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            name="firstName"
          />
          <TextField
            label="Last Name"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
            name="lastName"
          />
          <TextField
            label="Mobile Number"
            placeholder="Enter mobile number"
            value={formData.mobile}
            onChange={handleChange}
            name="mobile"
          />
          <TextField
            label="Email"
            placeholder="example@company.com"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
          <TextField
            label="Password"
            placeholder="**********"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
          <div className="flex justify-center flex-col gap-2">
            <button
              onClick={handleRegister}
              className="bg-violet-500 text-white p-2 w-full rounded-md font-medium text-lg"
            >
              Register
            </button>
            <Link to={"/login"}>Return to Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

import { Link, useNavigate } from "react-router-dom";
import TextField from "../../Containers/TextField";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loginUser } from "../../authentication/apis";
// import { setItemInSessionStorage } from "../../utils/sessionStorage";
import {
  getItemInLocalStorage,
  setItemInLocalStorage,
} from "../../utils/localStorage";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const token = getItemInLocalStorage("accessToken");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!formData.email && !formData.password) {
      return toast.error("Please provide credentials");
    }
    const loginData = new FormData();
    loginData.append("email", formData.email);
    loginData.append("password", formData.password);
    try {
      const res = await loginUser(loginData);
      const tokens = res.data.tokens;
      const userId = res.data.id;
      setItemInLocalStorage("userId", userId);
      setItemInLocalStorage("accessToken", tokens.access);
      setItemInLocalStorage("refreshToken", tokens.refresh);
      setItemInLocalStorage("FIRSTNAME", res.data.first_name);
      setItemInLocalStorage("LASTNAME", res.data.last_name);
      setItemInLocalStorage("EMAIL", res.data.email);
      setItemInLocalStorage("MOBILE", res.data.mobile_number);
      // setItemInSessionStorage("accessToken", tokens.access);
      // setItemInSessionStorage("refreshToken", tokens.refresh);
      console.log(res);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Invalid login credential");
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="bg-white text-black h-80 w-96 p-6 rounded-xl">
        <h2 className="text-center font-semibold text-lg border-b">Login</h2>
        <div className="flex flex-col gap-2 my-4">
          <TextField
            label="Email"
            placeholder="example@company.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            placeholder="**********"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
          <div className="flex justify-end">
            <button className="text-blue-400 font-medium">
              Forgot Password
            </button>
          </div>
          <div className="flex justify-center flex-col gap-2">
            <button
              onClick={handleLogin}
              className="bg-violet-500 text-white p-2 w-full rounded-md font-medium text-lg text-center"
            >
              Login
            </button>
            <Link to={"/register"}>Not yet registered?</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import "./style.css";
import User from "../../services/user";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    try {
      const token = localStorage.getItem("token") || "";
      if (!token) return navigate("/");
      navigate("/home");
    } catch (error) {
      console.log("Invlaid token", error?.message);
    }
  }, [navigate]);

  const handleChange = (name) => (e) => {
    setFormData((prev) => ({ ...prev, [name]: e.target?.value }));
  };

  const handleSubmit = async () => {
    const { email, password } = formData;
    try {
      const { data } = await User.login(email, password);

      if (data?.success) {
        localStorage.setItem("token", data?.data?.token);
        setMessage(data?.message);
        setShowToast(true);
        navigate("/home");
      }
    } catch (error) {
      setMessage(error?.response?.data?.message);
      setErrorMessage(true);
      setShowToast(true);
      navigate("/");
    }
  };

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [showToast]);

  const showMessageToast = () => {
    if (showToast) {
      return (
        <Toast
          message={message}
          showToast={showToast}
          errorMessage={errorMessage}
        />
      );
    }
  };

  return (
    <div>
      <section className="text-center text-lg-start">
        <div className="mb-3">
          <div className="row g-0 d-flex align-items-center">
            <div className="col-lg-4 d-none d-lg-flex">
              <img
                src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                alt="Trendy Pants and Shoes"
                className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
              />
            </div>
            <div className="col-lg-8">
              <div className="py-5 px-md-5">
                <form>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form2Example1"
                      className="form-control"
                      value={formData?.email}
                      onChange={handleChange("email")}
                    />
                    <label className="form-label" htmlFor="form2Example1">
                      Email address
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example2"
                      className="form-control"
                      value={formData?.password}
                      onChange={handleChange("password")}
                    />
                    <label className="form-label" htmlFor="form2Example2">
                      Password
                    </label>
                  </div>
                  <div className="row mb-4">
                    {/* <div className="col d-flex justify-content-center">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="form2Example31"
                          checked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example31"
                        >
                          {" "}
                          Remember me{" "}
                        </label>
                      </div>
                    </div> */}

                    <div className="col">
                      <a href="#!">Forgot password?</a>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-block mb-4"
                    onClick={handleSubmit}
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showMessageToast()}
    </div>
  );
};

export default LoginPage;

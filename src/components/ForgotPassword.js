import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const ForgotPassword = () => {
  const { id, token } = useParams();

  const history = useNavigate();

  const [data2, setData] = useState(false);

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");


 const userValid = async () => {
    const res = await fetch(`https://login-backend-6xsa.onrender.com/forgotpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  const setval = (e) => {
    setPassword(e.target.value);
  };

  const sendpassword = async (e) => {
    e.preventDefault();

    if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else {
      const res = await fetch(`https://login-backend-6xsa.onrender.com/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.status == 201) {
        setPassword("");
        setMessage(true);
      } else {
        toast.error("! Token Expired generate new LInk", {
          position: "top-center",
        });
      }
    }
  };
  useEffect(() => {
    userValid();
  }, []);


  return (
    <>
    
        <>
          <section>
            <div className="form_data">
              <div className="form_heading">
                <h1>Enter Your NEW Password</h1>
              </div>

              <form>
                {message ? (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Password Succesfulyy Update{" "}
                  </p>
                ) : (
                  ""
                )}
                <div className="form_input">
                  <label htmlFor="password">New password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={setval}
                    name="password"
                    id="password"
                    placeholder="Enter Your new password"
                  />
                </div>

                <button className="btn" onClick={sendpassword}>
                  Send
                </button>
              </form>
              <p>
                <NavLink to="/">Home</NavLink>
              </p>
              <ToastContainer />
            </div>
          </section>
        </>



    </>
  );
};

export default ForgotPassword;

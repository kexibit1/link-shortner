import React, { useState, useContext, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, request } = useHttp();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request(
        "http://localhost:5000/api/auth/register",
        "POST",
        { ...form }
      );
      console.log("Data", data);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request(
        "http://localhost:5000/api/auth/login",
        "POST",
        { ...form }
      );
      auth.login(data.token, data.userId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"row"}>
      <div className="col s6 offset-s3">
        <h1>Short your URL</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Auth</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter your Email"
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={changeHandler}
                  className="yellow-input active"
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Enter your password"
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={changeHandler}
                  className="yellow-input active"
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Login
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

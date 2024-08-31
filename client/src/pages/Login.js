import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../components/FormLayout.css";
import { login, clearError } from "../actions/session";

const LoginFormLayout = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const sessionError = useSelector((state) => state.sessionError);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (userData) => {
    setLoading(true);
    await dispatch(login(userData));
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          type="text"
          placeholder="Username"
          className={`form__input ${errors.username ? "form__input--error" : ""}`}
          {...register("username", { required: true })}
        />
        {errors.username && <p className="form__error">Username is required</p>}
        <input
          type="password"
          placeholder="Password"
          className={`form__input ${errors.password ? "form__input--error" : ""}`}
          {...register("password", { required: true })}
        />
        {errors.password && <p className="form__error">Password is required</p>}
        {sessionError && <p className="form__error">{sessionError}</p>}
        <button type="submit" className="form__btn form__btn--submit">Log In</button>
      </form>
      <Link to="/signup">New to RakFit? Sign up</Link>
      {loading && <p style={{ fontSize: "10px", color: "blue", margin: "10px" }}>Please wait...</p>}
    </>
  );
};

export default LoginFormLayout;

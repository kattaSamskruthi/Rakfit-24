// import React from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { signup } from "../actions/session";

// const SignupFormLayout = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const dispatch = useDispatch();
//   const sessionError = useSelector((state) => state.session.error); 

//   const handleSignup = (userData) => {
//     dispatch(signup(userData));
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(handleSignup)}>
//         <input
//           type="text"
//           placeholder="Username"
//           className={`form__input ${
//             errors.username ? "form__input--error" : ""
//           }`}
//           {...register("username", { required: true })}
//         />
//         {errors.username && <p className="form__error">Username is required</p>}
//         <input
//           type="text"
//           placeholder="Name"
//           className={`form__input ${errors.name ? "form__input--error" : ""}`}
//           {...register("name", { required: true })}
//         />
//         {errors.name && <p className="form__error">Name is required</p>}
//         <input
//           type="password"
//           placeholder="Password"
//           className={`form__input ${
//             errors.password ? "form__input--error" : ""
//           }`}
//           {...register("password", { required: true })}
//         />
//         {errors.password && <p className="form__error">Password is required</p>}
//         {sessionError && <p className="form__error">{sessionError}</p>}
//         <button className="form__btn form__btn--submit" type="submit">
//           Sign Up
//         </button>
//       </form>
//       <Link to="/login">Already have an account? Log in</Link>
//     </>
//   );
// };

// export default SignupFormLayout;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../actions/session";

const SignupFormLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const sessionError = useSelector((state) => state.session.error); 
  const [loading, setLoading] = useState(false); // Loading state

  const handleSignup = async (userData) => {
    setLoading(true); // Set loading to true
    await dispatch(signup(userData));
    setLoading(false); // Reset loading state after signup attempt
  };

  return (
    <>

      <form onSubmit={handleSubmit(handleSignup)}>
        <input
          type="text"
          placeholder="Username"
          className={`form__input ${
            errors.username ? "form__input--error" : ""
          }`}
          {...register("username", { required: true })}
        />
        {errors.username && <p className="form__error">Username is required</p>}
        
        <input
          type="text"
          placeholder="Name"
          className={`form__input ${errors.name ? "form__input--error" : ""}`}
          {...register("name", { required: true })}
        />
        {errors.name && <p className="form__error">Name is required</p>}
        
        <input
          type="password"
          placeholder="Password"
          className={`form__input ${
            errors.password ? "form__input--error" : ""
          }`}
          {...register("password", { required: true })}
        />
        {errors.password && <p className="form__error">Password is required</p>}
        
        {sessionError && <p className="form__error">{sessionError}</p>}
        
        <button className="form__btn form__btn--submit" type="submit">
          Sign Up
        </button>
      </form>
      <Link to="/login">Already have an account? Log in</Link>
      {loading && (
        <p style={{ fontSize: "16px", color: "blue", margin:"10px" }}>Please wait loading...</p>
      )}
    </>
  );
};

export default SignupFormLayout;

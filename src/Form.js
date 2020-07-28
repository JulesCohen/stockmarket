import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";

const Form = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <p className="tip">
        ENTER THE SYMBOL OF THE COMPANY YOU ARE LOOKING FOR:
      </p>
      <input
        name="symbol"
        ref={register({ required: true })}
        placeholder="AMZN, FB, MSFT..."
      />
      {errors.symbol && <p className="form__error">A symbol is required</p>}

      <button className="button" type="submit">
        Show Data
      </button>
    </form>
  );
};

export default Form;

import React from "react";
import { useSelector } from "react-redux";
import { getToast } from "../redux/reducers";

export const Toast = () => {
  const message = useSelector(getToast);

  return <div className="blink_me"> {message} </div>;
};

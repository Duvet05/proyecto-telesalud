import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../redux/features/appStateSlice";
import "./styles.css";

const PageWrapper = ({ state, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (state) {
      dispatch(setAppState(state));
    }
  }, [dispatch, state]);

  return <div className="page-wrapper">{children}</div>;
};

export default PageWrapper;

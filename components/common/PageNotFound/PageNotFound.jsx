import React from "react";
import Link from "next/link";
import pageNotFoundIcon from "../images/doc/pageNotFound.svg";

const PageNotFound = () => {
  return (
    <div className="">
      <div className="d-flex justify-content-center align-items-center">
        <img
          src={pageNotFoundIcon}
          alt=""
          style={{ height: "80vh", padding: "2rem 0 0 0" }}
        />
      </div>
      <h3>
        <Link href="/">
          <a className="nav-link text-center">Return To Home</a>
        </Link>
      </h3>
    </div>
  );
};

export default PageNotFound;

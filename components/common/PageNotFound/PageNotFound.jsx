import React from "react";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="">
      <div className="d-flex justify-content-center align-items-center"></div>
      <h3>
        <Link href="/">
          <href className="nav-link text-center">Return To Home</href>
        </Link>
      </h3>
    </div>
  );
};

export default PageNotFound;

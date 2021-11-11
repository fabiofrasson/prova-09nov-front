import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // justify-content-center
  return (
    <div className="flex-column ">
      <p className="display-2 d-flex justify-content-center mt-5 mb-5">
        Welcome to the Contacts App!
      </p>
      <div className="d-grid gap-2 col-6 mx-auto">
        <Link to={"/contacts"} className="btn btn-lg btn-block btn-primary">
          Go to Contacts List
        </Link>
      </div>
    </div>
  );
};

export default Home;

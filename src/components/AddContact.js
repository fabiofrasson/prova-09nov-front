import React, { useState } from "react";
import ContactService from "../services/ContactService";
import { Link } from "react-router-dom";

const AddContact = () => {
  const initialContactState = {
    id: null,
    name: "",
    email: "",
    phone: "",
  };
  const [contact, setContact] = useState(initialContactState);
  const [submitted, setSubmitted] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };

  const saveContact = () => {
    var data = {
      name: contact.name,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
    };

    ContactService.create(data)
      .then((response) => {
        setContact({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newContact = () => {
    setContact(initialContactState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Contact added successfully!</h4>
          <button className="btn btn-success" onClick={newContact}>
            Add one more contact
          </button>
          <Link to={"/contacts"} className="btn btn-success">
            Back to Home
          </Link>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={contact.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={contact.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              required
              value={contact.phoneNumber}
              onChange={handleInputChange}
              name="phoneNumber"
              style={{ marginBottom: 10 }}
            />
          </div>

          <div className="d-flex flex-column justify-content-center">
            <button
              style={{ marginBottom: 10 }}
              className="btn btn-success"
              onClick={saveContact}
            >
              Submit
            </button>
            <Link to={"/contacts"} className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddContact;

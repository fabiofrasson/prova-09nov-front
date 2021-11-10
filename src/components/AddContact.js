import React, { useState } from "react";
import ContactService from "../services/ContactService";

const AddContact = () => {
  const initialContactState = {
    id: null,
    name: "",
    email: "",
    phone: "",
  };
  const [contact, setContact] = useState(initialContactState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };

  const saveContact = () => {
    var data = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    };

    ContactService.create(data)
      .then((response) => {
        setContact({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
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
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newContact}>
            Add
          </button>
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
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              required
              value={contact.phone}
              onChange={handleInputChange}
              name="phone"
            />
          </div>

          <button className="btn btn-success" onClick={saveContact}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddContact;

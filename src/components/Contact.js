import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import ContactService from "../services/ContactService";

const Contact = () => {
  const { id } = useParams();
  const history = useNavigate();

  const initialContactState = {
    id: null,
    name: "",
    email: "",
    phoneNumber: "",
  };

  const [currentContact, setCurrentContact] = useState(initialContactState);
  const [message, setMessage] = useState("");

  const getContact = (id) => {
    ContactService.get(id)
      .then((response) => {
        setCurrentContact(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getContact(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentContact({ ...currentContact, [name]: value });
  };

  const updateContact = () => {
    ContactService.update(currentContact.id, currentContact)
      .then((response) => {
        console.log(response.data);
        setMessage("The contact was updated successfully!");
        history("/contacts");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteContact = () => {
    ContactService.remove(currentContact.id)
      .then((response) => {
        console.log(response.data);
        history("/contacts");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentContact ? (
        <div className="edit-form">
          <h4>Contact</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentContact.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentContact.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={currentContact.phoneNumber}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
            </div>
          </form>

          <div className="d-flex flex-column justify-content-center">
            <button
              style={{ marginBottom: 10 }}
              type="submit"
              className="btn btn-success"
              onClick={updateContact}
            >
              Update Data
            </button>

            <button
              style={{ marginBottom: 10 }}
              className="btn btn-danger mr-2"
              onClick={deleteContact}
            >
              Delete Contact
            </button>

            <Link to={"/contacts"} className="btn btn-primary">
              Back to Contacts
            </Link>
          </div>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Contact...</p>
        </div>
      )}
    </div>
  );
};

export default Contact;

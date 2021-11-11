import React, { useState, useEffect } from "react";
import ContactService from "../services/ContactService";
import { Link } from "react-router-dom";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveContacts();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveContacts = () => {
    ContactService.getAll()
      .then((response) => {
        setContacts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveContacts();
    setCurrentContact(null);
    setCurrentIndex(-1);
  };

  const setActiveContact = (contact, index) => {
    setCurrentContact(contact);
    setCurrentIndex(index);
  };

  const removeAllContacts = () => {
    ContactService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    ContactService.findByName(searchTitle)
      .then((response) => {
        setContacts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Contacts List</h4>

        <ul className="list-group">
          {contacts &&
            contacts.map((contact, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveContact(contact, index)}
                key={index}
              >
                {contact.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllContacts}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentContact ? (
          <div>
            <h4>Contact</h4>
            <div>
              <label htmlFor="">
                <strong>Name:</strong>
              </label>{" "}
              {currentContact.name}
            </div>
            <div>
              <label htmlFor="">
                <strong>Email:</strong>
              </label>{" "}
              {currentContact.email}
            </div>
            <div>
              <label htmlFor="">
                <strong>Phone number:</strong>
              </label>{" "}
              {currentContact.phoneNumber}
            </div>
            <Link
              to={"/contacts/" + currentContact.id}
              className="btn btn-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Contact...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsList;

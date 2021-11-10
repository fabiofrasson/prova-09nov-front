import http from "../http-common";

const getAll = () => {
  return http.get("/contacts");
};

const get = (id) => {
  return http.get("/contacts/${id}");
};

const create = (data) => {
  return http.post("/contacts", data);
};

const update = (id, data) => {
  return http.put("/contacts/${id}", data);
};

const remove = (id) => {
  return http.delete("/contacts");
};

const removeAll = () => {
  return http.delete("/contacts");
};

const findByEmail = (email) => {
  return http.get("/contacts/email/${email}");
};

const findByPhone = (phone) => {
  return http.get("/contacts/phone/${phone}");
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByEmail,
  findByPhone,
};

import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true
});

function errorHandler(error) {
  if (error.response.data) {
    throw error;
  }
  throw error;
}

export default {
  service,

  // ---AUTH--- 
  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // ---USER CRUD---
  getUsers() {
    return service
    .get("/api/user")
    .then((res) => res.data)
    .catch(errorHandler);
  },

  getOneUser(itemId) {
    return service
    .get(`/api/user${itemId}`)
    .then((res) => res.data)
    .catch(errorHandler);
  },

  createUser(newUser) {
    return service
    .post("/api/user/create", newUser)
    .then((res) => res.data)
    .catch(errorHandler);
  },

  deleteUser(userId) {
    return service
    .delete(`/api/user/delete/${userId}`)
    .then((res) => res.data)
    .catch(errorHandler);
  },

  updateUser(userId, updatedInfo) {
    return service
    .patch(`/api/user/edit/${userId}`, updatedInfo)
    .then((res) => res.data)
    .catch(errorHandler);
  },

  // ---VISITS--- 
  getVisits() {
    return service
    .get("/api/visits")
    .then((res) => res.data)
    .catch(errorHandler);
  },

  createVisit(visitInfo) {
    return service
    .post("/api/visits", visitInfo)
    .then((res) => res.data)
    .catch(errorHandler);
  },

  updateVisit(visitId, visitInfo) {
    return service
    .patch(`/api/visits/${visitId}`, visitInfo)
    .then((res) => res.data)
    .catch(errorHandler);
  },

  deleteVisit(visitId) {
    return service
    .delete(`/api/visits/${visitId}`)
    .then((res) => res.data)
    .catch(errorHandler);
  },

  // ---CATEGORIES--- 
  getCategories() {
    return service
    .get("/api/categories")
    .then((res) => res.data)
    .catch(errorHandler);
  },

  createCategory(catefgoryInfo) {
    return service
    .post("/api/categories", catefgoryInfo)
    .then((res) => res.data)
    .catch(errorHandler);
  },

  updateCategory(categoryId, catefgoryInfo) {
    return service
    .patch(`/api/categories/${categoryId}`, catefgoryInfo)
    .then((res) => res.data)
    .catch(errorHandler);
  },

    // ---CONTACT TYPE--- 
    getContactTypes() {
      return service
      .get("/api/contactTypes")
      .then((res) => res.data)
      .catch(errorHandler);
    },
  
    createContactType(contactTypeInfo) {
      return service
      .post("/api/contactTypes", contactTypeInfo)
      .then((res) => res.data)
      .catch(errorHandler);
    },
  
    updateContactType(contactTypeId, contactTypeInfo) {
      return service
      .patch(`/api/contactTypes/${contactTypeId}`, contactTypeInfo)
      .then((res) => res.data)
      .catch(errorHandler);
    },

    //  Insights
    repartitionByCategory(data) {
      return service
      .post("/api/insight/get-category-repartition", data)
      .then((res) => res.data)
      .catch(errorHandler);
    },

    hotTime(data) {
      return service
      .post("/api/insight/get-popular-hours", data)
      .then((res) => res.data)
      .catch(errorHandler);
    },

    repartitionByWeeks(data) {
      return service
      .post("/api/insight/get-popular-days", data)
      .then((res) => res.data)
      .catch(errorHandler);
    },

    getVisitsDateRange(data) {
      return service
        .post("api/insight/visits-list", data)
        .then((res) => res.data)
        .catch(errorHandler);
    }


};




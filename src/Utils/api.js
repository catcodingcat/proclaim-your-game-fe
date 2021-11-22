import axios from "axios";

const ProclaimYourGameApi = axios.create({
  baseURL: "https://proclaim-your-game.herokuapp.com/api",
});

export const getReviews = () => {
  return ProclaimYourGameApi.get("/reviews").then((res) => {
    return res.data.reviews;
  });
};

export const getReview = (id) => {
  return ProclaimYourGameApi.get(`/reviews/${id}`).then((res) => {
    return res.data.review;
  });
};

export const getCategories = () => {
  return ProclaimYourGameApi.get("/categories").then((res) => {
    return res.data.categories;
  });
};

export const getUsers = () => {
  return ProclaimYourGameApi.get("/users").then((res) => {
    return res.data.users;
  });
};

export const getUser = (username) => {
  return ProclaimYourGameApi.get(`/users/${username}`).then((res) => {
    return res.data.user;
  });
};

export const getReviewComments = (id) => {
  return ProclaimYourGameApi.get(`/reviews/${id}/comments`).then((res) => {
    console.log(res.data.comments, "<<<<res comments");
    return res.data.comments;
  });
};

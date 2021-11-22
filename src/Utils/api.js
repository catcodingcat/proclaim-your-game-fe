import axios from "axios";

const ProclaimYourGameApi = axios.create({
  baseURL: "https://proclaim-your-game.herokuapp.com/api",
});

export const getReviews = () => {
  return ProclaimYourGameApi.get("/reviews").then((res) => {
    return res.data.reviews;
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

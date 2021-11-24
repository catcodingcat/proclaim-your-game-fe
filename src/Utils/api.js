import axios from "axios";

const ProclaimYourGameApi = axios.create({
  baseURL: "https://proclaim-your-game.herokuapp.com/api",
});

export const getReviews = (category, sortBy, order) => {
  return ProclaimYourGameApi.get("/reviews", {
    params: { category, sort_by: sortBy, order },
  }).then((res) => {
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
    return res.data.comments;
  });
};

export const patchVotes = (id, inc, type) => {
  return ProclaimYourGameApi.patch(`/${type}/${id}`, { inc_votes: inc }).then(
    (res) => {
      console.log(res.data, "<<<res.data");
      return res.data;
    }
  );
};

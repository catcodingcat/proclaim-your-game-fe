import axios from "axios";

const proclaimYourGameApi = axios.create({
  baseURL: "https://proclaim-your-game.herokuapp.com/api",
});

export const getReviews = (category, sortBy, order) => {
  return proclaimYourGameApi
    .get("/reviews", {
      params: { category, sort_by: sortBy, order },
    })
    .then((res) => {
      return res.data.reviews;
    });
};

export const getReview = (id) => {
  return proclaimYourGameApi.get(`/reviews/${id}`).then((res) => {
    return res.data.review;
  });
};

export const getCategories = () => {
  return proclaimYourGameApi.get("/categories").then((res) => {
    return res.data.categories;
  });
};

export const getUsers = () => {
  return proclaimYourGameApi.get("/users").then((res) => {
    return res.data.users;
  });
};

export const getUser = (username) => {
  return proclaimYourGameApi.get(`/users/${username}`).then((res) => {
    return res.data.user;
  });
};

export const getReviewComments = (id) => {
  return proclaimYourGameApi.get(`/reviews/${id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const patchVotes = (id, inc, type) => {
  return proclaimYourGameApi
    .patch(`/${type}s/${id}`, { inc_votes: inc })
    .then((res) => {
      return res.data[type].votes;
    });
};

export const postComment = (id, comment) => {
  return proclaimYourGameApi
    .post(`/reviews/${id}/comments`, comment)
    .then((res) => {
      return res.data.comment;
    });
};

export const deleteComment = (id) => {
  return proclaimYourGameApi.delete(`/comments/${id}`);
};

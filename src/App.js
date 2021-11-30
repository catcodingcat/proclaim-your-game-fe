import "./App.css";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./Context/user";
import { useContext } from "react";

import CurrentUser from "./Components/CurrentUser";
import Title from "./Components/Title";
import Nav from "./Components/Nav.js";
import Home from "./Components/Home.js";
import Reviews from "./Components/Reviews";
import AllCategories from "./Components/AllCategories";
import AllUsers from "./Components/AllUsers";
import User from "./Components/User";
import SingleReview from "./Components/SingleReview";
import PostComment from "./Components/PostComment";
import PathError from "./Components/PathError";

function App() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="App">
      <CurrentUser />
      <Title />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/reviews/category/:category" element={<Reviews />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/users/:username" element={<User />} />
        <Route path="/reviews/:review_id/comments" element={<PostComment />} />
        <Route path="/reviews/:review_id" element={<SingleReview />} />
        <Route path="/*" element={<PathError />} />
      </Routes>
    </div>
  );
}

export default App;

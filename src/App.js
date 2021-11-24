import "./App.css";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./Context/user";
import { useContext } from "react";

import Login from "./Components/Login";
import Title from "./Components/Title";
import Nav from "./Components/Nav.js";
import Home from "./Components/Home.js";
import AllReviews from "./Components/AllReviews";
import AllCategories from "./Components/AllCategories";
import AllUsers from "./Components/AllUsers";
import User from "./Components/User";
import Review from "./Components/Review";

// const RequireLogin = ({ children }) => {
//   const { isLoggedIn } = useContext(UserContext);
//   return isLoggedIn ? children : <Login />;
// };

function App() {
  const { user, setUser, isLoggedIn } = useContext(UserContext);
  return (
    <div className="App">
      {/* {isLoggedIn ? (
        <button
          onClick={() => {
            setUser({});
          }}
        >
          Log out
        </button>
      ) : (
        <button
          onClick={() => {
            setUser({ username: "Cat" });
          }}
        >
          {" "}
          Log in
        </button> */}
      {/* )} */}
      <Title />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<AllReviews />} />
        <Route path="/reviews/category/:category" element={<AllReviews />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/users/:username" element={<User />} />
        <Route path="/reviews/:review_id" element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;

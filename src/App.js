import "./App.css";
import { Routes, Route } from "react-router-dom";
import Title from "./Components/Title";
import Nav from "./Components/Nav.js";
import Home from "./Components/Home.js";
import AllReviews from "./Components/AllReviews";
import AllCategories from "./Components/AllCategories";
import AllUsers from "./Components/AllUsers";
import User from "./Components/User";
import Review from "./Components/Review";

function App() {
  return (
    <div className="App">
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

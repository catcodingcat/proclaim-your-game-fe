import { UserContext } from "../Context/user";
import { useContext } from "react";

export default function CurrentUser() {
  const { currentUser } = useContext(UserContext);
  return (
    <section id="login">
      <button>Login</button>
    </section>
  );
}

import React from "react";
import { Link } from "@reach/router";

export default function LoggedUserInfo(props) {
  return (
    <section className="logInfo">
      {props.loggedUser ? (
        <div>
          <label>
            <img
              src={props.loggedUserImg}
              alt={`${props.loggedUser} profile avatar`}
              className="smallLoginAvatar"
            />
            <br />
            {props.loggedUser}
          </label>
          <br />
          <button value={null} onClick={props.handleLogin} id="permLogoutBtn">
            Logout
          </button>
        </div>
      ) : (
        <Link to="/">
          <button>Login</button>
        </Link>
      )}
    </section>
  );
}

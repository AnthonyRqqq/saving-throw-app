import { Link, useLocation } from "react-router-dom";
import LoginForm from "./Account/LoginForm";
import SignupForm from "./Account/SignupForm";
import Auth from "../utils/auth";
import { useState } from "react";

export default function Navigation() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(null);

  const currentPage = useLocation().pathname;

  return (
    <div className={`${currentPage === "/" ? "" : "row"} : `}>
      <LoginForm
        show={showLogin}
        setShowSignupForm={setShowSignupForm}
        onHide={() => setShowLogin(false)}
      />
      <SignupForm
        show={showSignupForm}
        setShowLogin={setShowLogin}
        onHide={() => setShowSignupForm(false)}
      />

      <h1
        className={`${
          currentPage === "/"
            ? "justify-content-center"
            : "justify-content-start"
        } col`}
      >
        <Link
          to="/"
          className={`${
            currentPage === "/" ? "nav-link active-link" : "nav-link"
          } link-item title`}
        >
          Saving Throws
        </Link>
      </h1>

      <ul
        className={`${
          currentPage === "/"
            ? "row homepage-nav-options"
            : "col justify-content-end"
        } nav `}
      >
        {/* Link to login page, changes to logout button if user logged in */}
        {!Auth.loggedIn() ? (
          <li className="nav-item">
            <Link
              to={currentPage}
              onClick={() => setShowLogin(true)}
              className={`${
                currentPage === "/login" ? "nav-link active-link" : "nav-link"
              } link-item`}
            >
              Login / Signup
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <Link
              to="/"
              className={`${
                currentPage === "/" ? "nav-link active-link" : "nav-link"
              } link-item`}
              onClick={() => Auth.logout()}
            >
              Logout
            </Link>
          </li>
        )}

        <li className="nav-item">
          <Link
            to="/conditions"
            className={`${
              currentPage === "/conditions" ? "active-link" : ""
            } link-item nav-link`}
          >
            Conditions
          </Link>
        </li>

        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Spells
          </a>
          <ul
            className="dropdown-menu"
            aria-labelledby="navbarDropdown"
            style={{ minWidth: "auto" }} // Adjusting dropdown width
          >
            <li>
              <Link
                to="/spells"
                className={`${
                  currentPage === "/spells"
                    ? "dropdown-item active-link"
                    : "dropdown-item"
                } link-item`}
              >
                View Spells
              </Link>
            </li>
            {Auth.loggedIn() && (
              <li>
                <Link
                  to="/spellLists"
                  className={`${
                    currentPage === "/spells"
                      ? "dropdown-item active-link"
                      : "dropdown-item"
                  } link-item`}
                >
                  View My Spell Lists
                </Link>
              </li>
            )}
          </ul>
        </li>

        {/* Weather dropdown */}
        {Auth.loggedIn() && (
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Weather
            </a>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
              style={{ minWidth: "auto" }} // Adjusting dropdown width
            >
              <li>
                <Link
                  to="/weather/create"
                  className={`${
                    currentPage === "/weather/create"
                      ? "dropdown-item active-link"
                      : "dropdown-item"
                  } link-item`}
                >
                  Create Weather Link
                </Link>
              </li>

              <li>
                <Link
                  to="/weather/display"
                  className={`${
                    currentPage === "/weather/display"
                      ? "dropdown-item active-link"
                      : "dropdown-item"
                  } link-item`}
                >
                  Weather Display
                </Link>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}

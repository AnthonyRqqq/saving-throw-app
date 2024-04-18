import { Link, useLocation } from "react-router-dom";
import Auth from "../utils/auth";

export default function Navigation() {
  const currentPage = useLocation().pathname;

  return (
    <div className="row">
      <h1 className="col justify-content-start">Saving Throw</h1>

      <ul className="nav col justify-content-end">
        {/* Link to homepage */}
        <li className="nav-item">
          <Link
            to="/"
            className={`${
              currentPage === "/" ? "nav-link active-link" : "nav-link"
            } link-item`}
          >
            Home
          </Link>
        </li>

        {/* Link to login page, changes to logout button if user logged in */}
        {!Auth.loggedIn() ? (
          <li className="nav-item">
            <Link
              to="/login"
              className={`${
                currentPage === "/login" ? "nav-link active-link" : "nav-link"
              } link-item`}
            >
              Login
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

        {/* Link to signup page, hidden once user is logged in */}
        {!Auth.loggedIn() && (
          <li className="nav-item">
            <Link
              to="/signup"
              className={`${
                currentPage === "/signup" ? "nav-link active-link" : "nav-link"
              } link-item`}
            >
              Signup
            </Link>
          </li>
        )}

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

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from "./App.jsx";
// import WeatherSearch from "../com/WeatherSearch";
import WeatherSearch from "./components/Weather/WeatherSearch.jsx";
import WeatherDisplay from "./components/Weather/WeatherDisplay.jsx";
import Spells from "./components/Spells/Spells.jsx";
import Conditions from "./components/Conditions/Conditions.jsx";
import SpellLists from "./components/Spells/SpellList.jsx";
import DevNotes from "./components/Blog/Blog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/weather/create",
        element: <WeatherSearch />,
      },
      {
        path: "/weather/display",
        element: <WeatherDisplay />,
      },
      {
        path: "/spells",
        element: <Spells />,
      },
      {
        path: "/spells/:createNewList",
        element: <Spells />,
      },
      {
        path: "/spellLists",
        element: <SpellLists />,
      },
      {
        path: "/spellLists/:listId?",
        element: <Spells />,
      },
      {
        path: "/conditions",
        element: <Conditions />,
      },
      {
        path: "/devnotes",
        element: <DevNotes />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

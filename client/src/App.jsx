import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./App.css";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const currentPage = useLocation().pathname;

  return (
    // ApolloProvider wrapper enables access to ApolloClient from anywhere in program
    <ApolloProvider client={client}>
      {currentPage === "/" ? (
        <div className="homepage-navigation">
          <Navigation />
        </div>
      ) : (
        <>
          <header className="header">
            <h3>
              <Navigation />
            </h3>
          </header>

          <main className="main">
            <Outlet />
          </main>
        </>
      )}
    </ApolloProvider>
  );
}

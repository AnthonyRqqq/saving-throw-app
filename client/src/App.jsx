import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Footer from "./components/Footer";

import "./App.css";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    // ApolloProvider wrapper enables access to ApolloClient from anywhere in program
    <ApolloProvider client={client}>
      <header className="header">
        <h3>
          <Navigation />
        </h3>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <Footer />
      </footer>
    </ApolloProvider>
  );
}

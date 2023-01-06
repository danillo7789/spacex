import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import logo from "./logo.png";
import Launches from "./components/Launches";
import Launch from "./components/Launch";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import "./App.css";

const client = new ApolloClient({
  // uri: "http://localhost:5000/graphql",
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img
            src={logo}
            alt="SpaceX"
            style={{ width: 300, display: "block", margin: "auto" }}
          />
          <Routes>
            <Route exact path="/" element={<Launches />} />
            <Route exact path="/launch/:flight_number" element={<Launch />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

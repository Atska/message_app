import * as React from "react";
import { useQuery } from "@apollo/client";

import NavBar from "./components/NavBar";
import Card from "./components/Card";

//queries
import { allPosts } from "./graphql/queries/allPosts";

const App: React.VFC = () => {
  const { loading, error, data } = useQuery(allPosts);

  return (
    <div className="App">
      <NavBar />
      <Card data={data} loading={loading} />
    </div>
  );
};

export default App;

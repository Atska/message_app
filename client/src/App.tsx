import * as React from "react";
import { useQuery } from "@apollo/client";

import NavBar from "./components/NavBar";
import Card from "./components/Card";
import "./App.css";

//queries
import { allPosts } from "./graphql/queries/allPosts";

const App: React.VFC = () => {
  const { loading, error, data } = useQuery(allPosts);

  if (loading) return <p>Loading ...</p>;

  return (
    <div className="App">
      <NavBar />
      <div className="grid">
        {data.allPosts.map((post: any) => {
          return (
            <Card
              key={post.id}
              username={post.username}
              date={post.date}
              text={post.text}
              likes={post.likes}
              comments={post.comments}
              loading={loading}
              error={error}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;

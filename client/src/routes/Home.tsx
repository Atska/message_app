import React from "react";
import { useQuery } from "@apollo/client";
import Card from "../components/Card";
//queries
import { allPosts } from "../graphql/queries/allPosts";

function Home() {
  const { loading, error, data } = useQuery(allPosts);

  if (loading) return <p>Loading ...</p>;
  return (
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
  );
}

export default Home;

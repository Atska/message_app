import React from "react";
import { useQuery } from "@apollo/client";
import Card from "../components/Card";
import Post from "../components/Post";
//queries
import { allPosts } from "../graphql/queries/allPosts.query";

interface IHome {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Home({ loggedIn, setLoggedIn }: IHome) {
  const { loading, error, data } = useQuery(allPosts);

  if (loading) return <p>Loading ...</p>;
  return (
    <div className="home">
      <Post />
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
}

export default Home;

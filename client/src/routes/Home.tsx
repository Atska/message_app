import { useContext } from "react";
import { useQuery } from "@apollo/client";
import Card from "../components/Card";
import Post from "../components/Post";
import { AuthContext } from "../context";
//queries
import { allPosts } from "../graphql/queries/allPosts.query";
import "./Home.css";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(allPosts);

  if (loading) return <p>Loading ...</p>;
  return (
    <div className="home">
      <div className="grid">
        {user ? <Post /> : ""}
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

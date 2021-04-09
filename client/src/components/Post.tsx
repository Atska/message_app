import React, { useState } from "react";
import { ApolloError, useMutation } from "@apollo/client";

import { allPosts } from "../graphql/queries/allPosts.query";
import { CREATE_POST } from "../graphql/mutations/post.mutation";
import "./Post.css";

function Post(): JSX.Element {
  const [post, setPost] = useState<string>("");
  const [errors, setErrors] = useState<string>("");

  const [createPost] = useMutation(CREATE_POST, {
    update(cache, result) {
      const data: any = cache.readQuery({ query: allPosts });
      let newData = [...data.allPosts];
      newData = [result.data.createPost, ...newData];
      cache.writeQuery({
        query: allPosts,
        data: {
          ...data,
          allPosts: {
            newData,
          },
        },
      });
    },
    onError(err: ApolloError) {
      const e: any = err.graphQLErrors[0].message;
      console.log(err);
      setErrors(e);
    },
    variables: {
      text: post,
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setPost(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    createPost();
    setPost("");
  };

  const handleCancel = (): void => {
    setPost("");
  };

  return (
    <div className="post">
      <div className="post-container">
        <h2>Write a Post!</h2>
        <form className="post-form" onSubmit={handleSubmit}>
          <textarea
            name="comment"
            placeholder="What do you want to post?"
            value={post}
            onChange={handleChange}
          ></textarea>
          <div className="post-btns">
            <button className="submit-btn">Submit</button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
        <div className="error-msg">{errors}</div>
      </div>
    </div>
  );
}

export default Post;

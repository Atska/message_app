import * as React from "react";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { ApolloError } from "@apollo/client";
import relativeTime from "dayjs/plugin/relativeTime";
//icons
import { AiFillHeart, AiFillMessage } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import "./Card.css";
import logo from "../avatars/5.jpg";

interface ILike {
  username: string;
  date: string;
}

interface IComment {
  text: string;
  username: string;
  date: string;
}

interface ICard {
  username: string;
  date: string;
  text: string;
  likes: ILike[];
  comments: IComment[];
  loading: boolean;
  error: ApolloError | undefined;
}

const Card = ({
  username,
  date,
  text,
  likes,
  comments,
  loading,
  error,
}: ICard) => {
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>404..</p>;

  //format ISO-string time to relative time
  dayjs.extend(relativeTime);

  const token: any = localStorage.getItem("token");

  let currUser;
  if (token) {
    const decoded: any = jwt_decode(token);
    if ((decoded.username = username)) currUser = username;
    console.log(decoded.username, username);
  }

  return (
    <div className="container-post">
      <div className="container-card">
        <div className="container-header">
          <div className="image-card">
            <img src={logo} alt="avatar" className="profile-image"></img>
          </div>
          <div className="container-userinfo">
            <h1 className="username">{username}</h1>
            <p className="date">Posted {dayjs(date).fromNow()}</p>
          </div>
        </div>
        <div className="container-wrap">
          <div className="container-message">
            <div className="message">
              <p>{text}</p>
            </div>
          </div>
          <div className="container-btns">
            <div className="action-btns flex">
              <div className="like-btn flex">
                <button className="flex-btn">
                  {likes.length}
                  <AiFillHeart />
                </button>
              </div>
              <div className="comment-btn flex">
                <button className="flex-btn">
                  {comments.length}
                  <AiFillMessage />
                </button>
              </div>
            </div>
            <div className="post-btns flex">
              <div className="update-btn">
                {currUser ? (
                  <button className="flex-btn">
                    <FaEdit />
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="post-btn">
                <button>
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

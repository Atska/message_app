import * as React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//icons
import { AiFillHeart, AiFillMessage } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import "./Card.css";
import logo from "../avatars/5.jpg";

interface ICard {}

const Card = (props: any) => {
  const { error, loading } = props;

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>404..</p>;

  const { username, date, text, likes, comments } = props;

  //format ISO-string time to relative time
  dayjs.extend(relativeTime);

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
              <p>
                Hurensöhne alles hurensöhn diese miesen hurensöhne allese
                verfickte missgeburten arschkfksfks dsknfsnvsjn fsjfsknfskfnsk
                Pimmmmmmdsl sdjkdsnsnfsnuwf das ist das hjaus vidn das ist das
                Haus vom Nicolaus der sankt martin kam aus frankreich und gab
                seinen mantel einen penner der ein lied für ihn sang.
              </p>
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
                <button className="flex-btn">
                  <FaEdit />
                </button>
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

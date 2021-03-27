import * as React from "react";
import "./Card.css";
import logo from "../avatars/1.jpg";

//icons
import { AiFillHeart, AiFillMessage } from "react-icons/ai";
import { FaEdit, FaPenFancy } from "react-icons/fa";

const filler =
  "Im Haus war eine kleine Maus, die ging hinein und wieder hinaus. Der Käse war gut versteckt an einer sicheren Eck. Der Hunger trieb die Maus wild und sie suchte lange nach etwas zu essen. Oben am Fluss gibt es eine Wiese. Dort wachsen Blumen in allerlei Farben und Formen. Die einen sind blau und haben nur vier Blätter, andere jedoch sind bunt wie ein Regenbogen.";
const Card = (props: { data: any; loading: boolean }) => {
  const { data, loading } = props;
  try {
    console.log(data.allPosts[0]);
  } catch (err) {
    console.log(err);
  }
  if (loading) return <p>Loading ...</p>;
  const { username, date, text, likes, comments } = data.allPosts[0];

  return (
    <div className="container-card">
      <div className="container-header">
        <div className="image-card">
          <img src={logo} alt="avatar" className="profile-image"></img>
        </div>
        <div className="container-userinfo">
          <p className="username">{username}</p>
          <p className="date">{date}</p>
        </div>
      </div>
      <div className="container-message">
        <div className="message">
          <p>{filler}</p>
        </div>
      </div>
      <div className="container-btns">
        <div className="action-btns">
          <div className="like-btn">
            <button>
              <AiFillHeart />
            </button>
          </div>
          <div className="comment-btn">
            <button>
              <AiFillMessage />
            </button>
          </div>
        </div>
        <div className="post-btns">
          <div className="update-btn">
            <button>
              <FaEdit />
            </button>
          </div>
          <div className="post-btn">
            <button>
              <FaPenFancy />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

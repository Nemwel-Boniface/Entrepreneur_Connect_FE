import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removePost } from '../../redux/post/postSlice';

const Post = (props) => {
  const { post } = props;
  const {
    id,
    author,
    created_at,
    tags,
    body,
    image,
    likes_count, // Make sure the property names match the API response
  } = post;

  const [isActive, setActive] = useState(false);

  const toggleActiveClass = () => {
    setActive(!isActive);
  };

  const removeActive = () => {
    setActive(false);
  };

  // Changes to state
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removePost({ id }));
    removeActive();
  };

  return (
    <div className="Post">
      <div className="postHeader">
        <div className="postHeaderLeft">
          <img src={author.image} alt="" />
          <div className="postHeaderLeftAuthor">
            <h2>{author.username}</h2>
            <p>{created_at}</p>
          </div>
        </div>

        <div className="postHeaderRight">
          <button type="button" onClick={toggleActiveClass}>
            <i className="fa fa-ellipsis-v" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="postBody">
        <p>{body}</p>
        <img src={image} alt="" />
      </div>

      <div className="taglist">
        <ul className="techstacks">
          {tags.map((tag) => (
            <li key={tag}>
              #
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="postInteractions">
        <div className="postInteractionsLeft">
          <p>
            <i className="fa fa-heart" aria-hidden="true" />
            {likes_count}
          </p>
          <p>
            <i className="fa fa-comment" aria-hidden="true" />
            12
          </p>
        </div>

        <div className="postInteractionsRight">
          <button type="button">
            <i className="fa fa-heart" aria-hidden="true" />
            Like
          </button>
          <button type="button">
            <i className="fa fa-comment" aria-hidden="true" />
            Comment
          </button>
        </div>
      </div>
      {
        isActive
          ? (
            <div className="postDelEdit">
              <button type="button" onClick={removeActive}>
                Edit Post
              </button>
              <button type="button" onClick={handleDelete}>
                Delete Post
              </button>
            </div>
          ) : ''
      }
    </div>
  );
};

export default Post;

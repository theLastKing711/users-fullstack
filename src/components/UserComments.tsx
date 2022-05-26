import React from "react";
import styled from "styled-components";
import { Comment, UserWithComments } from "../common/types";
import AddComment from "./AddComment";

const StyledComments = styled.ul`
  list-style: none;

  .comments-section {
    &__item {
      padding: 1rem;
      margin-top: 1rem;
      background-color: gray;
      border: 1px solid black;
      border-radius: 4px;
    }

    &__sender-container {
      display: flex;
      gap: 0.5rem;
    }

    &__title-container {
      display: flex;
      gap: 0.5rem;
    }

    &__title-value {
      flex: 1;
    }

    &__delete-button {
      color: red;
      cursor: pointer;
    }

    &__body-container {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
  }
`;

interface Props {
  userWithComments: UserWithComments;
  handleDeleteComment: (id: number) => void;
  handleAddComment: (comment: Comment) => void;
}

const UserComments: React.FC<Props> = ({
  userWithComments,
  handleDeleteComment,
  handleAddComment,
}) => {
  return (
    <div>
      <h2>user comments ({userWithComments.comments.length})</h2>
      <StyledComments className="comments-section">
        {userWithComments.comments.map((comment) => (
          <li key={comment.id} className="comments-section__item">
            <div className="comments-section__title-container">
              <div>title:</div>
              <div className="comments-section__title-value">
                {" "}
                {comment.title}
              </div>
              <div
                className="comments-section__delete-button"
                onClick={() => handleDeleteComment(comment.id)}
              >
                delete
              </div>
            </div>
            <hr />
            <div className="comments-section__body-container">
              <div>body:</div>
              <div> {comment.body}</div>
            </div>
          </li>
        ))}
      </StyledComments>
    </div>
  );
};

export default UserComments;

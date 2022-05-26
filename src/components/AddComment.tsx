import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import styled from "styled-components";
import { Comment } from "../common/types";

const CommentContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 3rem;

  .submit-comment-button {
    margin-top: 1rem;
  }
`;

interface Props {
  handleAddComment: (comment: Comment) => void;
}

const AddComment: React.FC<Props> = ({ handleAddComment }) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setBody(e.target.value);
  };

  const handleSubmit = (): void => {
    let comment: Comment = {
      id: 0,
      title,
      body,
    };

    handleAddComment(comment);
    setTitle("");
    setBody("");
  };

  return (
    <CommentContainer>
      <h2>Add a comment</h2>
      <TextField
        id="outlined-multiline-static"
        name="title"
        label="title"
        fullWidth
        onChange={handleTitleChange}
      />
      <TextField
        id="outlined-multiline-static"
        name="body"
        label="body"
        multiline
        rows={4}
        fullWidth
        style={{ marginTop: "1rem" }}
        onChange={handleBodyChange}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className="submit-comment-button"
        onClick={handleSubmit}
      >
        submit
      </Button>
    </CommentContainer>
  );
};

export default AddComment;

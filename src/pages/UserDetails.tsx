import { flexbox } from "@mui/system";
import React, { useEffect } from "react";

import { Comment, User, UserWithComments } from "../common/types";

import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addUserComment,
  deleteUserComment,
  fetchUserById,
  isLoading,
  updateUser,
  userWithComments,
} from "../features/user/userSlice";
import UserDetailsForm from "../components/UserDetailsForm";
import Loading from "./Loading";
import UserComments from "../components/UserComments";
import AddComment from "../components/AddComment";

const UserDetails = () => {
  const dispatch = useAppDispatch();
  const userDetails: UserWithComments = useAppSelector(userWithComments);
  const loading: boolean = useAppSelector(isLoading);

  let { id } = useParams();

  const handleSubmit = (user: User) => {
    let newId = id || "1";
    dispatch(updateUser({ user, id: newId })).then((res) => {
      toast("user updated succesfully");
    });
  };

  const handleDeleteComment = (id: number): void => {
    dispatch(deleteUserComment(id)).then((item) => {
      toast("User Comment deleted successfully");
    });
  };

  const handleAddComment = (comment: Comment): void => {
    let newId: number | undefined = parseInt(id || "1");

    dispatch(addUserComment({ comment, id: newId })).then((item) => {
      toast("comment added successfully");
    });
  };

  const handleClose = (valeu: string) => {
    console.log(valeu);
  };

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <UserDetailsForm
        handleSubmit={handleSubmit}
        userDetails={userDetails}
        isUpdateForm={true}
        onClose={handleClose}
      />
      <UserComments
        userWithComments={userDetails}
        handleDeleteComment={handleDeleteComment}
        handleAddComment={handleAddComment}
      />
      <AddComment handleAddComment={handleAddComment} />
    </div>
  );
};

export default UserDetails;

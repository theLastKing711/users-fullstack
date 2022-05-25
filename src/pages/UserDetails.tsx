import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container, flexbox } from "@mui/system";
import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { User, UserResponse, UserWithComments } from "../common/types";
import { useFormik } from "formik";
import { postData, updateData, useFetch } from "../features/user/userApi";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  deleteUserComment,
  fetchUserById,
  isLoading,
  updateUser,
  user,
  userWithComments,
} from "../features/user/userSlice";
import UserDetailsForm from "../components/UserDetailsForm";
import Loading from "./Loading";
import UserComments from "../components/UserComments";

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

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <UserDetailsForm handleSubmit={handleSubmit} userDetails={userDetails} />
      <UserComments
        userWithComments={userDetails}
        handleDeleteComment={handleDeleteComment}
      />
    </div>
  );
};

export default UserDetails;

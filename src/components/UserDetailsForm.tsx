import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container, flexbox } from "@mui/system";
import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { User, UserResponse } from "../common/types";
import { useFormik } from "formik";
import { postData, updateData, useFetch } from "../features/user/userApi";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchUserById, user } from "../features/user/userSlice";

const StyledContainer = styled.div`
  header {
    display: flex;
    gap: 1rem;
    border-bottom: 2px solid black;
    margin-bottom: 4rem;
  }

  .user-input {
    .MuiFormControl-root {
      border-radius: 4px;
      width: 100%;

      .MuiOutlinedInput-input {
        /* color: yellow; */
      }
    }

    &__error {
      margin: 0.5rem 0;
      color: red;
    }
  }

  footer {
    .footer-actions {
      margin-top: 4rem;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: 1rem;

      @media only screen and (min-width: 660px) {
        flex-direction: row;
      }

      button {
        padding: 0.5rem 4rem;
      }

      .back-button {
        flex: 1;
      }
    }

    border-top: 1px solid black;
  }
`;

const initaleUserState: UserResponse = {
  id: 0,
  name: "",
  email: "",
  password: "",
  created_at: "",
  updated_at: "",
};

const validate = (values: UserResponse): {} => {
  const errors: User = {} as User;

  if (!values.name) {
    errors.name = "Name Is Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "password is Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }

  return errors;
};

interface Props {
  userDetails: UserResponse;
  handleSubmit: (newUser: User) => void;
  isUpdateForm?: boolean;
  onClose: (value: string) => void;
}

const UserDetailsForm: React.FC<Props> = ({
  userDetails,
  handleSubmit,
  isUpdateForm,
  onClose,
}) => {
  const formik = useFormik({
    initialValues: userDetails || initaleUserState,
    validate,
    enableReinitialize: true,
    onSubmit: (values: UserResponse, { resetForm }): void => {
      const newuser: User = { ...values };

      handleSubmit(newuser);
    },
  });

  const close = (vale: string) => {};

  return (
    <StyledContainer>
      <Paper style={{ padding: "1.5rem" }}>
        <header>
          <AiOutlineUser style={{ fontSize: "3.5rem" }} />
          <Typography variant="h2" component="h2">
            User Info
          </Typography>
        </header>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            rowGap={"4rem"}
            spacing={2}
            style={{ marginBottom: "4rem" }}
          >
            <Grid item xs={12} sm={6} lg={4}>
              <div className="user-input">
                <TextField
                  id="name"
                  label="user name"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  name="name"
                  error={
                    formik.errors.name && formik.touched.name ? true : false
                  }
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <h5 className="user-input__error">
                  {formik.touched.name && formik.errors.name}
                </h5>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <div className="user-input">
                <TextField
                  id="email"
                  label="email"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  name="email"
                  error={
                    formik.errors.email && formik.touched.email ? true : false
                  }
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <h5 className="user-input__error">
                  {formik.touched.email && formik.errors.email}
                </h5>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <div className="user-input">
                <TextField
                  id="password"
                  label="password"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  name="password"
                  value={formik.values.password}
                  error={
                    formik.errors.password && formik.touched.password
                      ? true
                      : false
                  }
                  onChange={formik.handleChange}
                />
                <h5 className="user-input__error">
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null}
                </h5>
              </div>
            </Grid>
          </Grid>

          <footer>
            <div className="footer-actions">
              <Button variant="contained" color="primary" type="submit">
                {isUpdateForm ? "Update" : "submit"}
              </Button>
              <Link to="/users">
                <Button
                  variant="contained"
                  color="error"
                  className="back-button"
                  onClick={() => onClose("true")}
                >
                  back
                </Button>
              </Link>
            </div>
          </footer>
        </form>
      </Paper>
    </StyledContainer>
  );
};

export default UserDetailsForm;

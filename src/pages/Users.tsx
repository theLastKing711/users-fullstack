import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { User } from "../common/types";

import ControllerTablePagination from "../components/ControllerTablePagination";
import UserDialog from "../components/UserDialog";
import {
  fetchUsers,
  deleteUser,
  isLoading,
  users,
  createUser,
  userPage,
  userRowPerPage,
  UpdateUsersRowsPerPage,
  updateUsersPagination,
  filterdUsers,
} from "../features/user/userSlice";
import Loading from "./Loading";

const Users = () => {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector(users);
  const usersFiltered = useAppSelector(filterdUsers);
  const page = useSelector(userPage);
  const rowsPerPage = useSelector(userRowPerPage);
  const loading = useAppSelector(isLoading);

  const removeUser = (id: number) => {
    dispatch(deleteUser(id));
    toast("user deleted successfully");
  };

  const addUser = (user: User) => {
    dispatch(createUser(user)).then((item) => {
      toast("user added successfully");
    });
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    dispatch(updateUsersPagination(page));
  };

  useEffect(() => {
    dispatch(fetchUsers());
    console.log("users", usersList);
  }, []);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(UpdateUsersRowsPerPage(event.target.value));
  };

  useEffect(() => {
    dispatch(fetchUsers());
    console.log("users", usersList);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (usersFiltered.length === 0) {
    return <UserDialog handleSubmit={addUser} />;
  }

  return (
    <div>
      <UserDialog handleSubmit={addUser} />

      <TableContainer
        component={Paper}
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">name</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="center">created at</TableCell>
              <TableCell align="center">updated at</TableCell>
              <TableCell align="center">details</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersFiltered.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  {row.created_at &&
                    new Date(row.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  {row.updated_at &&
                    new Date(row.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <Link to={`${row.id}`}>
                    <IconButton size="small" style={{ color: "black" }}>
                      <AiFillEye />
                    </IconButton>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    style={{ color: "red" }}
                    onClick={() => removeUser(row.id)}
                  >
                    <FaTrashAlt />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ControllerTablePagination
        page={page}
        // setPage={setPage}
        handlePageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        count={usersList.length}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Users;

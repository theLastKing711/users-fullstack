import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { AppDispatch, RootState } from "../app/store";
import { fetchUsers, users } from "../features/user/userSlice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const usersList = useAppSelector(users);

  useEffect(() => {
    dispatch(fetchUsers()).then((item) => {
      console.log("item", item);
      console.log("users", usersList);
    });
  }, []);

  return <div>Home</div>;
};

export default Home;

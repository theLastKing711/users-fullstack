import { isVisible } from "@testing-library/user-event/dist/types/utils";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Home from "../pages/Home";
import UserDetails from "../pages/UserDetails";
// import TestForm from "../pages/TestForm";
// import UserDetails from "../pages/UserDetails";
// import UserForm from "../pages/UserForm";
import Users from "../pages/Users";

 interface routeParams {
    id: number;
    name: string;
    url: string;
    isVisible: boolean;
    component: React.FC;
  }
  
  export const pages: routeParams[] = [
    // { id: 1, name: "home", url: "" , component: Home, isVisible: true },
    // { id: 2, name: "about", url: "about", component: About, isVisible:true },
    // { id: 3, name: "contact us", url: "contactus", component: ContactUs, isVisible: true },
    // // { id: 4, name: "User Form", url: "user-form", component: <UserForm },
    { id: 5, name: "users", url: "users", component: Users, isVisible: true },
    { id: 6, name: "userDetails", url: "users/:id", component: UserDetails, isVisible: false },

  ];

  export const apiURL: string = 'http://127.0.0.1:8000/api/'
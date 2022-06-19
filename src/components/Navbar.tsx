import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { pages } from "../utils/constants";

const StyledNavbar = styled.nav`
  height: 10rem;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 3rem;

  @media only screen and (max-width: 995px) {
    flex-direction: column;

    .logo,
    .random-item {
      display: none;
    }
  }

  .logo {
    font-size: 3rem;
  }

  .random-item {
    font-size: 3rem;
  }
  a {
    text-decoration: none;
    color: black;
  }

  @media only screen and (max-width: 600px) {
    height: 18rem;
  }
  .page-routes {
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;

    padding: 0rem;

    &__item {
      flex: 1;
      font-size: 2rem;
      margin: 0;
    }

    @media only screen and (max-width: 600px) {
      display: flex;
      flex-direction: column;

      .logo,
      .random-item {
        display: none;
      }
    }
  }
`;

const Navbar = () => {
  const pagesLinks = pages.map((item) => {
    return (
      <Link to={`/${item.url}`} key={item.id}>
        <li className="page-routes__item">{item.isVisible && item.name}</li>
      </Link>
    );
  });

  return (
    <StyledNavbar>
      <ul className="page-routes">{pagesLinks}</ul>
    </StyledNavbar>
  );
};

export default Navbar;

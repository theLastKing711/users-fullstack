import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const ControllerPagination = () => {
  const [page, setPage] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  //   useEffect(() => {
  //     alert(page);
  //   }, [page]);

  return (
    <StyledPagination>
      <Pagination count={6} page={page} onChange={handleChange} />
    </StyledPagination>
  );
};

export default ControllerPagination;

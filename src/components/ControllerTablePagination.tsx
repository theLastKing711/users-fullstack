import { TablePagination } from "@mui/material";
import React, { useState } from "react";

interface Props {
  page: number;
  count: number;
  rowsPerPage: number;
  handlePageChange: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  handleChangeRowsPerPage:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}

const ControllerTablePagination: React.FC<Props> = ({
  page,
  count,
  handlePageChange,
  handleChangeRowsPerPage,
  rowsPerPage,
  //   onRowsPerPageChange,
}) => {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handlePageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default ControllerTablePagination;

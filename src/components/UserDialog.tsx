import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
// import PersonIcon from "@mui/icons-material/Person";
// import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import UserForm from "../components/UserDetailsForm";
import { User, UserResponse } from "../common/types";
import { toast } from "react-toastify";
import UserDetailsForm from "./UserDetailsForm";

const emails = ["username@gmail.com", "user02@gmail.com"];

const initialUser: UserResponse = {
  id: 0,
  name: "",
  email: "",
  password: "",
  created_at: "",
  updated_at: "",
};

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  handleSubmit: (user: User) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, handleSubmit } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add new user</DialogTitle>
      <UserDetailsForm handleSubmit={handleSubmit} userDetails={initialUser} />
    </Dialog>
  );
}

export interface UserDialogProps {
  handleSubmit: (user: User) => void;
}

export default function UserDialog({ handleSubmit }: UserDialogProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        add new user
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

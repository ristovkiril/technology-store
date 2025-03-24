import {useState} from "react";
import {
  Avatar,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography
} from "@mui/material";
import {NavLink} from "react-router-dom";
import {IconLogout2, IconSettings} from "@tabler/icons-react";
import {auth} from "@/firebase.js";
import {drawerWidth} from "@/features/layouts/auth-layout/components/Sidebar.jsx";
import {useAuthContext} from "@/context/auth-context.jsx";


export const SettingsButton = () => {
  const {user, handleLogout} = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          borderRadius: 3,
          my: 0.5,
          "&:hover": {
            bgcolor: "#76ABAE32", // Change the active background color here
          },
        }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <ListItemIcon><IconSettings/></ListItemIcon>
        <ListItemText primary={"Settings"} primaryTypographyProps={{sx: {fontWeight: "inherit"}}}/>
      </ListItemButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            sx: {
              maxWidth: `calc(${drawerWidth}px - 40px)`,
              width: "100%",
              borderRadius: 3,
              p: 2,
              bgcolor: "background.main"
            }
          }
        }}
      >
        <Stack direction={"row"} gap={2} alignItems={"center"} sx={{mb: 1}}>
          <Avatar
            src={user?.photoURL}
          />
          <Typography fontWeight={600}>{user?.displayName}</Typography>
        </Stack>
        <Divider/>

        <MenuItem
          onClick={handleLogout}
          sx={{
            mt: 1, borderRadius: 2, py: 1
          }}
        >
          <ListItemIcon><IconLogout2 /></ListItemIcon>
          <ListItemText primary={"Logout"} />
        </MenuItem>
      </Menu>
    </>
  )
}
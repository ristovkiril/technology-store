import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {IconChartBar, IconMail, IconSettings, IconUserCog} from "@tabler/icons-react";
import {NavLink} from "react-router-dom";
import {SettingsButton} from "@/features/layouts/auth-layout/components/SettingsButton.jsx";


const routes = [
  {
    icon: IconChartBar,
    label: "Dashboard",
    path: "/dashboard"
  },
  {
    icon: IconMail,
    label: "Contact us",
    path: "/contact-us"
  },
  {
    icon: IconUserCog,
    label: "Profile",
    path: "/my-profile"
  },
]

const itemStyle = {
  borderRadius: 3,
  my: 0.5,
  "&:hover": {
    bgcolor: "#76ABAE32", // Change the active background color here
  },
  "&.active": {
    bgcolor: "#76ABAE32", // Change the active background color here
    fontWeight: "600 !important",
  },
}

export const SidebarContent = () => {

  return (
    <>
      <List sx={{py: 0}}>
        {routes?.map(route => {
          const {icon, label, path} = route;
          const Icon = icon
          return (
            <ListItemButton
              key={path}
              component={NavLink}
              to={path}
              sx={{
                ...itemStyle
              }}
            >
              <ListItemIcon><Icon /></ListItemIcon>
              <ListItemText primary={label} primaryTypographyProps={{sx: {fontWeight: "inherit"} }} />
            </ListItemButton>
          )
        })}
      </List>
      <List sx={{mt: "auto"}}>
        <Divider />
        <SettingsButton/>
      </List>
    </>
  )
}
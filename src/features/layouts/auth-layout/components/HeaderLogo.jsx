import {Button, IconButton, Stack} from "@mui/material";
import logo from "@/assets/technology-logo.png";
import {IconMenu} from "@tabler/icons-react";
import {useSetAtom} from "jotai";
import {SidebarDrawerState} from "@/features/layouts/auth-layout/atoms.js";


export const HeaderLogo = () => {
  const setOpenDrawer = useSetAtom(SidebarDrawerState);

  return (
    <Stack direction={"row"} gap={1} alignItems={"center"} justifyContent={"space-between"}>
      <Button
        color={"secondary"}
        startIcon={<img src={logo} height={30} width={"auto"}/>}
      >
        Vite App
      </Button>
      <IconButton
        color={"secondary"}
        onClick={() => setOpenDrawer(prev => !prev)}
        sx={{display: {xs: "flex", md: "none"} }}
      >
        <IconMenu />
      </IconButton>
    </Stack>
  )
}
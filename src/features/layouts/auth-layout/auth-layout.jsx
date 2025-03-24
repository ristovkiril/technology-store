import {Stack, Toolbar} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Header} from "@/features/layouts/auth-layout/components/Header.jsx";
import {Sidebar} from "@/features/layouts/auth-layout/components/Sidebar.jsx";

export const AuthLayout = () => {

  return (
    <>
      <Header />
      <Stack direction={"row"} justifyContent={"stretch"} sx={{ maxWidth: "100vw", maxHeight: "100lvh", height: "100%", width: "100%", bgcolor: "background.paper", }}>
        <Sidebar />
        <Stack direction={"column"} sx={{flex: 1, maxHeight: "100lvh",  overflowY: "auto", overflowX: "hidden", p: {xs: 2, md: 4} }}>
          <Toolbar/>
          <Outlet />
        </Stack>
      </Stack>
    </>
  )
}
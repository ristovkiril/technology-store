import {Outlet} from "react-router-dom";
import {Stack, Toolbar} from "@mui/material";
import {Header} from "@/features/layouts/public-layout/components/header.jsx";


export const PublicLayoutInner = () => {

  return (
    <>
      <Header />
      <Toolbar variant={"regular"} />
      <Stack direction={"column"} sx={{flex: 1, minHeight: "calc(100dvh - 64px)", overflowX: "hidden"}}>
        <Outlet />
      </Stack>
    </>
  )
}
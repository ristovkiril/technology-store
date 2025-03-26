import {useAuthContext} from "@/context/auth-context.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Stack} from "@mui/material";
import {HelmetTitle} from "@/shared/components/HelmetTitle.jsx";
import logo from "@/assets/technology-logo.png";


export const UnAuthedLayout = () => {
  const { isAuth } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate("/products")
    }
  }, [isAuth]);

  return (
    <Stack direction={"row"} sx={{ maxWidth: "100vw", maxHeight: "100lvh", height: "100%", width: "100%", bgcolor: "background.default" }}>
      <HelmetTitle>Vite Template - Authenticate</HelmetTitle>
      {/* <Header /> */}
      <Stack alignItems={"center"} justifyContent={"center"} sx={{flex: 1, bgcolor: "background.dark", height: "100vh", display: {xs: "none", md: "flex"} }}>
        <img src={logo} width={"300px"} height={"auto"} />
      </Stack>
      <Stack direction={"column"} sx={{flex: 1}}>
        <Outlet />
      </Stack>
    </Stack>
  )
}
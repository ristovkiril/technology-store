import {useAuthContext} from "@/context/auth-context.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Stack} from "@mui/material";
import {HelmetTitle} from "@/shared/components/HelmetTitle.jsx";
import {AuthLayout} from "@/features/layouts/auth-layout/auth-layout.jsx";


export const AuthedLayout = () => {
  const { isAuth } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth !== null && !isAuth) {
      navigate("/login")
    }
  }, [isAuth]);

  return (
    <>
      <HelmetTitle>Vite Template</HelmetTitle>
      {/* <Header /> */}
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </>
  )
}
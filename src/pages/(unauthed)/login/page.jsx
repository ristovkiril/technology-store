import {LoginInner} from "@/features/auth/login/login-inner.jsx";
import {HelmetTitle} from "@/shared/components/HelmetTitle.jsx";


export const LoginPage = () => {


  return (
    <>
        <HelmetTitle>Vite Template - Login</HelmetTitle>
        <LoginInner />
    </>
  )
}
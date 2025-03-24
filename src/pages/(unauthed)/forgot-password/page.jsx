import {ForgotPasswordInner} from "@/features/auth/forgot-password/forgot-password-inner.jsx";
import {HelmetTitle} from "@/shared/components/HelmetTitle.jsx";


export const ForgotPasswordPage = () => {


  return (
    <>
        <HelmetTitle>Vite Template - Forgot Password</HelmetTitle>
        <ForgotPasswordInner />
    </>
  )
}
import {Navigate} from "react-router-dom";
import {LoadingScreen} from "@/shared/ui/loading/loading-screen.jsx";
import {useAuthContext} from "@/context/auth-context.jsx";


export const AuthRedirect = () => {
  const {isAuth} = useAuthContext()

  if(isAuth) {
    return <Navigate to={"/dashboard"}/>
  } else if (isAuth === false) {
    return <Navigate to={"/products"}/>
  } else {
    return <LoadingScreen />
  }
}
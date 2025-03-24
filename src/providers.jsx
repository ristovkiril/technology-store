import {useEffect, useMemo} from 'react'
import {ToastContainer} from "react-toastify";
import {AuthContextProvider} from "./context/auth-context.jsx";
import {ThemeProvider} from "@mui/material";
import {darkTheme, lightTheme} from "@/theme.config.js";
import {useAtom} from "jotai";
import {RootRouterProvider} from "@/pages/router.jsx";
import {ThemeAtom} from "@/atoms.js";
import {AppContextProvider} from "@/context/app-context.jsx";
import {Modals} from "@/modals/modals.jsx";

function Providers() {
  const [selectedTheme, setSelectedTheme] = useAtom(ThemeAtom)

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setSelectedTheme(theme)
    }
  }, [])

  const theme = useMemo(() => {
    if (selectedTheme === "light") {
      return lightTheme;
    }
    return darkTheme;
  }, [selectedTheme])

  return (
    <>
      <ToastContainer/>
      <AuthContextProvider>
        <AppContextProvider>
          <ThemeProvider theme={theme}>
            <Modals />
            <RootRouterProvider/>
          </ThemeProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default Providers

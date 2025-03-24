import {AppBar, IconButton, Stack, Toolbar} from "@mui/material";
import {IconSun, IconMoon} from "@tabler/icons-react";
import {HeaderLogo} from "@/features/layouts/auth-layout/components/HeaderLogo.jsx";
import {useAtom} from "jotai";
import {ThemeAtom} from "@/atoms.js";
import {useEffect} from "react";

export const Header = () => {
  const [selectedTheme, setSelectedTheme] = useAtom(ThemeAtom);

  useEffect(() => {
    localStorage.setItem("theme", selectedTheme);
  }, [selectedTheme])

  return (
    <AppBar elevation={0}>
      <Toolbar
        sx={{
          boxShadow: 0,
          bgcolor: "background.main"
        }}
      >
        <HeaderLogo />

        <Stack direction={"row"} sx={{ml: "auto"}}>
          <IconButton
            color={"secondary"}
            onClick={() => setSelectedTheme(prev => prev === "dark" ? "light" : "dark")}
          >
            {selectedTheme === "light" ? <IconSun /> : <IconMoon/> }
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
import {Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Typography} from "@mui/material";
import {useMemo} from "react";
import {grey} from "@mui/material/colors";
import { IconCircle } from "@tabler/icons-react";

export const PasswordStrength = ({password}) => {

  const checkPasswordStrength = (pass = '') => {
    // Define the criteria
    const lengthCriteria = pass.length >= 6;
    const symbolCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const lowercaseCriteria = /[a-z]/.test(pass);
    const uppercaseCriteria = /[A-Z]/.test(pass);
    const strongLengthCriteria = pass.length > 8;

    let strength = 0;
    if (lengthCriteria) {
      strength += 1;
    }
    if (symbolCriteria) {
      strength += 1;
    }
    if (lowercaseCriteria) {
      strength += 1;
    }
    if (uppercaseCriteria) {
      strength += 1;
    }
    if (strongLengthCriteria) {
      strength += 1;
    }

    // Return results
    return {strength, lengthCriteria};
  }

  const {strength, lengthCriteria} = useMemo(() => {
    return checkPasswordStrength(password);
  }, [password])

  return (
    <Stack direction={"column"} gap={1}>
      <Typography>Must have at least 6 characters</Typography>
      <Stack direction={"row"} gap={0.5}>
        <Divider sx={{flex: 1, borderBottomWidth: 2}} color={lengthCriteria && strength > 1 ? "success" : grey[300]}  />
        <Divider sx={{flex: 1, borderBottomWidth: 2}} color={lengthCriteria && strength > 2 ? "success" : grey[300]}  />
        <Divider sx={{flex: 1, borderBottomWidth: 2}} color={lengthCriteria && strength > 3 ? "success" : grey[300]}  />
        <Divider sx={{flex: 1, borderBottomWidth: 2}} color={lengthCriteria && strength > 4 ? "success" : grey[300]}  />
      </Stack>
      <Typography>It’s better to have:</Typography>
      <List sx={{py: 0}}>
        <ListItem sx={{p: 0}}>
          <ListItemIcon sx={{minWidth: 25}}><IconCircle fontSize={10} color={"warning"} /></ListItemIcon>
          <ListItemText primary={"Upper & lower case letters"}/>
        </ListItem>
        <ListItem sx={{p: 0}}>
          <ListItemIcon sx={{minWidth: 25}}><IconCircle fontSize={10} color={"warning"} /></ListItemIcon>
          <ListItemText primary={"A symbol  (#$&)"}/>
        </ListItem>
        <ListItem sx={{p: 0}}>
          <ListItemIcon sx={{minWidth: 25}}><IconCircle fontSize={10} color={"warning"} /></ListItemIcon>
          <ListItemText primary={"A longer password"}/>
        </ListItem>
      </List>
    </Stack>
  )
}
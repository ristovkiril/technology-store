import {Box} from "@mui/material";

//@ts-ignore
export const Card = ({children, sx = {}, ...props}) => {
  return (
    <Box sx={{borderRadius: 5, bgcolor: "background.main", ...sx}} className={"border-shadow"} {...props}>
      {children}
    </Box>
  )
}
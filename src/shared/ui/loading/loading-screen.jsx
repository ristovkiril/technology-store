import { CircularProgress, Stack, Typography } from "@mui/material"

export const LoadingScreen = () => {
  return (
    <Stack direction="column" gap={2} alignItems="center" justifyContent={"center"} sx={{position: "absolute", inset: 0, bgcolor: "background.paper", borderRadius: 5 }}>
      <div style={{textAlign: "center"}}>
        <CircularProgress />
        <Typography fontWeight={600}>Loading...</Typography>
      </div>
    </Stack>
  )
}
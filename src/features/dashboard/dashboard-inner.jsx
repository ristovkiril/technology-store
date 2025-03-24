import {Avatar, Box, Grid, Stack, Typography} from "@mui/material";
import {IconArrowsExchange, IconMail, IconTruckDelivery, IconUserPlus} from "@tabler/icons-react";
import {blue, green} from "@mui/material/colors";
import {Card} from "@/shared/components/card/card.jsx";


export const DashboardInner = () => {

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={3}>
        <Stack direction={"column"} gap={1} sx={{bgcolor: "background.main", borderRadius: 3, px: 2, py: 4}}>
          <Stack direction={"row"} gap={2} justifyContent={"space-between"} alignItems={"center"}>
            <Box>
              <Typography variant={"h4"} color={"secondary"}>Mail</Typography>
              <Typography variant={"subtitle2"} color={"secondary"}>Description</Typography>
            </Box>
            <Avatar
              sx={{
                bgcolor: "primary.light",
                color: "primary",
                width: 60, height: 60
              }}
            >
              <IconMail size={40} />
            </Avatar>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Stack direction={"column"} gap={1} sx={{bgcolor: "background.main", borderRadius: 3, px: 2, py: 4}}>
          <Stack direction={"row"} gap={2} justifyContent={"space-between"} alignItems={"center"}>
            <Box>
              <Typography variant={"h4"} color={"secondary"}>Exchange</Typography>
              <Typography variant={"subtitle2"} color={"secondary"}>Description</Typography>
            </Box>
            <Avatar
              sx={{
                bgcolor: "error.light",
                color: "error",
                width: 60, height: 60
              }}
            >
              <IconArrowsExchange size={40} />
            </Avatar>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card direction={"column"} gap={1} sx={{bgcolor: "background.main", borderRadius: 3, px: 2, py: 4}}>
          <Stack direction={"row"} gap={2} justifyContent={"space-between"} alignItems={"center"}>
            <Box>
              <Typography variant={"h4"} color={"secondary"}>Delivery</Typography>
              <Typography variant={"subtitle2"} color={"secondary"}>Description</Typography>
            </Box>
            <Avatar
              sx={{
                bgcolor: blue[500],
                color: "light",
                width: 60, height: 60
              }}
            >
              <IconTruckDelivery size={40} />
            </Avatar>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Stack direction={"column"} gap={1} sx={{bgcolor: "background.main", borderRadius: 3, px: 2, py: 4}}>
          <Stack direction={"row"} gap={2} justifyContent={"space-between"} alignItems={"center"}>
            <Box>
              <Typography variant={"h4"} color={"secondary"}>New Customers</Typography>
              <Typography variant={"subtitle2"} color={"secondary"}>Description</Typography>
            </Box>
            <Avatar
              sx={{
                bgcolor: green[400],
                color: "light",
                width: 60, height: 60
              }}
            >
              <IconUserPlus size={40} />
            </Avatar>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}
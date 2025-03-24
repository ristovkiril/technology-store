import {Grid} from "@mui/material";
import {ProfileImage} from "@/features/profile/components/profile-image.jsx";
import {UserDetails} from "@/features/profile/components/user-details.jsx";

export const ProfileInner = () => {

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={5} lg={4} xl={3}>
        <ProfileImage/>
      </Grid>
      <Grid item xs={12} md={7} lg={8} xl={9}>
        <UserDetails/>
      </Grid>
    </Grid>
  )
}
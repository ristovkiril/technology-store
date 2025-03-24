import {Box, Grid, Stack, Typography} from "@mui/material";
import {Card} from "@/shared/components/card/card.jsx";
import {ContactForm} from "@/shared/components/forms/contact-form.jsx";

export const ContactUsInner = () => {

  return (
    <Grid container>
      <Grid item xs={12} sm={4} md={6} sx={{height: "100%"}}>
        <Stack direction={"column"} maxWidth={"sm"} gap={2} sx={{mx: "auto", height: "100%"}} justifyContent={"center"}>
          <Typography variant={"h3"} fontWeight={"600"} color={"secondary"}>Get in touch!</Typography>
          <Typography color={"secondary"}>We’re here to help! Whether you have a question, need support, or want to learn more about how we can assist you, feel free to reach out. Simply fill out the form below, email us, or give us a call—we’re ready to solve your problems!</Typography>
          <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
            <Box>
              <Typography color={"secondary"} fontWeight={600}>Email:</Typography>
              <Typography component={"a"} href="mailto: info@tomira.com" textDecoration={"none"} color={"secondary"}>info@tomira.com</Typography>
            </Box>
            <Box>
              <Typography color={"secondary"} fontWeight={600}>Phone:</Typography>
              <Typography component={"a"} href="tel:+13211468498" textDecoration={"none"} color={"secondary"}>+1 (321) 1468-498</Typography>
            </Box>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={8} md={6} sx={{height: "100%"}}>
        <Card sx={{bgcolor: "background.main"}}>
          <ContactForm
            title={"Send us mail"}
          />
        </Card>
      </Grid>

    </Grid>
  )
}
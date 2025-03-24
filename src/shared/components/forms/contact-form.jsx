import {Box, Button, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {IconChevronRight, IconMail, IconPhoneCall} from "@tabler/icons-react";
import React, {useEffect, useState} from "react";
import {grey} from "@mui/material/colors";
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useDebounce} from "@/shared/hooks/useDebounce.js";
import AnimationMailSending from "@/shared/components/lottie-animations/AnimationMailSending.jsx";
import AnimationFailed from "@/shared/components/lottie-animations/AnimationFailed.jsx";
import AnimationSuccess from "@/shared/components/lottie-animations/AnimationSuccess.jsx";
import {airtableBase} from "@/config/airtable";
import {toast} from "react-toastify";
import {useAuthContext} from "@/context/auth-context.jsx";

const validationSchema = yup.object({
  firstName: yup
    .string('Enter your name')
    .required('Name is required'),
  lastName: yup
    .string('Enter your last name')
    .required('Last name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup
    .string('Enter your phone number')
    .required('Phone number is required'),
  message: yup
    .string('Enter your message')
    .min(8, 'Message should be of minimum 8 characters length')
    .required('Message is required'),
});

const StatusType = {
  NONE: "NONE",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
}

export const ContactForm = ({message = "", title = "Feel free to contact us", airtableName = "enterprise contact form"}) => {
  const {user: userDetails} = useAuthContext();
  const [status, setStatus] = useState(StatusType.NONE);
  const statusDebounced = useDebounce(status, 1000);

  useEffect(() => {
    if (statusDebounced === StatusType.SUCCESS || statusDebounced === StatusType.FAILED) {
      const timeout = setTimeout(() => {
        setStatus(StatusType.NONE);
      }, 3000)

      return () => clearTimeout(timeout);
    }
  }, [statusDebounced])

  const formik = useFormik({
        initialValues: {
          firstName: userDetails?.firstName || '',
          lastName: userDetails?.lastName || '',
          email: userDetails?.email || '',
          phone: userDetails?.phoneNumber || '',
          message: message || '',
          companyName: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          setStatus(StatusType.PENDING);
          console.log('handle submit')
          // send on form submit
          try {
            if (!airtableBase) {
              setStatus(StatusType.FAILED);
              return;
            }
            await airtableBase(airtableName).create([
              {
                "fields": {
                  'firstName': values.firstName,
                  'lastName': values.lastName,
                  'phone': values.phone,
                  'email': values.email,
                  'message': values.message,
                  'companyName': values.companyName,
                  'time': new Date(Date.now()).toLocaleString(),
                  'ip': "ip"
                }
              },
            ], function (err) {
              if (err) {
                console.error(err);
                toast.error(err?.message || "Please make sure you are sending all information from contact form!")
                setStatus(StatusType.FAILED);
                return;
              }
              toast.success("Submitted! We will be in touch shortly!")
              setStatus(StatusType.SUCCESS);
            })

          } catch (error ){
            console.log(error)
          }

          formik.resetForm({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
            companyName: ''
          })
        },
      }
    )
  ;

  return (
    <Stack direction={"column"} maxWidth={"md"} gap={3} sx={{mx: "auto", p: {xs: 2, md: 4}, position: "relative"}}>
      {
        status !== StatusType.NONE && <Stack alignItems={"center"} justifyContent={"center"}
                                             sx={{position: "absolute", inset: 10}}>
          <AnimationMailSending open={status === StatusType.PENDING || statusDebounced === StatusType.PENDING}/>
          <AnimationFailed open={statusDebounced === StatusType.FAILED}/>
          <AnimationSuccess open={statusDebounced === StatusType.SUCCESS}/>
        </Stack>
      }

      <Box maxWidth={"sm"} sx={{mx: "auto"}}>
        <Typography
          color={"secondary"}
          variant={"h5"}
          sx={{
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>

        <Typography
          color={"secondary"}
          sx={{
            textAlign: "center",
            fontWeight: 400,
            fontSize: "0.8rem",
            textTransform: "uppercase",
            pb: 2, pt: 1
          }}
        >
          Send us a message and
          our team will be in touch!
        </Typography>
      </Box>

      <Stack component={"form"} onSubmit={formik.handleSubmit} direction={"row"} gap={2} useFlexGap flexWrap={"wrap"}
             sx={{opacity: status != StatusType.NONE ? 0 : 1, flexDirection: {xs: "column", md: "row"}}}>
        <TextField
          sx={{flex: 1}}
          InputLabelProps={{shrink: true, color: "secondary", sx: {fontWeight: 700}}}
          InputProps={{sx: {borderRadius: 3, bgcolor: "background.paper"}}}
          label={"First name *"}
          placeholder={"Enter your name"}
          id="firstName"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          sx={{flex: 1}}
          InputLabelProps={{shrink: true, color: "secondary", sx: {fontWeight: 700}}}
          InputProps={{sx: {borderRadius: 3, bgcolor: "background.paper"}}}
          label={"Last name *"}
          placeholder={"Enter your last name"}
          id="lastName"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          sx={{width: "100%"}}
          InputLabelProps={{shrink: true, color: "secondary", sx: {fontWeight: 700}}}
          InputProps={{
            sx: {borderRadius: 3, bgcolor: "background.paper"},
            endAdornment: <InputAdornment position={"end"}><IconMail size={18}/></InputAdornment>
          }}
          id="email"
          name="email"
          label={"Email *"}
          placeholder={"Enter your email"}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          sx={{width: "100%"}}
          InputLabelProps={{shrink: true, color: "secondary", sx: {fontWeight: 700}}}
          InputProps={{
            sx: {borderRadius: 3, bgcolor: "background.paper"},
            endAdornment: <InputAdornment position={"end"}><IconPhoneCall size={18}/></InputAdornment>
          }}
          label={"Phone number *"}
          placeholder={"Enter your phone number"}
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          multiline
          rows={3}
          sx={{width: "100%"}}
          InputLabelProps={{shrink: true, color: "secondary", sx: {fontWeight: 700}}}
          InputProps={{sx: {borderRadius: 3, bgcolor: "background.paper"}}}
          label={"Message *"}
          placeholder={"Message.."}
          id="message"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
        />

        <Button
          fullWidth
          type={"submit"} variant={"contained"}
          color={"primary"}
          disabled={status !== StatusType.NONE}
          sx={{
            fontSize: 16, borderRadius: 3,
            textTransform: "none"
          }}
          endIcon={<IconChevronRight size={18}/>}
        >
          Send Message
        </Button>

      </Stack>
    </Stack>
  )
}

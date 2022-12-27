import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { Formik } from "formik" //use to be for form library
import * as yup from "yup" // which is our validation library
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // to store our user information
import { setLogin } from "../../state"; // set their to login page
import DropZone from "react-dropzone" // user can drop file or put img file
import FlexBetween from "../../components/FlexBetween"


/* yup validation schema */
const registerSchema = yup.object().shape({
    // pass all values to all schema
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const initValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}

const initValuesLogin = {
    email: "",
    password: ""
}


const Form = () => {
    const [pageType, setPageType] = useState("login")
    const { palette } = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isDesktop = useMediaQuery("(min-width: 600px)")
    const isLogin = pageType === "login"
    const isRegister = pageType === "register"

    const Register = async (values, onSubmitProps) => {
        // send form info with image
        const formData = new FormData()
        for (let value in values) {
            formData.append(value, values[value])
        }
        formData.append("picturePath", values.picture.name)

        const saveUser = await fetch("http://localhost:5000/auth/register",
            {
                method: "POST",
                body: formData
            })
        const responseSaveUser = await saveUser.json()
        onSubmitProps.resetForm()

        if (responseSaveUser) {
            setPageType("login")
            console.log(responseSaveUser)
        }
    }

    const Login = async (values, onSubmitProps) => {
        const userData = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        })
        const responseUserData = await userData.json()
        onSubmitProps.resetForm()

        if (responseUserData) {
            dispatch(
                setLogin({
                    user: responseUserData.user,
                    token: responseUserData.token
                })
            )
            navigate("/home")
            console.log(responseUserData)
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await Login(values, onSubmitProps)
        if (isRegister) await Register(values, onSubmitProps)
    }

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initValuesLogin : initValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue, // used to set specific formik input value
                resetForm
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))" // split into 4 section, and going be minimum of zero
                        sx={{
                            "& > div": { gridColumn: isDesktop ? undefined : "span 4" }
                        }}
                    >

                        {/* register section */}
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName} // help to show error and hold the text value
                                    sx={{ gridColumn: "span 2" }} // in large screen its going to span 2
                                />
                                <TextField
                                    label="Last Name"
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Location"
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    label="Occupation"
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <DropZone
                                        acceptedFiles=".jpg, .jpeg, .png, .jfif"
                                        multiple={false} // can't set multiple files
                                        onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                                    >
                                        {({
                                            getRootProps, getInputProps
                                        }) => (
                                            <Box
                                                {...getRootProps()} // passing props that given from root
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add picture profile here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </DropZone>
                                </Box>
                            </>
                        )}

                        {/* login section */}
                        <TextField
                            label="Email"
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            InputLabelProps={{ shrink: true }}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Password"
                            required
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            InputLabelProps={{ shrink: true }}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>

                    {/* Button section */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": {
                                    color: palette.primary.main
                                }
                            }}
                        >
                            {isLogin ? "Login" : "Register"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login")
                                resetForm()
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.alt
                                }
                            }}
                        >
                            {isLogin ? "Don't have account? please register" : "Have an account? please login"}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default Form
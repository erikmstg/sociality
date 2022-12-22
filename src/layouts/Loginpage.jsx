import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import Form from "../layouts/login/Form"

const LoginPage = () => {
  const theme = useTheme()
  const isDesktopScreen = useMediaQuery("(min-width: 886px)")

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
        >
          Sciality
        </Typography>
      </Box>

      <Box
        width={isDesktopScreen ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} >
          Welcome to Sciality, just an simple socmed
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage
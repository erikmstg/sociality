import { useState } from "react"
import { Box, IconButton, Typography, InputBase, Select, MenuItem, FormControl, useTheme, useMediaQuery, } from "@mui/material"
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setMode, setLogout } from "../../state"
import { useNavigate } from "react-router-dom"
import FlexBetween from "../../components/FlexBetween"

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const isDesktopScreen = useMediaQuery("(min-width: 886px)")
  const isMobileScreen = useMediaQuery("(min-width: 600px)")

  const theme = useTheme()
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const background = theme.palette.background.default
  const primaryLight = theme.palette.primary.light
  const alt = theme.palette.background.alt

  // const fullName = "test user"
  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover":
            {
              color: primaryLight,
              cursor: "pointer"
            }
          }}
        >
          Sciality
        </Typography>

        {isMobileScreen && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
            width={isMobileMenuToggled ? "240px" : "auto"}
          >
            <InputBase placeholder="Search.." />
            <IconButton >
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Desktop nav */}
      {isDesktopScreen ? (
        <FlexBetween gap="1.5rem">
          {/* button to change state light and dark mode */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem"
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      )}

      {/* Mobile nav */}
      {!isDesktopScreen && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          minWidth="180px"
          backgroundColor={background}
        >
          {/* Close icon*/}
          <Box display="flex" justifyContent="flex-end" p="1.5rem" pr="42px">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>

          {/* Menu items */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem"
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight
                  }
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}

export default Navbar
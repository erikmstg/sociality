import { Box, useMediaQuery } from "@mui/material"
import Navbar from "./navbar"
import { useSelector } from "react-redux"
import UserWidget from "./widgets/UserWidget"
import PostWidget from "./widgets/PostWidget"

const Homepage = () => {
  const { _id, picturePath } = useSelector(state => state.user)
  const isDesktopScreen = useMediaQuery("(min-width: 886px)")

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isDesktopScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isDesktopScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isDesktopScreen ? "42%" : undefined}
          mt={isDesktopScreen ? undefined : "2rem"}
        >
          <PostWidget picturePath={picturePath} />
        </Box>
        {isDesktopScreen && (
          <Box flexBasis="26%"></Box>
        )}
      </Box>
    </Box>
  )
}

export default Homepage
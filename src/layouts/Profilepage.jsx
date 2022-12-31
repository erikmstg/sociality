import { Box, useMediaQuery } from "@mui/material"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Navbar from "../layouts/navbar"
import FriendlistWidget from "./widgets/FriendlistWidget"
import MyPostWidget from "./widgets/MyPostWidget"
import PostsTimeline from "./widgets/PostsTimeline"
import UserWidget from "./widgets/UserWidget"

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  console.log(userId);
  const token = useSelector(state => state.token)
  const friends = useSelector(state => state.user.friends)
  console.log(friends)
  const isDesktopScreen = useMediaQuery("(min-width: 886px)")

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await response.json()
    console.log("data:", data)
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isDesktopScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isDesktopScreen ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendlistWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isDesktopScreen ? "42%" : undefined}
          mt={isDesktopScreen ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsTimeline userId={userId} isProfile />
        </Box>

      </Box>
    </Box>
  )
}

export default ProfilePage
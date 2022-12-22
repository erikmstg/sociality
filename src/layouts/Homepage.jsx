import { Box } from "@mui/material"
import Navbar from "./navbar"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const Homepage = () => {
  const user = useSelector(state => state.user)


  useEffect(() => {
    console.log("user", user)
    console.log("testing...")
  }, [user])

  return (
    <Box>
      <Navbar />
    </Box>
  )
}

export default Homepage
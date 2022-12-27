import { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined } from "@mui/icons-material"
import { Box, Typography, Divider, useTheme } from "@mui/material"
import UserImage from "../../components/UserImage"
import WidgetWrapper from "../../components/WidgetWrapper"
import FlexBetween from "../../components/FlexBetween"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import twitterIcon from "../../assets/twitter.png"
import linkedInIcon from "../../assets/linkedin.png"

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const token = useSelector(state => state.token)
    const { palette } = useTheme()
    const main = palette.neutral.main
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium

    const getUser = async () => {
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        const data = await response.json()
        console.log("data:", data)
        setUser(data)
    }

    useEffect(() => {
        getUser()
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
        return null
    }

    const {
        firstName,
        lastName,
        occupation,
        location,
        viewedProfile,
        impressions,
        friends
    } = user

    return (
        <WidgetWrapper>
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >

                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{friends.length} Friends</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />

            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>

            <Divider />

            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Who's viewed your profile</Typography>
                    <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>Impression of your post</Typography>
                    <Typography color={main}>{impressions}</Typography>
                </FlexBetween>
            </Box>

            <Divider />

            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profile
                </Typography>
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src={twitterIcon} alt="Twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Newtwork</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src={linkedInIcon} alt="Linkedin" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                LinkedIn
                            </Typography>
                            <Typography color={medium}>Newtwork connect</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
            </Box>

        </WidgetWrapper>
    )
}

export default UserWidget
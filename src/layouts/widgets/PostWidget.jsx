import { EditOutlined, DeleteOutline, AttachFileOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from "@mui/icons-material"
import { Box, Divider, Typography, useTheme, useMediaQuery, Button, IconButton, InputBase } from "@mui/material"
import DropZone from "react-dropzone"
import FlexBetween from "../../components/FlexBetween"
import UserImage from "../../components/UserImage"
import WidgetWrapper from "../../components/WidgetWrapper"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../state"

const PostWidget = ({ picturePath }) => {
    const dispatch = useDispatch()
    const [isImage, setIsImage] = useState(false)
    const [image, setImage] = useState(null)
    const [post, setPost] = useState("")
    const { _id } = useSelector(state => state.user)
    const token = useSelector(state => state.token)
    const { palette } = useTheme()
    const isDesktopScreen = useMediaQuery("(min-width: 1000px)")
    const mediumMain = palette.neutral.maediumMain
    const medium = palette.neutral.medium

    const handlePost = async () => {
        const formData = new FormData()
        formData.append("userId", _id)
        formData.append("description", post)
        if (image) {
            formData.append("picture", image)
            formData.append("picturePath", image.name)
        }

        const request = await fetch(`http://localhost:5000/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        })

        const posts = request.json()
        dispatch(setPosts({ posts }))
        setImage(null)
        setPost("")
    }

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="Text something..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem"
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <DropZone
                        acceptedFiles=".jpg, .jpeg, .png, .jfif"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add image here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: "8%" }}
                                    >
                                        <DeleteOutline />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </DropZone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem" }} />

            <FlexBetween>
                <FlexBetween
                    gap="0.25rem"
                    onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                color: medium
                            }
                        }}
                    >
                        Image
                    </Typography>
                </FlexBetween>
                {isDesktopScreen ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                        <Typography color={mediumMain}>More</Typography>
                    </FlexBetween>
                )}
                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.primary.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem"
                    }}
                >
                    Post
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default PostWidget
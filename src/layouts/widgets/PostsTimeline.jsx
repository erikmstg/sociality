import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../state"
import PostWidget from "./PostWidget"

const PostsTimeline = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
    const posts = useSelector(state => state.posts)

    const getPosts = async () => {
        const request = await fetch("http://localhost:5000/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        const response = await request.json()
        dispatch(setPosts({ posts: response }))
    }

    const getUserPosts = async () => {
        const request = await fetch(`http://localhost:5000/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        const response = request.json()
        dispatch(setPosts({ posts: response }))
    }


    useEffect(() => {
        if (isProfile) {
            getUserPosts()
        } else {
            getPosts()
        }
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {posts.map(
                // destructure number of item from each post
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    )
}

export default PostsTimeline
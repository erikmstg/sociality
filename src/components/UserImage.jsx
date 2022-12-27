import { Box } from "@mui/material"

const UserImage = ({ image, size = "60px" }) => (
    <Box width={size} height={size}>
        <img
            style={{ objectFit: "cover", borderRadius: "50%" }}
            width={size}
            height={size}
            alt="Profile Image"
            src={`http://localhost:5000/assets/${image}`}
        />
    </Box>
)

export default UserImage
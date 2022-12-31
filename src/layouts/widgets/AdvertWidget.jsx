import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme()
    const dark = palette.neutral.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Ads
                </Typography>
                <Typography color={medium}>
                    Create ads
                </Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                src="http://localhost:5000/assets/info4.jpeg"
                alt="ads"
            />
            <FlexBetween sx={{ flexDirection: "column", alignItems: "start" }}>
                <Typography color={main}>MikaComestics</Typography>
                <Typography color={medium}>mikacosmetics.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                Your path to immaculate beauty and made sure your skin is exfoliating skin and shining like light
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidget
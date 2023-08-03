import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

import { API_URL } from "../../constant/index";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        src={`${API_URL}/assets/info4.jpeg`}
        alt="advert"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>BookShop</Typography>
        <Typography color={medium}>books.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        If you want to improve your thinking way, you must visit our website
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;

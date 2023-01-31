import { Box } from "@mui/material";
import { styled } from "@mui/system";

//we are adding some styling for Box component
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;

import { Box, Typography } from "@mui/material";

const EmptyState = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h5">
        Chào mừng đến với Zalo PC! Hãy chọn một cuộc trò chuyện để bắt đầu.
      </Typography>
    </Box>
  );
};

export default EmptyState;

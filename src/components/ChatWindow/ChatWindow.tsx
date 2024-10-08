import React from "react";
import { Box, Typography } from "@mui/material";

interface ChatWindowProps {
  chat: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
  return (
    <Box sx={{ flexGrow: 1, padding: "16px", width: "100%" }}>
      <Typography variant="h6">Đang trò chuyện với {chat}</Typography>
      {/* Nội dung tin nhắn sẽ được hiển thị ở đây */}
    </Box>
  );
};

export default ChatWindow;

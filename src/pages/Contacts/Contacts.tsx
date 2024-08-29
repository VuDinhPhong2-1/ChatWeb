import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import ChatList from "../../components/ChatList/ChatList";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import EmptyState from "../../components/EmptyState/EmptyState";
import { useAuth } from "../../hooks/useAuth";

export const Contacts = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  if (!isAuthenticated) {
    navigate("/signin"); // Redirect to SignIn if not authenticated
    return null; // Return null to avoid rendering the rest of the component
  }

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {/* Danh sách danh bạ */}
      {isSmUp && (
        <Box
          sx={{
            width: "300px",
            borderRight: "1px solid #ddd",
            overflowY: "auto",
          }}
        >
          <ChatList setSelectedChat={setSelectedChat} />
        </Box>
      )}

      {/* Nội dung chat hoặc thông điệp chào mừng */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : !isSmUp ? (
          <ChatList setSelectedChat={setSelectedChat} />
        ) : (
          <EmptyState />
        )}
      </Box>
    </Box>
  );
};

import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import ChatList from "../../components/ChatList/ChatList";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import EmptyState from "../../components/EmptyState/EmptyState";
import { useAuth } from "../../hooks/useAuth";
import { Search } from "../../components/Search/Search";

export const Home = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  useAuth("", "signin");

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {isSmUp && (
        <Box
          sx={{
            width: "344px",
            borderRight: "1px solid #ddd",
            overflowY: "auto",
          }}
        >
          <Search />
          <ChatList setSelectedChat={setSelectedChat} />
        </Box>
      )}

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

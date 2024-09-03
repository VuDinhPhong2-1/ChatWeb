import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

interface ChatListProps {
  setSelectedChat: (chat: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ setSelectedChat }) => {
  const chats: string[] = ["Chat 1", "Chat 2", "Chat 3"];

  return (
    <List sx={{ background: "green" }}>
      {chats.map((chat, index) => (
        <ListItem key={index} onClick={() => setSelectedChat(chat)}>
          <ListItemText primary={chat} />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;

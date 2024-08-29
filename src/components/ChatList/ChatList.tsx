import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

// Định nghĩa kiểu cho các props
interface ChatListProps {
  setSelectedChat: (chat: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ setSelectedChat }) => {
  const chats: string[] = ["Chat 1", "Chat 2", "Chat 3"]; // Giả lập danh sách các cuộc trò chuyện

  return (
    <List>
      {chats.map((chat, index) => (
        <ListItem key={index} onClick={() => setSelectedChat(chat)}>
          <ListItemText primary={chat} />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;

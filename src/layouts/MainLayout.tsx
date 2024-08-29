import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import { Sidebar } from "../components/Sidebar/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar luôn hiển thị */}
      <Sidebar />

      {/* Nội dung chính được truyền vào từ `children` */}
      <Box sx={{ flexGrow: 1 }}>
        {children} {/* Render các children truyền từ App.tsx */}
      </Box>
    </Box>
  );
};

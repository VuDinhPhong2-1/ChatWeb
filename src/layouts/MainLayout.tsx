import { ReactNode } from "react";
import { Box } from "@mui/material";
import { Sidebar } from "../components/Sidebar/Sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        background: "blue",
      }}
    >
      <Sidebar />
      {children}
    </Box>
  );
};

export default MainLayout;

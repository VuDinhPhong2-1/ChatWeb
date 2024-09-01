import { Avatar, Box } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useLocation } from "react-router-dom";
import { darken } from "@mui/material/styles";

export const Sidebar = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "64px",
        height: "100%",
        background: "#0091FF",
        justifyItems: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Avatar */}
        <Box
          sx={{
            display: "flex",
            height: "68px",
            width: "64px",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://s120-ava-talk.zadn.vn/5/6/e/0/10/120/85dc5a08761747f2b022ff53e5b9f62e.jpg"
            sx={{
              border: "1px solid #fff",
              height: "48px",
              width: "48px",
            }}
          />
        </Box>
        {/* Messenger */}
        <Box
          sx={{
            display: "flex",
            height: "64px",
            width: "64px",
            alignItems: "center",
            justifyContent: "center",
            background: isHome ? darken("#0091FF", 0.2) : "#0091FF",
            cursor: "pointer",
            "&:hover": {
              background: darken("#0091FF", 0.3),
            },
          }}
        >
          <ChatIcon
            sx={{
              color: "white",
            }}
          />
        </Box>
        {/* Contacts */}
        <Box
          sx={{
            display: "flex",
            height: "64px",
            width: "64px",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              background: darken("#0091FF", 0.3),
            },
          }}
        >
          <PortraitOutlinedIcon sx={{ color: "white" }} />
        </Box>
        {/* Tasks */}
        <Box
          sx={{
            display: "flex",
            height: "64px",
            width: "64px",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              background: darken("#0091FF", 0.3),
            },
          }}
        >
          <CheckBoxOutlinedIcon sx={{ color: "white" }} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          justifyContent: "end",
        }}
      >
        {/* Cloud */}
        <Box
          sx={{
            display: "flex",
            height: "64px",
            width: "64px",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              background: darken("#0091FF", 0.3),
            },
          }}
        >
          <CloudQueueIcon sx={{ color: "white" }} />
        </Box>
        {/* Bag */}
        <Box
          sx={{
            display: "flex",
            height: "64px",
            width: "64px",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              background: darken("#0091FF", 0.3),
            },
          }}
        >
          <BusinessCenterOutlinedIcon sx={{ color: "white" }} />
        </Box>
        {/* Settings */}
        <Box
          sx={{
            display: "flex",
            height: "64px",
            width: "64px",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              background: darken("#0091FF", 0.3),
            },
          }}
        >
          <SettingsOutlinedIcon sx={{ color: "white" }} />
        </Box>
      </Box>
    </Box>
  );
};

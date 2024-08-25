import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { Avatar, Box } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
export const Sidebar = () => {
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
            width: "64px%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChatIcon sx={{ color: "white" }} />
        </Box>
        {/* Contacts */}
        <Box
          sx={{
            display: "flex",
            height: "64px",
            width: "64px%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PortraitOutlinedIcon sx={{ color: "white" }} />
        </Box>
        {/* ... */}
        <Box
          sx={{
            display: "flex",
            height: "64px",
            width: "64px%",
            alignItems: "center",
            justifyContent: "center",
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
            width: "64px%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CloudQueueIcon sx={{ color: "white" }} />
        </Box>
        {/* Bag */}
        <Box
          sx={{
            display: "flex",
            height: "64px",
            width: "64px%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BusinessCenterOutlinedIcon sx={{ color: "white" }} />
        </Box>
        {/* ... */}
        <Box
          sx={{
            display: "flex",
            height: "64px",
            width: "64px%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SettingsOutlinedIcon sx={{ color: "white" }} />
        </Box>
      </Box>
    </Box>
  );
};

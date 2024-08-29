import { useState } from "react";
import {
  Box,
  InputBase,
  IconButton,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton as MuiIconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CloseIcon from "@mui/icons-material/Close"; // Import Close Icon

export const Search = () => {
  const [open, setOpen] = useState(false);
  const [searchType, setSearchType] = useState("phone"); // 'email' or 'phone'
  const [searchValue, setSearchValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    console.log(`Searching for ${searchType}: ${searchValue}`);
    // Thêm logic tìm kiếm ở đây
    // Bỏ handleClose để pop-up không bị tắt khi nhấn Tìm kiếm
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "0 10px",
        height: "64px",
      }}
    >
      <InputBase
        placeholder="Tìm kiếm"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "#5f6368", marginRight: "8px" }} />
          </InputAdornment>
        }
        sx={{
          flexGrow: 1,
          fontSize: "14px",
          color: "#5f6368",
          width: "100%",
          backgroundColor: "#eef1f5",
          borderRadius: "5px",
          paddingLeft: "10px",
        }}
      />
      <IconButton sx={{ padding: "5px" }} onClick={handleClickOpen}>
        <PersonAddIcon sx={{ color: "#5f6368" }} />
      </IconButton>
      <IconButton sx={{ padding: "5px" }}>
        <GroupAddIcon sx={{ color: "#5f6368" }} />
      </IconButton>

      {/* Pop-up Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Thêm bạn
          <MuiIconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </MuiIconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginTop: "10px",
            }}
          >
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="search-type-label">Loại tìm kiếm</InputLabel>
              <Select
                labelId="search-type-label"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                label="Loại tìm kiếm"
              >
                <MenuItem value="phone">Số điện thoại</MenuItem>
                <MenuItem value="email">Email</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              label={searchType === "email" ? "Email" : "Số điện thoại"}
              fullWidth
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Không có tìm kiếm nào gần đây
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Hủy
          </Button>
          <Button onClick={handleSearch} variant="contained" color="primary">
            Tìm kiếm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

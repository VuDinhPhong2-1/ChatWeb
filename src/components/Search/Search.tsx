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
  Slide,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CloseIcon from "@mui/icons-material/Close";
import { useLazyQuery } from "@apollo/client";
import { FIND_ONE_BY_EMAIL } from "../../graphql/queries";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Search = () => {
  const [open, setOpen] = useState(false);
  const [searchType, setSearchType] = useState("phone");
  const [searchValue, setSearchValue] = useState("");
  const [dialogSearchValue, setDialogSearchValue] = useState(""); // State riêng cho dialog
  const [showResult, setShowResult] = useState(false);
  const [noResult, setNoResult] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Nếu màn hình nhỏ, dialog sẽ chuyển thành fullScreen
  const isXs = useMediaQuery(theme.breakpoints.down("xs")); // Kiểm tra màn hình xs

  const [searchUser, { data, loading, error }] = useLazyQuery(
    FIND_ONE_BY_EMAIL,
    {
      onCompleted: (data) => {
        if (data && data.findOneByEmail) {
          setShowResult(true);
          setNoResult(false);
        } else {
          setNoResult(true);
          setShowResult(false);
        }
      },
      onError: () => {
        setNoResult(true); // Xử lý khi có lỗi xảy ra
      },
    }
  );
  const handleClickOpen = () => {
    setOpen(true);
    setShowResult(false); // Reset lại khi mở dialog
    setNoResult(false); // Đặt lại trạng thái "không có kết quả"
    setDialogSearchValue(""); // Reset dialog input value
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    if (searchType === "email") {
      searchUser({ variables: { email: dialogSearchValue } });
    } else {
      console.log("Searching by phone is not implemented yet.");
    }
  };

  const handleBack = () => {
    setShowResult(false);
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
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <IconButton sx={{ padding: "5px" }} onClick={handleClickOpen}>
        <PersonAddIcon sx={{ color: "#5f6368" }} />
      </IconButton>
      <IconButton sx={{ padding: "5px" }}>
        <GroupAddIcon sx={{ color: "#5f6368" }} />
      </IconButton>

      {/* Pop-up Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen} // Responsive dialog: chuyển sang fullScreen cho mobile
        fullWidth
        maxWidth="sm"
        aria-modal="true" // Thêm thuộc tính aria-modal
        disableEnforceFocus // Tắt tính năng tự động trap focus
        disableRestoreFocus // Tắt khôi phục focus khi đóng dialog
      >
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
        <DialogContent
          sx={{
            height: isXs ? "auto" : "400px", // Chiều cao tự động cho màn hình xs
            overflowY: "auto", // Đảm bảo nội dung có thể cuộn nếu vượt quá chiều cao
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isXs ? "column" : "row", // Chuyển từ row sang column trên xs
              alignItems: isXs ? "flex-start" : "center",
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
              value={dialogSearchValue} // Sử dụng state riêng cho dialog
              onChange={(e) => setDialogSearchValue(e.target.value)}
            />
          </Box>
          {noResult && (
            <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
              Không có kết quả nào phù hợp.
            </Typography>
          )}
          {!noResult && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2" color="textSecondary">
                Không có tìm kiếm nào gần đây
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Hủy
          </Button>
          <Button
            onClick={handleSearch}
            variant="contained"
            color="primary"
            disabled={!dialogSearchValue}
          >
            Tìm kiếm
          </Button>
        </DialogActions>

        {/* Tab hiển thị thông tin người dùng */}
        <Slide direction="left" in={showResult} mountOnEnter unmountOnExit>
          <Box
            sx={{
              backgroundColor: "#f1f1f1",
              padding: "20px",
              position: "absolute",
              top: 0,
              right: 0,
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              zIndex: 1000,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
              <Typography sx={{ fontWeight: "600" }}>
                Thông tin cá nhân
              </Typography>
            </Box>
            {loading && <p>Đang tìm kiếm...</p>}
            {error && <p>Có lỗi xảy ra: {error.message}</p>}
            {data && data.findOneByEmail && (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isXs ? "column" : "row",
                    alignItems: "center",
                    gap: 2,
                    marginBottom: "24px",
                    border: "10px solid gray",
                  }}
                >
                  <Avatar
                    alt={data.findOneByEmail.name}
                    src={data.findOneByEmail?.avatar_url}
                    sx={{ width: 56, height: 56 }}
                  />
                  <Typography sx={{ fontWeight: "bold" }}>
                    {data.findOneByEmail.name}
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: "bold" }}>
                  Thông tin cá nhân
                </Typography>
                <Typography>Email: {data.findOneByEmail.email}</Typography>
                <Typography>Tuổi: {data.findOneByEmail.age}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={() => {
                    console.log(
                      "Đã gửi yêu cầu kết bạn đến",
                      data.findOneByEmail.email
                    );
                  }}
                >
                  Kết bạn
                </Button>
              </Box>
            )}
          </Box>
        </Slide>
      </Dialog>
    </Box>
  );
};

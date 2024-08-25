import {
  experimental_extendTheme as extendTheme,
  PaletteOptions,
} from "@mui/material/styles";

const COLUMN_SCROLL_HEADER_HEIGHT = "62.5px";
const COLUMN_FOOTER_HEIGHT = "56px";
const APP_BAR_HEIGHT = "48px";
const BOARD_BAR_HEIGHT = "58px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = "62.5px";
const FONTFAMILY_ABOUT_US: React.CSSProperties = {
  fontFamily: '"Pacifico", "Exo 2", "Roboto", "Arial", sans-serif',
};

declare module "@mui/material/styles" {
  interface Theme {
    phongFood: {
      appBarHeight: string;
      boardBarHeight: string;
      boardContentHeight: string;
      columnScrollHeaderHeight: string;
      columnFooterHeight: string;
      columnHeaderHeight: string;
      fontFamilyAboutUs: React.CSSProperties;
      background: string;
    };
  }

  interface ThemeOptions {
    phongFood?: {
      appBarHeight?: string;
      boardBarHeight?: string;
      boardContentHeight?: string;
      columnScrollHeaderHeight?: string;
      columnFooterHeight?: string;
      columnHeaderHeight?: string;
      fontFamilyAboutUs?: React.CSSProperties;
      background?: string;
    };
  }
  interface CssVarsThemeOptions {
    palette?: PaletteOptions;
  }
}

const theme = extendTheme({
  phongFood: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnScrollHeaderHeight: COLUMN_SCROLL_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    fontFamilyAboutUs: FONTFAMILY_ABOUT_US,
    background: "linear-gradient(to bottom, #f5f5f0, white 50%, #f5f5f0)",
  },
  typography: {
    fontFamily: '"nunito", sans-serif',
  },
  palette: {
    primary: {
      main: "#FEAF39",
    },
    secondary: {
      main: "#0F172B",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 999,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;

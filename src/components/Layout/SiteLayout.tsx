"use client";

import React, {FC, PropsWithChildren, ReactNode} from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type SiteLayoutProps = {
  children: ReactNode
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f1f1f1',
    },
  },
});

const SiteLayout: FC<SiteLayoutProps> = (props: PropsWithChildren<SiteLayoutProps>) => {

  const {children} = props;

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline/>
      {children}
    </ThemeProvider>
  )
};

export default SiteLayout;

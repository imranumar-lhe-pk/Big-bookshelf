"use client";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { ImageAssets } from "..//config/imageAssets";
import { Box, Button, Typography, styled } from "@mui/material";

const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "common.white",
  minHeight: "100vh",
  maxWidth: theme.spacing(50),
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  alignItems: "center",
  justifyContent: "center",
  justifySelf: "center",
}));

const NotFound: NextPage = () => {
  const router = useRouter();

  const navToHome = () => {
    router.replace("/");
  };

  return (
    <StyledContainer>
      {/* <Image
        height={65}
        width={150}
        alt="brand-logo"
        src={ImageAssets.templateLogo}
      /> */}
      <Typography variant="h4">Page Not Found :(</Typography>
      <Typography variant="body2">
        Oops! 😖 The requested URL was not found on this server.
      </Typography>

      <Button fullWidth variant="contained" onClick={navToHome}>
        Back to Home
      </Button>
    </StyledContainer>
  );
};

export default NotFound;

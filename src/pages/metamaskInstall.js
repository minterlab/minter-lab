import React from "react";
import { Button, Container, Typography } from "@mui/material";

export const MetamaskInstall = () => {
  const handleInstallMetamask = () => {
    // Redirect user to the MetaMask installation page
    // window.location.href = "https://metamask.io/download.html";
    // open in new tab
    window.open("https://metamask.io/download.html", "_blank");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask logo" style={{ width: "100%" }} />
    <Typography variant="h4" align="center" gutterBottom>
      Install MetaMask to continue
    </Typography>
    <Typography variant="body1" align="center" gutterBottom>
      MetaMask is a browser extension that allows you to interact with Ethereum-based decentralized applications (dApps) like ours.
    </Typography>
    <Typography variant="body1" align="center" gutterBottom>
      If you don't already have it installed, please follow the link below to download and install it for your browser.
    </Typography>
    <Button variant="contained" color="primary" onClick={handleInstallMetamask} style={{ marginTop: "2rem" }}>
      Install MetaMask
    </Button>
  </Container>
  );
};


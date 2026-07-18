"use client";

import React from "react";
import { Drawer, Box, Typography, IconButton, Divider } from "@mui/material";
import { X } from "lucide-react";

const CommonSidebar = ({
  open = false,
  onClose,
  title,
  children,
  width = "60%",
  header,
  footer,
  PaperProps = {},
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        ...PaperProps,
        sx: {
          width,
          bgcolor: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          backgroundImage: "none", // removes MUI default overlay
          ...PaperProps.sx,
        },
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width,
          maxWidth: "100vw",
          bgcolor: "#000",
          color: "#fff",
          backgroundImage: "none",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}
      {header ? (
        header
      ) : (
        <>
          <Box
            sx={{
              px: 3,
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h6" sx={{ color: "#000", fontWeight: 700 }}>
              {title}
            </Typography>

            <IconButton
              onClick={onClose}
              sx={{
                color: "#000",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              <X size={20} />
            </IconButton>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
        </>
      )}

      {/* Body */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 3,
          bgcolor: "#000",
          color: "#fff",
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      {footer && (
        <>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
          <Box
            sx={{
              p: 2,
              bgcolor: "#000",
            }}
          >
            {footer}
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default CommonSidebar;

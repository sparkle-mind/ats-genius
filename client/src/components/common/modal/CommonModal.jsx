import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import {  X } from "lucide-react";

const CommonModal = ({
  open,
  onClose,
  title,
  children,
  maxWidth = "md",
  subTitle,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        className: "glass-card text-[var(--color-text-primary)] shadow-2xl m-4",
        sx: {
          bgcolor: "#0f0f0f !important",
          color: "#fff !important",
          borderRadius: "24px",
          border: "1px solid #374151",
          backgroundImage: "none !important",
        },
      }}
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: "rgba(8, 8, 16, 0.60)",
            backdropFilter: "blur(5px)",
          },
        },
      }}
      sx={{
        "& .MuiPaper-root": {
          bgcolor: "#0f0f0f !important",
          color: "#fff !important",
          borderRadius: "24px",
          border: "1px solid #374151",
          backgroundImage: "none !important",
        },
      }}
    >
      {title && (
        <DialogTitle
          className="flex justify-between items-center"
          style={{
            padding: "24px",
            paddingBottom: "16px",
            borderBottom: "1px solid var(--color-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span className="text-xl font-bold">{title}</span>
            {subTitle && <p className="text-[var(--color-text-secondary)] text-sm">{subTitle}</p>}
          </div>
          <IconButton
            onClick={onClose}
            size="small"
            style={{ color: "var(--color-text-secondary)" }}
            className="hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent style={{ padding: "24px" }}>{children}</DialogContent>
    </Dialog>
  );
};

export default CommonModal;

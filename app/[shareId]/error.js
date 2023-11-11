/* eslint-disable @next/next/no-img-element */
"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import "./shared.css";

export default function Error({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Box
      height={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <img src="/sorry.jpg" alt="sorry" className="error-image" />
      <Typography>Something Went Wrong</Typography>
      <Link href="/" sx={{ mt: 3 }}>
        <Button
          sx={{
            textTransform: "none",
          }}
          variant="contained"
        >
          Go To Home
        </Button>
      </Link>
    </Box>
  );
}

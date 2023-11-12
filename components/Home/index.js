/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";

import Input from "../Input";
import Output from "../Output";
import "./home.css";

export default function HomeComponent() {
  const [result, setResult] = useState("");
  const [coupleName, setCoupleName] = useState({
    name1: "",
    name2: "",
  });
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (result) {
      toggleDrawer();
    }
  }, [result]);

  const toggleDrawer = (event, reason) => {
    setOpenDrawer((prevState) => !prevState);
    if (reason) {
      setResult("");
      setCoupleName({});
    }
  };

  return (
    <>
      <Box>
        <img
          className="flamesLogo"
          src="/banner-image.jpg"
          alt="Banner Image"
        />
        <Input setResult={setResult} setCoupleName={setCoupleName} />
        <Drawer
          anchor="bottom"
          open={openDrawer}
          onClose={toggleDrawer}
          PaperProps={{
            sx: {
              borderRadius: "15px 15px 0px 0px",
            },
          }}
        >
          <Box display="flex" justifyContent="flex-end" p={2}>
            <CancelIcon
              sx={{ color: "#808080", cursor: "pointer" }}
              onClick={(event) => toggleDrawer(event, "cancel icon clicked")}
            />
          </Box>
          <Output
            result={result}
            name1={coupleName?.name1}
            name2={coupleName?.name2}
            showShare
          />
        </Drawer>
      </Box>

      <Box>
        <Typography variant="caption">
          <b>Disclaimer:</b> This project is developed for fun and results
          obtained from this App is not to be taken seriously!
        </Typography>
      </Box>
    </>
  );
}

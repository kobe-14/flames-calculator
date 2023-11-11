/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Share from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CircularProgress from "@mui/material/CircularProgress";

import "./output.css";

function Output({
  result = "",
  name1 = "",
  name2 = "",
  showShare = false,
  showGoToHome = false,
}) {
  const [loader, showLoader] = useState(false);
  const [shareResult, setShareResult] = useState({});
  useEffect(() => {
    const audio = new Audio("/1se_notification.mp3");
    audio.play();
  }, []);

  const getShareLink = async () => {
    try {
      const host = window.location.href;
      if (Object.keys(shareResult).length > 0) {
        await navigator.share({
          text: `Hey here is the FLAMES calculated for ${name1} & ${name2}`,
          url: `${host}${shareResult?._id}`,
        });
      } else {
        showLoader(true);
        const postData = {
          firstName: name1,
          secondName: name2,
          result,
        };
        const res = await fetch(`${host}/api/flames`, {
          method: "POST",
          body: JSON.stringify(postData),
        });
        const responeObj = await res.json();
        const { data: { _id: resultId } = {} } = responeObj || {};
        setShareResult(responeObj.data);
        showLoader(false);
        await navigator.share({
          text: `Hey here is the FLAMES calculated for ${name1} & ${name2}`,
          url: `${host}${resultId}`,
        });
      }
    } catch (error) {
      console.log("Error while sharing", error);
      showLoader(false);
    }
  };

  const copyLink = async () => {
    try {
      const host = window.location.href;
      if (Object.keys(shareResult).length > 0) {
        await navigator.clipboard.writeText(`${host}${shareResult?._id}`);
      } else {
        showLoader(true);
        const postData = {
          firstName: name1,
          secondName: name2,
          result,
        };
        const res = await fetch(`${host}/api/flames`, {
          method: "POST",
          body: JSON.stringify(postData),
        });
        const responeObj = await res.json();
        const { data: { _id: resultId } = {} } = responeObj || {};
        setShareResult(responeObj.data);
        showLoader(false);
        await navigator.clipboard.writeText(`${host}${resultId}`);
      }
    } catch (error) {
      console.log("Error while sharing", error);
      showLoader(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img
        className="image-party-popper"
        src="https://media.tenor.com/VgCDirag6VcAAAAi/party-popper-joypixels.gif"
        alt="party-popper"
      />
      <Typography
        sx={{
          mt: 2,
        }}
        textAlign="center"
      >
        The FLAMES for {name1} and {name2} is:
      </Typography>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
        }}
        style={{ fontWeight: "bold" }}
      >
        {result}
      </Typography>
      {showGoToHome && (
        <Link href="/">
          <Button
            sx={{
              textTransform: "none",
            }}
            variant="contained"
          >
            Calculate FLAMES
          </Button>
        </Link>
      )}
      {showShare && (
        <Box mb={2} display="flex" flexDirection="column">
          <Typography variant="caption" textAlign="center">
            Click here to share it with others and start your conversation
          </Typography>
          <Box display="flex" gap={5} justifyContent="center">
            <Button
              disabled={loader}
              startIcon={<ContentCopyIcon />}
              onClick={copyLink}
            >
              {loader ? (
                <CircularProgress size={20} />
              ) : (
                <Typography>Copy</Typography>
              )}
            </Button>
            <Button
              disabled={loader}
              startIcon={<Share />}
              onClick={getShareLink}
            >
              {loader ? (
                <CircularProgress size={20} />
              ) : (
                <Typography>Share</Typography>
              )}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Output;

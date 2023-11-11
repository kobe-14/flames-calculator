import React from "react";
import { headers } from "next/headers";
import Box from "@mui/material/Box";

import Output from "@/components/Output";

async function getFlamesResult(resultId) {
  try {
    const host = headers().get("host");
    const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
    const res = await fetch(`${protocol}://${host}/api/flames/${resultId}`, {
      method: "GET",
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("error:SharedID Page ", error);
    return {
      error: "Error",
    };
  }
}

const Share = async ({ params: { shareId } }) => {
  const flamesResult = await getFlamesResult(shareId);
  console.log("flamesResult: ", flamesResult);

  const { data: { firstName = "", secondName = "", result = "" } = {} } =
    flamesResult || {};

  return (
    <Box display="flex" alignItems="center" height={1}>
      <Output
        name1={firstName}
        name2={secondName}
        result={result}
        showGoToHome
      />
    </Box>
  );
};

export default Share;

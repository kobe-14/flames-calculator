import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const boxStyle = {
  marginTop: "10px",
};

function Input({ setResult, setCoupleName }) {
  const [error, setError] = useState("");

  function flamesResult(name1, name2) {
    if (!isNaN(+name1) || !isNaN(+name2)) {
      setError("Please Enter valid name");
      return;
    }
    if (name1 === name2) {
      setError("Names are identical");
      return;
    }
    let firstName = name1;
    let secondName = name2;
    for (let i = 0; i < name1.length; i++) {
      const findRecurringCharacter = secondName.indexOf(name1[i]);
      if (findRecurringCharacter < 0) {
        continue;
      } else {
        firstName = firstName.replace(name1[i], "");
        secondName = secondName.replace(name1[i], "");
      }
    }

    const remainingCharactersCombined = firstName.length + secondName.length;
    let flames = [
      "Friend",
      "Love",
      "Affection",
      "Marriage",
      "Enemy",
      "Siblings",
    ];
    while (flames.length !== 1) {
      flames = flames.splice(Math.ceil(remainingCharactersCombined / 6), 1);
    }
    setResult(flames[0]);
  }

  function calculateFlames(event) {
    event.preventDefault();
    setError("");
    const firstName = event.target.name1.value.replace(/ /g, "").toLowerCase();
    const secondName = event.target.name2.value.replace(/ /g, "").toLowerCase();

    setCoupleName({
      name1: event.target.name1.value,
      name2: event.target.name2.value,
    });

    if (firstName.length < secondName.length)
      flamesResult(secondName.trim(), firstName.trim());
    else flamesResult(firstName.trim(), secondName.trim());
  }

  return (
    <form onSubmit={calculateFlames}>
      <div style={boxStyle}>
        <TextField
          required
          name="name1"
          label="Enter Name"
          fullWidth
          sx={{ mt: 2 }}
        />
      </div>
      <div style={boxStyle}>
        <TextField
          required
          placeholder="Enter Name 2"
          name="name2"
          label="Enter Name"
          fullWidth
          sx={{ mt: 2 }}
        />
      </div>
      <div style={boxStyle}>
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
          type="submit"
        >
          Submit
        </Button>
        {error && (
          <Box mt={1}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}
      </div>
    </form>
  );
}

export default Input;

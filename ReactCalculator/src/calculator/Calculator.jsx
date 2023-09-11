import React, { Fragment, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";

import Switch from "@mui/material/Switch";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import "../assets/css/calculator.css";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
const keys = [
  {
    keyCode: 55,
    label: "7",
  },
  {
    keyCode: 56,
    label: "8",
  },
  {
    keyCode: 57,
    label: "9",
  },
  {
    keyCode: 52,
    label: "4",
  },
  {
    keyCode: 53,
    label: "5",
  },
  {
    keyCode: 54,
    label: "6",
  },
  {
    keyCode: 49,
    label: "1",
  },
  {
    keyCode: 50,
    label: "2",
  },
  {
    keyCode: 51,
    label: "3",
  },
  {
    keyCode: 48,
    label: "0",
  },
  {
    keyCode: 190,
    label: ".",
  },
  {
    keyCode: 13,
    label: "=",
  },
];

const symbols = [
  {
    label: "⌫",
    keyCode: 8,
    value: "backspace",
  },
  {
    label: "÷",
    keyCode: 111,
    value: "/",
  },
  {
    label: "×",
    keyCode: 56,
    value: "*",
  },
  {
    label: "﹣",
    keyCode: 109,
    value: "-",
  },
  {
    label: "+",
    keyCode: 107,
    value: "+",
  },
];

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function Calculator() {
  const resultRef = useRef();
  const [dark, setDark] = useState(true);
  const [expression, setExression] = useState("");
  const [result, setResult] = useState("");
  const handleKeyPress = (keyCode, key) => {
    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key);
      setExression(expression + key);
    } else if (operators.includes(key)) {
      if (!expression) return;

      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === ".") return;

      setExression(expression + key);
    } else if (key === ".") {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;

      setExression(expression + key);
    } else if (keyCode === 8) {
      if (!expression) return;
      calculateResult(expression.slice(0, -1));
      setExression(expression.slice(0, -1));
    } else if (keyCode === 13) {
      if (!expression) return;
      calculateResult(expression);
    }
  };

  const calculateResult = (exp) => {
    if (!exp) {
      setResult("");
      return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);

    const answer = eval(exp).toFixed(2) + "";
    setResult(answer);
  };

  useEffect(() => {
    resultRef.current.scrollIntoView();
  }, []);

  return (
    <Fragment>
      <Box>
        <Grid container>
          <Grid item>
            <Box
              className="calculator"
              sx={
                dark
                  ? {
                      background:
                        "linear-gradient(45deg, #2c2c54, #130f40, #30336b)",
                    }
                  : {
                      background:
                        "linear-gradient(45deg, #1B1464, #40407a, #1e272e)",
                    }
              }
            >
              <Box className="screen">
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  defaultChecked
                  onClick={() => setDark(!dark)}
                />{" "}
                <Box
                  sx={{
                    textAlign: "right",
                    paddingRight: "4rem",
                    height: "12rem",
                    overflowY: "scroll",
                  }}
                >
                  <Box className="expression">
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: 700,
                        marginTop: "0.4rem",
                        minHeight: "45px",
                      }}
                    >
                      {expression}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "white",
                      fontWeight: 700,
                      marginTop: "0.7rem",
                      minHeight: "45px",
                    }}
                    ref={resultRef}
                  >
                    {result}
                  </Typography>
                </Box>
              </Box>
              <Box className="keypad">
                <Stack direction={"row"} flexWrap={"wrap"}>
                  {keys.map((item, index) => {
                    return (
                      <Typography
                        component={Button}
                        onClick={() => handleKeyPress(item.keyCode, item.label)}
                        key={index}
                        variant="h5"
                        sx={{
                          backgroundColor: "transparent",

                          fontWeight: 700,
                          color: "white",
                          width: "fit-content",
                          padding: "0.7rem 1.8rem",
                          marginLeft: "0.8rem",
                          marginTop: "1.4rem",
                          boxShadow: "0 0 4px 0 gray",
                        }}
                      >
                        {item.label}
                      </Typography>
                    );
                  })}
                  {symbols.map((item, index) => {
                    return (
                      <Typography
                        onClick={() => handleKeyPress(item.keyCode, item.value)}
                        key={index}
                        component={Button}
                        variant="h5"
                        sx={{
                          backgroundColor: "#182C61",

                          fontWeight: 700,
                          color: "white",
                          width: "fit-content",
                          padding: "0.5rem 2.3rem",
                          marginLeft: "0.8rem",
                          marginTop: "1.8rem",
                          boxShadow: "0 0 4px 0 gray",
                          fontSize: "1.5rem",
                        }}
                      >
                        {item.label}
                      </Typography>
                    );
                  })}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
export default Calculator;

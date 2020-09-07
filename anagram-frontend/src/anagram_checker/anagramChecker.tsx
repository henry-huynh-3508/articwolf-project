import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Alert, { Color } from "@material-ui/lab/Alert";
import { isValidInput, createAnagramRequest } from "./anagramHelpers";
import { CHECK_ANAGRAMS } from "./anagramCheckerQueries";
import { useLazyQuery } from "@apollo/react-hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function AnagramChecker() {
  //Styling
  const classes = useStyles();
  //Internal variables
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [alert, setAlert] = useState("info" as Color);
  const [alertMessage, setAlertMessage] = useState(
    "Input must be alphanumeric input,no space and less than 100 characters."
  );
  //query
  const [checkanagrams, { data }] = useLazyQuery(CHECK_ANAGRAMS, {
    variables: { request: createAnagramRequest(textA, textB) },
  });

  //Handle submission
  const onSubmit = () => {
    if (isValidInput(textA) && isValidInput(textB)) {
      checkanagrams();
      if (
        data &&
        data.Anagram_checkAnagram &&
        data.Anagram_checkAnagram.isAnagram
      ) {
        setAlert("success");
        setAlertMessage("Two words are anagrams!");
      } else {
        setAlert("error");
        setAlertMessage("Two words are not anagrams!");
      }
    } else {
      setAlert("error");
      setAlertMessage(
        "Input(s) is invalid! " +
          "Input must be alphanumeric input, no space and less than 100 characters."
      );
    }
  };

  //Handle textA change
  const onTextAChange = (e: any) => {
    setTextA(e.target.value);
  };

  //Handle textB change
  const onTextBChange = (e: any) => {
    setTextB(e.target.value);
  };

  return (
    <Container maxWidth="xs">
      <form className={classes.root} autoComplete="off">
        <TextField id="textA" label="Text A" onChange={onTextAChange} />
      </form>
      <form className={classes.root} autoComplete="off">
        <TextField
          id="textB"
          label="Text B"
          onChange={onTextBChange}
        ></TextField>
      </form>
      <Alert severity={alert}>{alertMessage}</Alert>
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={onSubmit}
        >
          Check anagrams
        </Button>
      </label>
    </Container>
  );
}
export default AnagramChecker;

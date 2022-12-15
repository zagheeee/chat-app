import { useRef, useState, Fragment } from "react";
import "./Input.css";
import "./InputError.css";
import Button from "../utils/Button";
import InputError from "./InputError";

const Input = (props) => {
  const enteredTextRef = useRef();

  const [error, setError] = useState(null);
  const errorHandler = () => setError(null);

  const onSubmitHandler = (e) => {
    const enteredText = enteredTextRef.current.value;

    if (enteredText.trim().length === 0) {
      e.preventDefault();

      setError(1);

      return;
    } else {
      e.preventDefault();

      props.sendMessage(enteredText);

      enteredTextRef.current.value = "";
    }
  };

  return (
    <Fragment>
      <div className="input__error">
        {error && <InputError></InputError>}
        <div className="input__form">
          <form onSubmit={onSubmitHandler} className="input">
            <input
              style={{
                // Promjena
                borderColor: error ? "red" : "#00645b",
                background: error ? "salmon" : "transparent",
              }}
              type="text"
              placeholder="Type in your message and press Enter 📤"
              autoFocus={true}
              ref={enteredTextRef}
              onChange={errorHandler}
            />
            <Button disabled={error} type="submit">
              Send
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Input;

import { useEffect, useRef, useState } from "react";
import { getSocket } from "../Socket";

const Bets = ({ setBetsVisible, timer, bank }) => {
  const [bet, setBet] = useState("");
  const DEFAULT_BET = 50;
  const timerStyle = {
    width: `${50 - 2.5 * (20 - timer)}%`,
  };

  useEffect(() => {
    if (timer == 0) {
      setBet(DEFAULT_BET);
      handleBetSubmit();
    }
  }, [timer]);
  const activateCustomInput = () => {
    setBet("custom");
    //Check if input has already been created
    if (!document.getElementById("custom-input")) {
      const button = document.getElementById("customButton");
      button.innerHTML = "";

      //Creating input elements
      const input = document.createElement("input");
      input.className = "custom-form";
      input.id = "custom-input";
      input.type = "text";
      input.maxLength = 5;
      input.autocomplete = "off";
      button.appendChild(input);
      //Focusing on input and disabling button click
      input.focus();
    }
  };

  const handleBetSubmit = () => {
    let betChosen = bet ? bet : DEFAULT_BET;
    if (bet === "custom") {
      const customInput = document.getElementById("custom-input").value;
      if (/^\d+$/.test(customInput)) {
        betChosen = customInput;
      } else {
        betChosen = DEFAULT_BET;
      }
    }
    if (betChosen > bank) {
      betChosen = bank;
    }
    setBetsVisible(false);
    getSocket().emit("player-bet", betChosen);
  };

  return (
    <>
      <button
        className={"bet-button mx-2" + (bet == "50" ? " bet-selected" : "")}
        onClick={() => setBet(50)}
      >
        50
      </button>
      <button
        className={"bet-button mx-2" + (bet == "100" ? " bet-selected" : "")}
        onClick={() => setBet(100)}
      >
        100
      </button>
      <button
        className={
          "bet-button mx-2" + (bet === "custom" ? " bet-selected" : "")
        }
        id="customButton"
        onClick={() => activateCustomInput()}
      >
        Custom
      </button>
      <button className="bet-submit-button mx-2" onClick={handleBetSubmit}>
        Bet
      </button>
    </>
  );
};

export default Bets;

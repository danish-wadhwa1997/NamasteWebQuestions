import React, { useState } from "react";
import './styles.css'

const setChipsToLs = (items) => {
  localStorage.setItem("chips", JSON.stringify(items));
}

const getChips = () => {
  const chips = JSON.parse(localStorage.getItem("chips"));
  return chips
}

function ChipsInput() {

  const [chips, _setChips] = useState(getChips() || []);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const setChips = (chips) => {
    _setChips(chips);
    setChipsToLs(chips);

  }

  const handleEnterPress = (e) => {
    if (e.keyCode === 13 && e.target.value && e.target.value != " ") {
      const chip = {
        id: new Date().getTime().toString(),
        value: e.target.value.trim()
      }
      setChips([...chips, chip]);
      setValue("");
    }
  }

  const handleDeleteItem = (id) => {
    setChips(chips.filter(chip => chip.id != id));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "40px 0" }}>
      <h2>Chips Input</h2>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleEnterPress}
        placeholder="Type a chip and press tag"
        style={{ padding: "8px", width: "200px" }}
      />
      <ul>
        {chips.length > 0 && chips.map(({ value, id }) => <li key={id}>{value} <button onClick={() => handleDeleteItem(id)}>X</button></li>)}
      </ul>
    </div>
  );
}

export default ChipsInput;
import React from "react";

const itemStyle = {
  padding: "0px",
  position: "relative",
  height: "26px",
  display: "flex",
  alignItems: "center",
};

const textStyle = {
  ...itemStyle,
  padding: "0px 4px",
  height: "26px",
  fontFamily: "Arial",
  fontSize: "13px",
};

const inputStyle = {
  padding: "0",
  position: "absolute",
  left: "2px",
  top: "2px",
  right: "45px",
  bottom: "2px",
  minWidth: "20px",
  fontFamily: "Arial",
  fontSize: "13px",
};

const buttonStyle = {
  position: "absolute",
  top: "2px",
  right: "2px",
  bottom: "2px",
  width: "40px",
};

const Cell = React.memo(({ value, mode, onChange }) => {
  const [localMode, setLocalMode] = React.useState(mode ?? "read");
  const [localValue, setLocalValue] = React.useState(value ?? "");
  React.useEffect(() => setLocalMode(mode ?? "read"), [mode]);
  React.useEffect(() => setLocalValue(value ?? ""), [value]);

  if (localMode === "edit") {
    const handleInputChange = (e) => setLocalValue(e.target.value);
    const handleSaveClick = () => {
      setLocalMode("read");
      onChange?.(localValue);
    };

    return (
      <div style={itemStyle}>
        <input
          type="text"
          value={localValue}
          style={inputStyle}
          onChange={handleInputChange}
        />
        <button style={buttonStyle} onClick={handleSaveClick}>
          Ok
        </button>
      </div>
    );
  }

  if (localMode === "read") {
    const handleEditClick = () => {
      setLocalMode("edit");
    };
    return (
      <div style={textStyle} onClick={handleEditClick}>
        {localValue}
      </div>
    );
  }
  return null;
});

export default Cell;

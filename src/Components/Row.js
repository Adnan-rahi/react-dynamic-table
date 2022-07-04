import React from "react";
import Cell from "./Cell";

const tdStyle = {
  padding: "1px",
  border: "1px solid black",
};

const optionStyle = {
  ...tdStyle,
  padding: "2px 2px",
  width: "30px",
};

const Row = React.memo(({ mode, columns, data, onChange, onDelete }) => {
  const handleDeleteClick = () => onDelete?.();
  return (
    <tr>
      {columns.map(({ path }, columnIndex) => {
        const handleChange = (value) => {
          if (onChange) {
            const changedData = { ...data, [path]: value };
            onChange(columnIndex, changedData);
          }
        };
        return (
          <td key={path} style={tdStyle}>
            <Cell mode={mode} value={data[path]} onChange={handleChange} />
          </td>
        );
      })}
      <td style={optionStyle}>
        <button onClick={handleDeleteClick}>Delete</button>
      </td>
    </tr>
  );
});

export default Row;

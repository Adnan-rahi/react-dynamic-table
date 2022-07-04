import React from "react";
import Row from "./Row";

const Table = React.memo(({ id, columns, data, onChange, onDelete }) => {
  const [addedIndex, setAddedIndex] = React.useState();

  const tableStyle = {
    border: "1px solid black",
    borderCollapse: "collapse",
    width: "100%",
  };

  const tdStyle = {
    padding: "1px",
    border: "1px solid black",
  };

  return (
    <div>
      <table style={tableStyle}>
        <tbody>
          <tr>
            {columns.map(({ path, name }) => (
              <th key={path} style={tdStyle}>
                {name}
              </th>
            ))}
          </tr>

          {data.map((rowData, rowIndex) => {
            const handleChange = (columnIndex, changedData) => {
              onChange?.(rowIndex, columnIndex, changedData);
            };

            const handleDelete = () => {
              if (rowIndex !== addedIndex) {
                setAddedIndex(addedIndex - 1);
              }
              onDelete?.(rowIndex, rowData);
            };

            return (
              <Row
                key={rowData[id]}
                mode={addedIndex === rowIndex ? "edit" : "read"}
                columns={columns}
                data={rowData}
                onChange={handleChange}
                onDelete={handleDelete}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

export default Table;

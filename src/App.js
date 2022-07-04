import React, { useEffect } from "react";
import Table from "./Components/Table";
import axios from "axios";

const replaceItem = (updater, index, item) => {
  updater((array) => array.map((value, i) => (i === index ? item : value)));
};

const deleteItem = (updater, index) => {
  updater((array) => array.filter((value, i) => i !== index));
};

const columns = [
  { path: "id", name: "ID" },
  { path: "name", name: "Name" },
  { path: "email", name: "Email" },
  { path: "phone", name: "Phone" },
  { path: "website", name: "Website" },
];

const App = () => {
  const [data, setData] = React.useState(() => []);
  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (rowIndex, changedRowData) => {
    replaceItem(setData, rowIndex, changedRowData);
  };

  const handleDelete = (rowIndex, deletedRowData) => {
    deleteItem(setData, rowIndex);
  };

  return (
    <div>
      <Table
        id="id"
        columns={columns}
        data={data}
        onChange={handleChange}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;

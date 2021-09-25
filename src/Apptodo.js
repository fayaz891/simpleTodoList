import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

function Apptodo() {
  const [input, setinput] = useState("");
  const [item, setitem] = useState(getitemss());

  // add item
  function additem() {
    if (input === "") {
      alert("please enter something");
    } else {
      setitem([...item, input]);
    }
    setinput("");
  }

  // remove item
  function itemdel(ind) {
    const remainitem = item.filter((elem, id) => {
      return id !== ind;
    });
    setitem(remainitem);
  }

  // store data in local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(item));
  }, [item]);

  function getitemss() {
    let data = localStorage.getItem("list");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="TodoForm"
      >
        <h1>Todo List</h1>
        <div className="main">
          <input
            type="text"
            placeholder="Add something"
            name="text"
            value={input}
            onChange={(e) => {
              setinput(e.target.value);
            }}
          />
          <button onClick={additem}>
            <AddCircleIcon color="success" />
          </button>
        </div>

        <ul>
          {item.map((elem, ind) => {
            return (
              <div className="list" key={ind}>
                <button
                  onClick={() => {
                    itemdel(ind);
                  }}
                >
                  <DeleteIcon color="error" />
                </button>
                <li>{elem}</li>
              </div>
            );
          })}
        </ul>
      </form>
    </div>
  );
}

export default Apptodo;

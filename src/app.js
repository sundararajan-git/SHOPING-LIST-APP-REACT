import React, { useState } from "react";
import "./app.css";

const App = () => {
  const [list, setList] = useState(
    [JSON.parse(localStorage.getItem("shoping-list"))] || []
  );
  const [item, setItem] = useState({
    item: "",
    id: 0,
    itemnum: 1,
    checked: false,
  });
  const [click, setClick] = useState(false);
  const [total, settotal] = useState(0);
  const addItem = (e) => {
    const add = { ...item, item: e.target.value };
    setItem(add);
    localStorage.setItem("shoping-list", JSON.stringify(add));
  };
  const addClick = () => {
    if (item.item) {
      setItem({ ...item, id: item.id++ });
      const add = [...list, item];
      setList(add);
      setClick(true);
      setItem({ ...item, item: "" });
      settotal(total + 1);
      localStorage.setItem("shoping-list", JSON.stringify(add));
    }
  };
  const deleteHandle = (e, i, itemnum) => {
    settotal(total - itemnum);
    let filtered = list.filter((item, index) => {
      return i !== index;
    });
    setList(filtered);
    localStorage.setItem("shoping-list", JSON.stringify(filtered));
  };
  const increment = (i) => {
    const inc = [...list, list[i].itemnum++];
    setItem(inc);
    // eslint-disable-next-line
    const out = list.map((item, index) => {
      if (i === index) {
        settotal(total + 1);
      }
    });
    localStorage.setItem("shoping-list", JSON.stringify(inc, out));
  };
  const decrement = (i) => {
    if (list[i].itemnum >= 1) {
      settotal(total - 1);
    }
    setItem([...list, list[i].itemnum > 0 ? list[i].itemnum-- : null]);
  };

  const checkedHandle = (id) => {
    const checkbox = list.map((item, index) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setList(checkbox);
  };
  return (
    <div className="body">
      <div className="container">
        <div className="header">
          <input
            type="text"
            id="add"
            placeholder="Add item..."
            value={item.item}
            onChange={addItem}
          />
          <button onClick={addClick}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="lists">
          {click || list
            ? list &&
              list.map((item, index) => {
                return (
                  <div key={index} className="list">
                    <div className="item">
                      <input
                        type="checkbox"
                        id={`radio${index}`}
                        name={`r${index}`}
                        onClick={() => checkedHandle(item.id)}
                        checked={item.checked}
                      />
                      <span> </span>
                      <label
                        htmlFor={`radio${index}`}
                        name={`r${index}`}
                        className={item.checked ? "strike" : "normal"}
                      >
                        {item.item}
                      </label>
                    </div>
                    <div id="numhandle">
                      <button onClick={() => decrement(index)}>
                        <i className="fa-solid fa-chevron-left"></i>
                      </button>
                      <span>{item.itemnum}</span>
                      <button onClick={() => increment(index)}>
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>
                      <span> </span>
                      <span> </span>
                      <span> </span>
                      <span> </span>
                      <button
                        type="button"
                        onClick={(e) => deleteHandle(e, index, item.itemnum)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <p>Total:{total}</p>
      </div>
    </div>
  );
};
export default App;

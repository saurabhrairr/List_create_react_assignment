import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Listcreate.css"; // Import CSS file for styling

const Listcreate = () => {
  const [originalList, setOriginalList] = useState([]);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [newList, setNewList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCheckedLists, setIsCheckedLists] = useState({
    list1: false,
    list2: false,
    list3: false,
  });

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(
          "https://apis.ccbp.in/list-creation/lists"
        );
        const fetchedList = response.data.lists;

        // Divide the original list into two parts
        const midIndex = Math.ceil(fetchedList.length / 2);
        const list1 = fetchedList.slice(0, midIndex);
        const list2 = fetchedList.slice(midIndex);

        setOriginalList(fetchedList);
        setList1(list1);
        setList2(list2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLists();
  }, []);

  const handleItemClick = (item) => {
    const isItemInNewList = newList.some((newItem) => newItem.id === item.id);
    if (isItemInNewList) {
      const updatedNewList = newList.filter((newItem) => newItem.id !== item.id);
      setNewList(updatedNewList);
    } else {
      const updatedSelectedItems = [...selectedItems, item];
      setSelectedItems(updatedSelectedItems);
    }
  };

  const handleCheckList = (list) => {
    setIsCheckedLists((prevState) => ({
      ...prevState,
      [list]: !prevState[list],
    }));
  };

  const handleCreateNewList = () => {
    if (!isCheckedLists.list1 || !isCheckedLists.list2) {
      alert("Please select items from List 1 and List 2.");
      return;
    }

    const combinedList = [...selectedItems, ...list2];
    setNewList(combinedList);
  };

  const handleValidateNewList = () => {
    // Perform validation logic here
    if (newList.length === 0) {
      alert("No items in the new list to validate.");
      return;
    }

    // Validation logic can be added here
    alert("Validation successful! New list is valid.");
  };

  return (
    <div className="lists-container">
      <div className="list list-left">
        <label>
          <input
            type="checkbox"
            checked={isCheckedLists.list1}
            onChange={() => handleCheckList("list1")}
          />
          List 1:
        </label>
        <ul>
          {list1.map((item) => (
            <div key={item.id}>
              <div onClick={() => handleItemClick(item)}>
                <input
                  type="checkbox"
                  checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                  readOnly
                />
                <h3>{item.name}</h3>
                <p> {item.description}</p>
              </div>
            </div>
          ))}
        </ul>
      </div>

      <div className="list list-right">
        <label>
          <input
            type="checkbox"
            checked={isCheckedLists.list2}
            onChange={() => handleCheckList("list2")}
          />
          List 2:
        </label>
        <ul>
          {list2.map((item) => (
            <div key={item.id}>
              <div onClick={() => handleItemClick(item)}>
                <input
                  type="checkbox"
                  checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                  readOnly
                />
                <h3>{item.name}</h3>
                <p> {item.description}</p>
              </div>
            </div>
          ))}
        </ul>
      </div>

      <div className="create-list-btn">
        <button onClick={handleCreateNewList}>Create New List</button>
      </div>

      {newList.length > 0 && (
        <div className="new-list">
          <label>
            <input
              type="checkbox"
              checked={isCheckedLists.list3}
              onChange={() => handleCheckList("list3")}
            />
            New List:
          </label>
          <ul>
            {newList.map((item) => (
              <div key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <p> {item.description}</p>
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}

      {newList.length > 0 && (
        <div className="validate-list-btn">
          <button onClick={handleValidateNewList}>Validate New List</button>
        </div>
      )}
    </div>
  );
};

export default Listcreate;

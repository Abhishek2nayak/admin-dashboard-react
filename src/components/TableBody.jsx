import React from "react";

import { useState } from "react";

const TableBody = ({
  members,
  onDelete,
  onUpdate,
  currentPage,
  selectedRows,
  handleCheckBoxChange,
}) => {
  const [editableRow, setEditableRow] = useState(null);
  const [editedData, setEditedData] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
  });
  

  //trigger when user clicked the save button
  function handleSaveClick() {
    setEditableRow(null);
    onUpdate(editedData);
  }
  
  //trigger when edit button clicked
  function handleEditClick(rowId) {
    setEditableRow(rowId);
    const rowToEdit = members.find((row) => row.id === rowId);
    setEditedData({ ...rowToEdit });
    onUpdate(editedData);
  }

  //on delete btn click
  function handleDeleteClick(rowId) {
    onDelete(rowId);
  }
  const rowSize = 10;
  const startIndex = (currentPage - 1) * rowSize;
  const endIndex = startIndex + rowSize;
  members  = members ? members.slice(startIndex, endIndex) : "";

      const rowElement =members ? members?.map((ele) => (
        <tr key={ele.id} className= {(ele.id === editableRow || selectedRows.includes(ele.id)) ? "active" : "" }>
          <td>
            <input
              type="checkbox"
              checked={selectedRows.includes(ele.id)}
              onChange={() => handleCheckBoxChange(ele.id)}
            />
          </td>
          <td
            contentEditable={editableRow === ele.id}
            onInput={(e) =>
              setEditedData({
                ...editedData,
                id: ele.id,
                name: e.target.textContent,
              })
            }
          >
            {ele.name}
          </td>
          <td
            contentEditable={editableRow === ele.id}
            onInput={(e) =>
              setEditedData({ ...editedData, email: e.target.textContent })
            }
          >
            {ele.email}
          </td>
          <td
            contentEditable={editableRow === ele.id}
            onInput={(e) =>
              setEditedData({ ...editedData, role: e.target.textContent })
            }
          >
            {ele.role}
          </td>
          <td>
            {editableRow === ele.id ? (
              <>
                <button
                  onClick={handleSaveClick}
                  className="save btn"
                  title="Save"
                >
                  <i class="ri-save-line"></i>
                </button>
                <button
                  onClick={() => setEditableRow(null)}
                  className="cancel btn"
                  title="Cancel"
                >
                  <i class="ri-close-line"></i>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEditClick(ele.id)}
                  className="edit btn"
                  title="Edit"
                >
                  <i class="ri-edit-box-line"></i>
                </button>
                <button
                  onClick={() => handleDeleteClick(ele.id)}
                  className="delete btn"
                  title="Delete"
                >
                  <i class="ri-delete-bin-7-line"></i>
                </button>
              </>
            )}
          </td>
        </tr>
      ))
    : "No data found";

  return (
    <>
      {rowElement}
      
    </>
  );
};

export default TableBody;

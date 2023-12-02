import React from "react";

const TableHead = ({ 
  handleSelectAllChange, 
  isAllSelected }) => {
 
  return (
    <>
      <tr className="table-column-heading">
        <th>
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={handleSelectAllChange}
          />
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </>
  );
};

export default TableHead;

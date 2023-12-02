import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const Table = ({
selectedRows,
  members,
  onDelete,
  onUpdate,
  currentPage,
  handleCheckBoxChange,
  handleSelectAllChange,
  isAllSelected,
}) => {


  return (
    <table>
      <TableHead
        handleSelectAllChange={handleSelectAllChange}
        selectedRows={selectedRows}
        isAllSelected={isAllSelected}
      />
      <TableBody
        members={members}
        onDelete={onDelete}
        onUpdate={onUpdate}
        handleCheckBoxChange={handleCheckBoxChange}
        currentPage={currentPage}
        selectedRows={selectedRows}
      />
    </table>
  );
};

export default Table;

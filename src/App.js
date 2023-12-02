import './App.css';
import React from 'react';
import Header from './components/Header';
import { useState } from 'react';
import SearchForm from './components/SearchForm';
import { getMembers } from './API'
import Table from './components/Table';
import Pagination from './components/Pagination';



function App() {
  const[loading,setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState(""); //handing search query
  const [members, setMembers] = useState(null); // get members
  const [filterMember, setFilterMember] = useState(null); //create filter copy of members
  const [currentPage, setCurrentPage] = useState(1); // handle the state of pagination
  const [selectedRows, setSelectedRows] = useState([]) //to handle select rows state
  const [isAllSelected, setIsAllSelected] = useState(false); //handle if user select all rows
  //get the member 
  React.useEffect(() => {
    async function loadMembers() {
      try {
        setLoading(true)
        const data = await getMembers();
        setMembers(data);
        setLoading(false)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    }
    loadMembers();
  }, [])

  

  //function to handle search change
  function handleSearchChange(e) {
    setSearchQuery(e.target.value)
  }


  //trigger whenever checkbox clicked
  function handleCheckBoxChange(id) {
    //if row is already added in array then remove it
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      //add the new row id into selected rows
      setSelectedRows([...selectedRows, id]);
    }
  }


  // trigger when user search the data
  function handleSearchSubmit(e) {
    
    e.preventDefault();
    //filter the data according to the search query
    const newFilterData = members ? members?.filter((row) =>
      row.id === searchQuery ||
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.role.toLowerCase().includes(searchQuery.toLowerCase())
    ) : members;
    setFilterMember(newFilterData)
  }

  //trigger when user delete the row
  function handleRowDelete(rowId) {
    const updatedData = members.filter((row) => row.id !== rowId);
    setMembers(updatedData)
    setFilterMember(updatedData)
  }

  //trigger when row is updated
  function handleRowUpdate(data) {
    const updateData = members.map((row) =>
      row.id === data.id ? { ...row, ...data } : row)
    setMembers(updateData)
    setFilterMember(updateData)
  }
  //this will insure that pagination should of 10 rows
  const rowSize = 10;
  const temp = filterMember ? filterMember : members;
  const totalPages = Math.ceil(temp?.length / rowSize);

  //handle when user change the page
  function handlePageChange(page) {
    console.log(page);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  //define the start and end index for pagination
  const startIndex = (currentPage - 1) * rowSize;
  const endIndex = startIndex + rowSize;
  const handleSelectAllChange = () => {
    //is it's checked  then we need to unchecked the all rows
    if (isAllSelected) {
      setSelectedRows([])
    } else {
      // checked the current page rows
      const currentPageRows = members?.slice(startIndex, endIndex).map((row) => row.id);
      setSelectedRows(currentPageRows)
    }
    setIsAllSelected(!isAllSelected)
  };

  //delete the selected rows
  function handleSelectedDelete() {
    const updatedData = members.filter((row) => !selectedRows.includes(row.id));
    setMembers(updatedData);
    setFilterMember(updatedData);
    setSelectedRows([]);

    setIsAllSelected(false)
  }

  return (
    <>
      <Header />
      {loading ? "Data is loading" : 
      <div className='container'>
        <div className='top'>
          <SearchForm
            onChange={handleSearchChange}
            value={searchQuery}
            onSubmit={handleSearchSubmit}
          />
          <button className='btn delete' title='Delete selected rows' onClick={handleSelectedDelete}><i class="ri-delete-bin-7-line"></i></button>
        </div>
        <Table
          selectedRows={selectedRows}
          onDelete={handleRowDelete}
          onUpdate={handleRowUpdate}
          isAllSelected={isAllSelected}
          handleCheckBoxChange={handleCheckBoxChange}
          handleSelectAllChange={handleSelectAllChange}
          currentPage={currentPage}
          members={filterMember ? filterMember : members}
        />
        <div className='bottom'>

          <p> {selectedRows?.length} from { filterMember? filterMember.length : members?.length} row(s) selected.</p>
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            members={filterMember ? filterMember : members}
          />
        </div>

      </div>};
    </>
  )
}

export default App;

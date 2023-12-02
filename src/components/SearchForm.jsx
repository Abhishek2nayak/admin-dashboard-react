import React from "react";

const SearchForm = ({ onSubmit, onChange, value }) => {
  return (
    <form onSubmit={onSubmit}  className='search-form'>
     
      <input type="text" 
        name="search" 
        id="search"
        value={value}
        onChange={onChange}
        placeholder="Search here"
      />
      <button type="submit" className="btn search-icon"><i class="ri-search-line"></i></button>
    </form>
  );
};

export default SearchForm;

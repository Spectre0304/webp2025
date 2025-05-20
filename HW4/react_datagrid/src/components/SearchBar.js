import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };
  
  return (
    <div className="mb-3">
      <input 
        type="text" 
        className="form-control" 
        placeholder="搜尋..." 
        onChange={handleChange}
        style={{ width: '300px' }}
      />
    </div>
  );
};

export default SearchBar;
const SearchBar = ({ searchText, handleSearch }) => {
  return (
    <div>
      <input
        value={searchText}
        onChange={handleSearch}
        className="w-96 rounded-lg shadow-lg border border-black border-solid h-12 pl-6"
        placeholder="Enter the username or email..."
      ></input>
    </div>
  );
};

export default SearchBar;

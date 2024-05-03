import Wrapper from "./style";

const Search = ({ name, state, setState, placeholder }) => {
  console.log(state);
  const handleChangeSearch = async (e) => {
    setState((prev) => e.target.value);
  };

  return (
    <Wrapper>
      <h5>Search</h5>
      <div className="search-container">
        <div className="form-row">
          <div className="form-unit">
            <input
              name={name}
              value={state}
              onChange={handleChangeSearch}
              placeholder={placeholder}
              type="text"
              className={`form-unit-input`}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Search;



function InputSearch({ setInputValue, value }) {

  return (
    <input
      type="text"
      onChange={(event) => {
        let inputValue = event.target.value;
        console.log(inputValue);
        setInputValue(inputValue);
      }}
      value={value}
      placeholder="search"
      className="form-control"
    />
  );
}

export default InputSearch;
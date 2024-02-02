const Search = ({ value, onChange }) => {
    return <div>
        find countries<input onChange={onChange} value={value} ></input>
    </div>
}

export default Search
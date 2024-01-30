const Filter = ({ filter, onChange }) => {
    return <div>
        filter shown with: <input onChange={onChange} value={filter} />
    </div>

}

export default Filter
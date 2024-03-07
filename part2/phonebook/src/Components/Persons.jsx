const Persons = ({ persons, onDelete }) => {

    return (
        <>
            {persons != undefined ? persons.map(person => <div key={person.name}>{person.name} {person.number}<button onClick={() => onDelete(person)} >Delete</button></div>) : null}

        </>
    )
}

export default Persons
import CountryInfo from "./CountryInfo"

const Search = ({ countries }) => {
    if (countries.length > 10) return <div>Too many matches, specify another filter</div>

    if (countries.length == 1) return <CountryInfo country={countries[0]} />

    return <div>
        {countries.map(country => <div key={country.name.common}>{country.name.common}</div>)}
    </div>
}

export default Search
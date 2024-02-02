import { useState, useEffect } from 'react'
import countryService from './services/countryService'
import Search from './components/Search'
import CountryList from './components/CountryList'


function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const filteredCountries = filter.length > 0
    ? countries.filter(country => country.name.common.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    : countries

  useEffect(() => {
    countryService.GetAll().then(result => setCountries(result))

  }, [])

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      <Search value={filter} onChange={onFilterChange} />
      <div>debug: {filter}</div>
      <CountryList countries={filteredCountries} />
    </>
  )
}

export default App

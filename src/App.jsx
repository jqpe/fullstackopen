import { useEffect } from 'react'
import { useState } from 'react'
import countriesService from './services/countries'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)

  useEffect(() => {
    countriesService.getAll().then(res => setCountries(res.data))
  }, [])

  const searchResults = countries.filter(country =>
    new RegExp(searchQuery, 'gi').test(country.name.common)
  )

  const onCountryClick = ccn3 => {
    setCountry(countries.find(country => country.ccn3 === ccn3))
  }

  return (
    <div>
      <div>
        find countries:{' '}
        <input
          onChange={e => {
            setCountry(null)
            setSearchQuery(e.currentTarget.value)
          }}
        />
      </div>
      {country ? (
        <Country country={country} />
      ) : (
        <SearchResults
          shownCountry={country}
          searchResults={searchResults}
          handleCountryClick={onCountryClick}
        />
      )}
    </div>
  )
}

function SearchResults({ searchResults, handleCountryClick }) {
  if (searchResults.length > 10) {
    return 'Too many matches, specify another filter'
  }

  if (searchResults.length > 1) {
    return (
      <ul>
        {searchResults.map(country => (
          <li key={country.ccn3}>
            {country.name.common}{' '}
            <button onClick={() => handleCountryClick(country.ccn3)}>
              show
            </button>
          </li>
        ))}
      </ul>
    )
  }

  if (searchResults.length === 1) {
    return <Country country={searchResults[0]} />
  }

  return 'no results'
}

function Country({ country }) {
  return (
    <article>
      <h1>{country.name.common}</h1>
      <table>
        <tbody>
          <tr>
            <td>capital</td>
            <td>{country.capital.at(0)}</td>
          </tr>
          <tr>
            <td>area</td>
            <td>{country.area}</td>
          </tr>
        </tbody>
      </table>

      <b>languages:</b>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        style={{ maxHeight: 100, boxShadow: '1 1 2 black' }}
      />
    </article>
  )
}

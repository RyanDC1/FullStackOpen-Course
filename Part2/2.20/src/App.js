import { useEffect, useState } from "react";
import countryService from "./services/CountryService";
import { CountryDetails, CountryList, Loader, Search } from './components'


function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [validSearchLength, setValidSearchLength] = useState(true)
  const [loading, setLoading] = useState(false)
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState()

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      // cannot use search api /api/name/{searchTerm} provided by 
      // 'https://studies.cs.helsinki.fi/restcountries/' as it supports direct match
      setLoading(true)
      setCountries([])
      setSelectedCountry()
      countryService.getAll()
        .then((countries) => {
          const filteredCountries = countries.filter(s => s.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
          console.log("Countries:", filteredCountries)

          if (filteredCountries?.length > 10) {
            setValidSearchLength(false)
          }
          else {
            setValidSearchLength(true)
            setCountries(filteredCountries)
            if (filteredCountries?.length === 1) {
              setSelectedCountry(filteredCountries[0])
            }
          }
        })
        .catch((error) => {
          console.error("An error occurred while fetching countries information: ", error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    else {
      setCountries([])
      setSelectedCountry()
    }

  }, [searchTerm])

  return (
    <>
      <Search
        onChange={(searchTerm) => setSearchTerm(searchTerm)}
      />

      <Loader loading={loading}>
        {
          !validSearchLength ?
            <p>Search term is too small, please specify more characters</p>
            :
            <>
              {
                selectedCountry ?
                  <CountryDetails 
                    country={selectedCountry}
                    allowCancel={countries?.length > 1}
                    onCancel={() => setSelectedCountry()}               
                  />
                  :
                  <CountryList 
                    countries={countries} 
                    onSelect={(country) => setSelectedCountry(country)}                    
                  />
              }
            </>
        }
      </Loader>
    </>
  );
}

export default App;

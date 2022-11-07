import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { PropagateLoader } from 'react-spinners'
import Layout from '../components/layout'
import MovieCard from '../components/movieCard'

const SearchPage = ({location})  => {

  const [results, setResults] = useState([])
  const [error, setError] =  useState(false)
  const [query, setQuery] =  useState(null)
  const [loading, setLoading] =  useState(false)


  const searchQuery = location.state.query
  

  
  function getSearch() {
    setLoading(true)
    axios.get(`${process.env.GATSBY_TMDB_BASE_API_URL}/search/movie?api_key=${process.env.TMDB_API}&query=${query}`)
    .then((res) =>{
      setResults(res.data.results)
      setLoading(false)
      console.log('res', res.data)
    }).catch(error => {
      setLoading(false)
      setError(error)
    })
  }

  

  useEffect( () => {
    setQuery(searchQuery)
  },[query])

  useEffect( () => {
    getSearch()
  },[])

  return (
    <Layout>
      <main>
        <div id="hero" className="p-4 relative 2xl:h-[15vw] m-auto">
          <img src="" alt="" />
          <div className="absolute inset-0 opacity-75 bg-slate-500 flex flex-col p-16 gap-4">
            <div className="flex flex-col gap-4">
              <h3 className="text-4xl font-bold text-white">Search Results.</h3>
              <h5 className="text-3xl font-semibold text-white">Here are the results for your search term '{query}'</h5>
            </div>
          </div>
        </div>

        <div className='text-center my-5'>
                <PropagateLoader color="#36d7b7" loading={loading} size={20} />
              </div>

              <div className="grid grid-cols-4 gap-4">
                {results.length ? ( 
                  results.map( movie => {
                    return <MovieCard movie={movie} key={movie.id}/>
                  }) 
                ) : (
                  <div>No item with the search term has been found</div>
                )}
        </div>


      </main>
    </Layout>
  )
}

export default SearchPage
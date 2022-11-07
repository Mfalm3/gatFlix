import React, { useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import axios from 'axios'
import { isEmpty } from 'lodash'
import Layout from '../components/layout'
import MovieCard from '../components/movieCard'
import '../styles/text.css'

export const Head = () => <title>Genre Page</title>

export const Banner = graphql`
query ImgQuery($slug: String) {
  file(name: {eq: $slug}) {
    name
    childImageSharp {
      gatsbyImageData(
        placeholder: BLURRED
        formats: [AUTO]
        layout: CONSTRAINED
        height: 400
        width: 1510
      )
    }
  }
}
`

export default function GenreDetails({pageContext, data}) {

  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')

  const banner = data.file.childImageSharp.gatsbyImageData
  const slug = pageContext.slug

  const genres = JSON.parse(localStorage.getItem('genres'))
  const genre = genres.find( g => g.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-') === slug )
  
  const url  = `${process.env.GATSBY_TMDB_BASE_API_URL}/discover/movie?api_key=${process.env.TMDB_API}&language=en-US&sort_by=popularity.desc&with_genres=${genre.id}`

  function getMoviesByGenre(){
    const genreMovies = JSON.parse(localStorage.getItem('moviesByGenre'))
    if( !isEmpty(genreMovies) && genreMovies.genreKey === genre.name ){
      const { genreKey, ...dataItems } = genreMovies
      const movies = Object.values(dataItems)
      setMovies(movies)
    }else{
      axios.get(url)
      .then((res) =>{
        setMovies(res.data.results)
        const moviesByGenre = {...{genreKey: genre.name}, ...res.data.results}
        localStorage.setItem('moviesByGenre', JSON.stringify(moviesByGenre))
      }).catch(error => {
        setError(error)
      })
    }
  }

  useEffect( () => {
    getMoviesByGenre()
  }, [])

  return (
    <Layout>
      <div className='xl:px-3'>
        <div className='bg-white'>
          <div className='relative'>
            <GatsbyImage image={banner} alt={genre.name} />
            
            <div className="absolute inset-0 bg-slate-500 opacity-60"></div>
            <div className="absolute inset-0 flex justify-center items-center text-center">
              <h3 className="2xl:text-[90px] font-bold banner-stroke tracking-widest">{ genre.name }</h3>
            </div>
          </div>

          <div className='xl:p-16'>
            <div id="genre" className="my-12">
              <h3 className="text-3xl font-bold">{ genre.name } films</h3>
              <div className="grid grid-cols-4 gap-4">
              {movies.length ? ( 
                movies.map( movie => {
                  return <MovieCard movie={movie} key={movie.id}/>
                }) 
              ) : (
                <div>No Movies Found</div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

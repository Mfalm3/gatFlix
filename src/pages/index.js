import * as React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link, graphql, navigate } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { isEmpty } from "lodash"
import Layout from "../components/layout"
import CarouselSlider from "../components/slider"
import MovieCard from "../components/movieCard"

const IndexPage = ({ data }) => {

  const carouselOptions = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3
  }

  const [popular, setPopular] = useState([])
  const [trending, setTrending] = useState([])
  const [genres, setGenres] = useState([])
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  function getPopular() {
    axios.get(`${process.env.GATSBY_TMDB_BASE_API_URL}/movie/popular?api_key=${process.env.TMDB_API}`)
    .then((res) =>{
      setPopular(res.data.results)
      console.log('res', res.data)
    }).catch(error => {
      setError(error)
    })
  }

  function getTrending() {
    axios.get(`${process.env.GATSBY_TMDB_BASE_API_URL}/trending/movie/day?api_key=${process.env.TMDB_API}`)
    .then((res) =>{
      setTrending(res.data.results)
    }).catch(err => {
      setError(error)
    })
  }
  function getGenres() {
    const genres = JSON.parse(localStorage.getItem('genres'))
    console.log('genres', genres)
    if( !isEmpty(genres) ){
      setGenres(genres)
    }else{  
      axios.get(`${process.env.GATSBY_TMDB_BASE_API_URL}/genre/movie/list?api_key=${process.env.TMDB_API}`)
      .then((res) =>{
        console.log(res)
        setGenres(res.data.genres)
        localStorage.setItem('genres', JSON.stringify(res.data.genres))
      }).catch(err => {
        setError(error)
      })
    }
  }

  const handleSearchInput = (event) => {
    setQuery(event.target.value)
  }

  const searchQuery = (event) => {
    event.preventDefault()

    navigate('/search', { state: { query }})
  }

  useEffect( () => {
    getTrending()
    getPopular()
    getGenres()
  },[])

  // genre img nodes 
  const nodes = data.allFile.nodes

  return (
    <Layout>
      <main>
        <div id="hero" className="p-4 relative 2xl:h-[15vw] m-auto">
          <img src="" alt="" />
          <div className="absolute inset-0 opacity-75 bg-slate-500 flex flex-col p-16 gap-4">
            <div className="flex flex-col gap-4">
              <h3 className="text-4xl font-bold text-white">Welcome.</h3>
              <h5 className="text-3xl font-semibold text-white">Lots of fun films to binge. Look around</h5>
            </div>
            <div className="relative">
              <form onSubmit={searchQuery}>
                <input type="text" onChange={handleSearchInput} value={query} name="search" id="search" className="absolute rounded-3xl xl:w-full border p-3" placeholder="Search Movie"/>
                <input type="submit" value="Search"  className="absolute right-0 rounded-3xl xl:w-[7vw] p-[0.80rem] bg-green-600 hover:cursor-pointer hover:text-white"/>
              </form>
            </div>
          </div>
        </div>

        <div id="trending" className="my-12">
          <h3 className="text-3xl font-bold">Trending films</h3>
          {trending.length ? (
            <CarouselSlider {...{carouselOptions}}>
            { trending.map( movie => {
              return <MovieCard movie={movie} key={movie.id}/>
              }) 
            }
          </CarouselSlider>
          ) : (
            <div>No Movies Found</div>
          )}
        </div>

        <div id="latest" className="my-12">
          <h3 className="text-3xl font-bold">Popular films</h3>
          {popular.length ? (
            <CarouselSlider {...{carouselOptions}}>
            { popular.map( movie => {
              return <MovieCard movie={movie} key={movie.id}/>
              }) 
            }
          </CarouselSlider>
          ) : (
            <div>No Movies Found</div>
          )}
        </div>

        <div id="genres" className="my-12">
          <h3 className="text-3xl font-bold">Genres</h3>
          { genres.length ? (
            <CarouselSlider {...{carouselOptions}}>
            { genres.map( (genre) => {
              const slug = genre.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')
              const image = nodes.find(img => img.childImageSharp.fluid.originalName.slice(0, -4) === slug)
              return (
                <div className='p-3' key={genre.id}>
                  <div className='shadow-lg hover:shadow-2xl rounded-xl bg-white cursor-pointer'>
                    <Link to={'/genre/'+ slug}>
                      <div className="p-4">
                        <GatsbyImage  
                          image={image.childImageSharp.gatsbyImageData} 
                          alt={genre.name}
                        />
                        <h3 className="text-base font-semibold min-h-[48px]">{ genre.name }</h3>
                      </div>
                    </Link>
                  </div>
                </div>
              )
              }) 
            }
          </CarouselSlider>
          ) : (
            <div>No Movies Found</div>
          )}
          
        </div>
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>

export const Imgs = graphql `
query ImgQuery {
  allFile {
    nodes {
      childImageSharp {
        gatsbyImageData(
          placeholder: BLURRED
          formats: [AUTO]
          layout: CONSTRAINED
          height: 600
          width: 600
        )
        fluid {
          originalName
        }
      }
    }
  }
}
`

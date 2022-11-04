import * as React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import Layout from "../components/layout"
import CarouselSlider from "../components/slider"
import MovieCard from "../components/movieCard"
import GenreCard from "../components/genreCard"

const IndexPage = () => {

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

  function getPopular() {
    axios.get(`${process.env.GATSBY_TMDB_BASE_API_URL}/movie/popular?api_key=${process.env.TMDB_API}`)
    .then((res) =>{
      setPopular(res.data.results)
      console.log('res', res.data)
    }).catch(err => {
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
    axios.get(`${process.env.GATSBY_TMDB_BASE_API_URL}/genre/movie/list?api_key=${process.env.TMDB_API}`)
    .then((res) =>{
      console.log(res)
      setGenres(res.data.genres)
    }).catch(err => {
      setError(error)
    })
  }

  useEffect( () => {
    getTrending()
    getPopular()
    getGenres()
  },[])

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
              <input type="text" name="search" id="search" className="absolute rounded-3xl xl:w-full border p-3" placeholder="Search Movie"/>
              <input type="submit" value="Search"  className="absolute right-0 rounded-3xl xl:w-[7vw] p-[0.80rem] bg-green-600 hover:cursor-pointer hover:text-white"/>
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
            { genres.map( genre => {
              return <GenreCard genre={genre} key={genre.id}/>
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

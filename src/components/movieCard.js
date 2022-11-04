import React from 'react'
import { Link } from 'gatsby'

export default function MovieCard({movie}) {

  const slug = movie.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

  console.log('movicard props',movie)
  return (
    <div className='p-3'>
      <div className='shadow-lg hover:shadow-2xl rounded-xl bg-white cursor-pointer'>
        <Link to={slug}>
          <div className='h-[300px] rounded-t-xl' style={ {backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`, backgroundPosition: `center top`}}>
            {/* <img className='w-full h-full' src={ `https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={ movie.title } /> */}
          </div>
          <div className="p-4">
            <h3 className="text-base font-semibold min-h-[48px]">{ movie.title }</h3>
            <p>{ movie.overview.substr(0, 50) }...</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

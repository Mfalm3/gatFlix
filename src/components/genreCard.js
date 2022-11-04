import React from 'react'
import { Link } from 'gatsby'

export default function GenreCard({genre}) {

  const slug = genre.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

  return (
    <div className='p-3'>
      <div className='shadow-lg hover:shadow-2xl rounded-xl bg-white cursor-pointer'>
        <Link to={slug}>
          <div className="p-4">
            <h3 className="text-base font-semibold min-h-[48px]">{ genre.name }</h3>
          </div>
        </Link>
      </div>
    </div>
  )
}

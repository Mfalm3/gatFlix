import React from 'react'
import { Link } from 'gatsby'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <nav className="bg-slate-700 p-6">
          <div className="flex justify-between px-12">
            <div className="text-white text-3xl">
              <Link to='/'>gatFlix</Link>
            </div>
            <div>
              <ul className="flex gap-8 text-white text-xl">
                <li>Movies</li>
                <li>TV Shows</li>
                <li>Favourites</li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="content xl:min-h-[80.5vh] 2xl:min-h-[85vh] m-auto max-w-screen-2xl">
        { children }
      </div>

      <footer className="bg-slate-700 text-white flex flex-col md:flex-row p-4 justify-center 2xl:h-[8.1vh]">
        <div className='flex justify-center items-center'>
          <div>gatFlix. Made with ❤️ by Mfalm3</div>
        </div>
      </footer>
    </div>
  )
}

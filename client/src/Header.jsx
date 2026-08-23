import { useContext } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import guestalleyLogo from "./assets/guestalley-logo.svg";

export default function Header(){
    const {user}=useContext(UserContext);
    const navigate=useNavigate();
    const [searchParams]=useSearchParams();
    const searchQuery=searchParams.get('search') || '';
    const {pathname}=useLocation();
    const hideSearch=['/login','/register'].includes(pathname);

    function onSearch(e){
        e.preventDefault();
        const query=e.target.search.value.trim();
        if(query){
            navigate('/?search=' + encodeURIComponent(query));
        } else {
            navigate('/');
        }
    }
     return(
         <header className='flex flex-col md:flex-row justify-between items-center gap-4' >
         <Link to={'/'} className="flex items-center gap-2">
         <img src={guestalleyLogo} alt="GuestAlley" className="h-10 md:h-14 w-auto" />
         </Link>
         <form onSubmit={onSearch} className={`flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow bg-white gap-3 w-full md:w-auto ${hideSearch?'hidden':''}`}>
            <input type="text" placeholder="Search destinations, cities..." className="outline-none mt-1 mb-1 flex-1 rounded-2xl border border-gray-300 py-2 text-sm md:text-base" style={{ paddingLeft: '10.75rem', paddingRight: '8.75rem' }} name="search" defaultValue={searchQuery}/>
           <button type="submit" className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white p-2.5 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
             </svg>
            </button>
          </form>
          <Link to={user?'/account':'/Login'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
          <div className='bg-gray-500 text-white rounded-full  border border-gray-500'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
           <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
        </div>
            {!!user && (
              <div className='hidden md:block'>
                {user.name}
              </div>
            )}
          </Link>
        </header>
      )
  }
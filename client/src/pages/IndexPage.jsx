
import { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Image from "../Image.jsx";

export default function IndexPage(){
    const [places,setPlaces]=useState([]);
    const [searchParams]=useSearchParams();
    const searchQuery=searchParams.get('search')?.toLowerCase() || '';

    useEffect(()=>{
        axios.get('/places').then(response=>{
            setPlaces(response.data);
        })
    },[]);

    const filteredPlaces=places.filter(place=>{
        if(!searchQuery) return true;
        return (
            place.title?.toLowerCase().includes(searchQuery) ||
            place.address?.toLowerCase().includes(searchQuery) ||
            place.description?.toLowerCase().includes(searchQuery)
        );
    });

    return(
        <div>
         {searchQuery && (
            <div className="mt-4 mb-2">
                <h2 className="text-xl font-semibold">Search results for: <span className="text-primary">"{searchQuery}"</span></h2>
                <p className="text-sm text-gray-500">{filteredPlaces.length} place{filteredPlaces.length !== 1 ? 's' : ''} found</p>
            </div>
        )}
        <div className="mt-8  grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPlaces.length>0 && filteredPlaces.map(place=>(
            <Link to={'/place/'+place._id}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                    <Image className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} alt=""/>
                )}
                </div>
               <h2 className="font-bold ">{place.address}</h2>
               <h3 className="text-sm text-gray-500"> {place.title} </h3>
               <div className="mt-1">
               <span className="font-bold">₹{place.price}</span> per night
                </div>
            </Link>
          
        ))}
        {filteredPlaces.length===0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
                <p className="text-lg">No places found matching your search.</p>
            </div>
        )}
        
       </div>
       </div>
    )
}
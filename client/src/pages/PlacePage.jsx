import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Booking from "../Booking";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage(){
    const {id}=useParams();
    const [place,setPlace]=useState(null);
  
    useEffect(()=>{
      if(!id){
        return;
      }
      axios.get(`/places/${id}`).then(response =>{
        setPlace(response.data);
      });
    },[id])
    if(!place) return '';
    
      return(
           <div className="mt-4 -mx-4 md:-mx-8 md:px-8 bg-gray-100 pt-8">
           <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place}/>
         
          <div className="mt-8 mb-8  grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
             <div>
              <div className="my-4">
               <h2 className="font-semibold text-2xl">Description</h2>
               {place.description}
              </div>
               Check-in: {place.checkIn}<br/>
               Check-Out: {place.checkOut}<br/>
               Max number of guest: {place.maxGuests}
              
             </div>
             <div>
              <Booking place={place}/>
             </div>
          </div>
           <div className="bg-white -mx-4 md:-mx-8 md:px-8 py-8 border-t">
          <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
          </div>
          <div className="mb-4 mt-1 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
          </div>
          
        </div>
    )
}
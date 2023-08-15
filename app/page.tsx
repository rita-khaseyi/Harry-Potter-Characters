

'use client'
import React, { useState, useEffect } from "react";
import { getMovies } from "./utilities/utils";
import Navbar from "./components/Navbar/navbar";
import Hero from "./components/Hero/Hero";
import Footer from "./components/footer/footer";
import Link from "next/link";


interface Character {
 id: string;
 image: string;
 name: string;
 dateOfBirth: string;
}

export default function HomePage() {
 const [characters, setCharacters] = useState<Character[]>([]);
 const [searchTerm, setSearchTerm] = useState("");
 const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

 useEffect(() => {
   const fetchData = async () => {
     try {
       const charactersData = await getMovies(); 
       setCharacters(charactersData.slice(0, 20)); 
       setFilteredCharacters(charactersData.slice(0, 20)); 
     } catch (error) {
       console.error("Error fetching characters:", error);
     }
   };

   fetchData();
 }, []);

 useEffect(() => {
   const filtered = characters.filter((character) =>
     character.name.toLowerCase().includes(searchTerm.toLowerCase())
   );
   setFilteredCharacters(filtered);
 }, [searchTerm, characters]);



 return (
   <div >
     <Navbar  setSearchTerm={setSearchTerm} />
     
   
     <main> 
      <h1> CHARACTERS</h1>
      
    
       <div className="flex flex-wrap justify-center gap-4"> 
         {filteredCharacters.map((item) => (
          
           <div key={item.id} className="bg-gray-200 rounded-xl p-6 m-4 w-80 h-140 transition duration-300 shadow-md hover:bg-gray-300 hover:shadow-lg cursor-pointer" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }} >
              <Link key={item.id} href={`/components/${item.id}`}>
             <img className="w-60 h-60 object-cover rounded-md mx-auto mb-4" src={item.image} alt={item.name} width="240" height="240" />
             <div className="pt-4 space-y-2 text-gray-700">
             <figcaption>
                 <div className="text-black font-bold">
                   Name: {item.name}
                 </div>
                 <div className="text-gray-600">
                   Date of Birth: {item.dateOfBirth}
                 </div>
               </figcaption>
             </div>
             </Link>
           </div>
         ))}
       </div>
       <Footer/>
     </main>
    
   </div>
 );
}

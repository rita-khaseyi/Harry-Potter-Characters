// @jsxRuntime classic
// @jsxFrag React.Fragment
// @ts-nocheck
"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type params = {
  params: {
    characterId: string;
  };
};

export default function CharacterDetail({ params: { characterId } }: params) {
  const [character, setCharacter] = useState([]);

  async function getCharacterDetails() {
    try {
      const res = await axios.get(
        `https://hp-api.onrender.com/api/character/${characterId}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching character details:", error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchCharacterDetail() {
      const data = await getCharacterDetails();
      if (data) {
        setCharacter(data);
      }
    }
    fetchCharacterDetail();
  }, []);

  if (!character.length) {
    return <div>Loading...</div>;
  }

  const char = character[0]; // Assuming you only get one character

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <Link
          href="/"
          className="text-white bg-slate-800 inline-block px-3 py-1 rounded-md mb-4"
        >
          Back
        </Link>
        <div className="mb-4">
          {char.image ? (
            <img
              src={char.image}
              alt={char.name}
              className="h-72 w-72 object-cover rounded-md mx-auto mb-4"
            />
          ) : (
            <div className="h-72 w-72 flex items-center justify-center bg-gray-200 text-black rounded-md mb-4">
              No Image Available
            </div>
          )}
        </div>
        <div>
          <div className="text-4xl font-semibold mb-2">{char.name}</div>
          <hr className="border-dotted border-gray-400 mb-2" />
          <div className="text-gray-700 mb-2">House: {char.house}</div>
          {char.wand && (
            <div className="text-gray-700 mb-2">
              Wand: {char.wand.wood}, {char.wand.core}
            </div>
          )}
          <div className="text-gray-700 mb-2">Actor: {char.actor}</div>
          <div className="text-gray-700 mb-2">
            Ancestry: {char.ancestry}
          </div>
          {char.wizard && (
            <div className="text-gray-700 mb-2">Wizard: {char.wizard}</div>
          )}
        </div>
      </div>
    </div>
  );
}

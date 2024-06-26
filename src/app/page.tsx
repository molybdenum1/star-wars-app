"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { IHero } from "./types";
import Button from "./components/button";
import Heading from "./components/heading/heading";
import List from "./components/list";
import Image from "next/image";
import gif from "../../public/1494.gif";

export default function Home() {
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHeroes = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://sw-api.starnavi.io/people?page=${page}`
      );
      setHeroes(response.data.results);
      console.log(response.data.results.length);

      setTotalPages(Math.ceil(response.data.count / 10));
      setLoading(false);
    };

    fetchHeroes();
  }, [page]);

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Heading text="Star Wars Heroes" />
      {loading ? (
        <div className="h-[335px] align-middle">
          <Image src={gif} alt="Loading..." />
        </div>
      ) : (
        <List heroes={heroes} />
      )}
      <div className="flex justify-between items-center mt-4 w-full max-w-md">
        <Button
          className={`px-4 py-2 cursor-pointer text-white bg-red-500 rounded ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
          }`}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          text="Previous"
        />
        <span className="text-lg">
          Page {page} of {totalPages}
        </span>
        <Button
          className={`px-4 py-2 cursor-pointer text-white bg-red-500 rounded ${
            page === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-red-600"
          }`}
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          text="Next"
        />
      </div>
    </div>
  );
}

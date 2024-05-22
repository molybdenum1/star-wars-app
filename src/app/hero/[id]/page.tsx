"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ReactFlow, {
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

import "reactflow/dist/style.css";
import Link from "next/link";
import { IFilm, IHero, IStarShip } from "@/app/types";
import Heading from "@/app/components/heading/heading";

const Hero = () => {
  const path = usePathname();

  const [,, id] = path.split("/");
  const [hero, setHero] = useState<IHero>();
  const [elements, setElements] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [error, setError] = useState<string>();

  const onNodesChange = useCallback(
    (changes: any) => setElements((nds) => applyNodeChanges(changes, nds)),
    [setElements]
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const fetchWithDelay = async (url: string, delay: number) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return axios.get<any>(url);
  };

  useEffect(() => {
    if (id) {
      const fetchHeroDetails = async () => {
        try {
          const response = await axios.get(
            `https://sw-api.starnavi.io/people/${id}`
          );
          const heroData = response.data;

          const filmPromises = heroData.films.map(
            (url: string, index: number) =>
              fetchWithDelay(
                `https://sw-api.starnavi.io/films/${url}`,
                index * 100
              ).then((res) => res.data)
          );
          const starshipPromises = heroData.starships.map(
            (url: string, index: number) =>
              fetchWithDelay(
                `https://sw-api.starnavi.io/starships/${url}`,
                index * 100
              ).then((res) => res.data)
          );

          const filmResults = await Promise.allSettled(filmPromises);
          const starshipResults = await Promise.allSettled(starshipPromises);

          const films = filmResults
            .filter(
              (result): result is PromiseFulfilledResult<IFilm> =>
                result.status === "fulfilled"
            )
            .map((result) => result.value);

          const starships = starshipResults
            .filter(
              (result): result is PromiseFulfilledResult<IStarShip> =>
                result.status === "fulfilled"
            )
            .map((result) => result.value);

          const heroNode = {
            id: heroData.id.toString(),
            type: "input",
            data: { label: heroData.name },
            position: { x: 300, y: 50 },
          };

          const filmNodes = films.map((film, index) => {
            return {
              id: film.id.toString(),
              type: "default",
              data: { label: film.title },
              position: { x: 50 + index * 200, y: 300 },
            };
          });

          const starshipNodes = starships.map((starship, index) => {
            return {
              id: starship.id.toString(),
              type: "default",
              data: { label: starship.name },
              position: { x: 0 + index * 200, y: 500 },
            };
          });

          let starshipEdges: any[] = []; //starships
          let filmEdges: any[] = [];

          for (let i = 0; i < films.length; i++) {
            const film = films[i];
            for (let j = 0; j < starships.length; j++) {
              const starship = starships[j];
              if (film.starships.includes(starship.id)) {
                starshipEdges = [
                  ...starshipEdges,
                  {
                    id: `${film.id}-${starship.id}`,
                    source: film.id.toString(),
                    target: starship.id.toString(),
                    type: "bezier",
                    style: { stroke: `red` },
                  },
                ];
              }
            }
            filmEdges = [
              ...filmEdges,
              {
                id: `${heroData.id}-${film.id}`,
                source: `${heroData.id}`,
                target: `${film.id}`,
                type: "bezier",
                style: { stroke: `black` },
              },
            ];
          }
          setElements([heroNode, ...filmNodes, ...starshipNodes]);
          setEdges([...filmEdges, ...starshipEdges]);
          setHero(heroData);
        } catch (error) {
          console.error("Failed to fetch hero details", error);
          setError('Error In fetching')
        }
      };

      fetchHeroDetails();
    }
  }, [id]);

  if (!hero && error) {
    return <div className="text-5xl color-red-500">Ops... Something went wront!</div>;
  }
  if (!hero) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Link href={"/"}>{"<="} HOME </Link>
      <Heading text={hero?.name} />
      <div className="h-[700px]">
        <ReactFlow
          nodes={elements}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Hero;

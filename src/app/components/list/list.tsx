import { IHero } from "@/app/types";
import React from "react";
import ListItem from "../list-item";

type ListProps = {
  heroes: IHero[];
};

export default function List(props: ListProps) {
  const { heroes } = props;
  return (
    <ul className="list-none p-0 w-full max-w-md h-[315px] overflow-y-auto bg-white shadow-md rounded-lg">
      {heroes.map((hero: IHero) => (
        <ListItem hero={hero} />
      ))}
    </ul>
  );
}

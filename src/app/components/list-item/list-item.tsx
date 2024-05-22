import { IHero } from "@/app/types";
import Link from "next/link";
import React from "react";

type ListItemProps = {
  hero: IHero;
};

export default function ListItem(props: ListItemProps) {
  const { hero } = props;
  return (
    <li key={hero.url} className="mb-2">
      <Link
        className="text-red-500 hover:underline"
        href={`/hero/${hero.url.split("/").slice(-2, -1)[0]}`}
      >
        {hero.name}
      </Link>
    </li>
  );
}

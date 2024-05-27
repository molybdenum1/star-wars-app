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
        className="mb-2 p-2 border-b last:border-none"
        href={`/hero/${hero.url.split("/").slice(-2, -1)[0]}`}
      >
        {hero.name}
      </Link>
    </li>
  );
}

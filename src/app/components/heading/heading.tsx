import React from "react";

type HeadingProps = {
  text: string;
};

export default function Heading(props: HeadingProps) {
  const { text } = props;
  return <h1 className="text-2xl mb-4">{text}</h1>;
}

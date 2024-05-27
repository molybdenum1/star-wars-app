import React from "react";

type HeadingProps = {
  text: string;
};

export default function Heading(props: HeadingProps) {
  const { text } = props;
  return <h1 className="text-3xl font-bold mb-8 text-center">{text}</h1>;
}

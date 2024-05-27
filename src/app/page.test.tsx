// Home.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Home from "./page";
import { IHero } from "./types";

// Mock the fetchHeroes function
jest.mock("./Home", () => ({
  ...jest.requireActual("./Home"),
  fetchHeroes: jest.fn(),
}));

const { fetchHeroes } = require("./Home");

const mockHeroes: IHero[] = [
  { name: "Luke Skywalker", url: "https://sw-api.starnavi.io/people/1/" },
  { name: "Darth Vader", url: "https://sw-api.starnavi.io/people/2/" },
];

jest.mock("./components/button", () => (props: any) => (
  <button onClick={props.onClick} disabled={props.disabled}>
    {props.text}
  </button>
));

jest.mock("./components/heading/heading", () => (props: any) => (
  <h1>{props.text}</h1>
));

jest.mock("./components/list", () => (props: any) => (
  <ul>
    {props.heroes.map((hero: any) => (
      <li key={hero.url}>{hero.name}</li>
    ))}
  </ul>
));

describe("Home Component", () => {
  beforeEach(() => {
    fetchHeroes.mockResolvedValue({
      results: mockHeroes,
      count: 20,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    render(<Home />);
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument());
  });

  test("renders heading and list of heroes", async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText("Star Wars Heroes")).toBeInTheDocument();
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
      expect(screen.getByText("Darth Vader")).toBeInTheDocument();
    });
  });

  test("handles pagination", async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });

    fetchHeroes.mockResolvedValueOnce({
      results: [],
      count: 20,
    });

    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    });
  });

  test("previous button is disabled on the first page", async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });

    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();
  });

  test("next button is disabled on the last page", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });

    fetchHeroes.mockResolvedValueOnce({
      results: [],
      count: 20,
    });

    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    });

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });
});
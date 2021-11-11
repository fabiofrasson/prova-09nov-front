import { render, screen } from "@testing-library/react";
import ContactsList from "./ContactsList";

describe("ContactsList component", () => {
  test("Must start with empty search bar", async () => {
    render(<ContactsList />);

    const searchBarText = await screen.findByPlaceholderText("Search by name");

    expect(searchBarText).toBeInTheDocument();
  });
});

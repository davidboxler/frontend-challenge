import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import AppList from "./List";

test("agrega y filtra una frase", () => {
  render(
    <Provider store={store}>
      <AppList />
    </Provider>
  );

  const input = screen.getByPlaceholderText("Añade una frase...");
  const button = screen.getByText("Agregar +");

  fireEvent.change(input, { target: { value: "Hola mundo" } });
  fireEvent.click(button);

  expect(screen.getByText("Hola mundo")).toBeInTheDocument();

  const search = screen.getByPlaceholderText("Buscar frases...");
  fireEvent.change(search, { target: { value: "mundo" } });

  expect(screen.getByText("Hola mundo")).toBeInTheDocument();
});
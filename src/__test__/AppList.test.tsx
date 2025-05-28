import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import AppList from "../components/List";
import { store } from "../store/store";

describe("AppList", () => {
  beforeEach(() => {
    store.dispatch({ type: "phrases/setSearch", payload: "" });
    store.dispatch({ type: "phrases/deletePhrase", payload: Infinity });
  });

  test("agrega una frase correctamente", () => {
    render(
      <Provider store={store}>
        <AppList />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Añade una frase...");
    const button = screen.getByText("Agregar +");

    fireEvent.change(input, { target: { value: "Frase de prueba" } });
    fireEvent.click(button);

    expect(screen.getByText("Frase de prueba")).toBeInTheDocument();
  });

  test("no agrega una frase vacía (caso límite)", () => {
    render(
      <Provider store={store}>
        <AppList />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Añade una frase...");
    const button = screen.getByText("Agregar +");

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(button);

    expect(screen.queryByText("   ")).not.toBeInTheDocument();
  });

  test("filtra frases por texto", () => {
    render(
      <Provider store={store}>
        <AppList />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Añade una frase...");
    const button = screen.getByText("Agregar +");

    fireEvent.change(input, { target: { value: "Buscar esto" } });
    fireEvent.click(button);

    const search = screen.getByPlaceholderText("Buscar frases...");
    fireEvent.change(search, { target: { value: "Buscar" } });

    expect(screen.getByText("Buscar esto")).toBeInTheDocument();
    fireEvent.change(search, { target: { value: "nada" } });
    expect(screen.queryByText("Buscar esto")).not.toBeInTheDocument();
  });

  test("elimina una frase", () => {
    render(
      <Provider store={store}>
        <AppList />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Añade una frase...");
    const button = screen.getByText("Agregar +");

    fireEvent.change(input, { target: { value: "Para eliminar" } });
    fireEvent.click(button);

    const frase = screen.getByText("Para eliminar");
    expect(frase).toBeInTheDocument();

    const phraseBlock = frase.closest(".my-3");
    const deleteButton = phraseBlock?.querySelector(
      '[aria-label="Eliminar"]'
    ) as HTMLElement;

    expect(deleteButton).toBeDefined();
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Para eliminar")).not.toBeInTheDocument();
  });
});

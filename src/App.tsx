import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage, StarWordPage } from "./pages";
import { Layout } from "./components";

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="starWords" element={<StarWordPage />} />
      </Route>
    </Routes>
  );
};

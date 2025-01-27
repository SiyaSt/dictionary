import { Header } from "components";
import { Outlet } from "react-router-dom";
import { FC } from "react";

export const Layout: FC = () => (
  <>
    <Header />
    <Outlet />
  </>
);

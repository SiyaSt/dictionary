import { FC, ReactNode } from "react";
import "./Aside.scss";
import { Filter } from "../Filter/Filter";

interface AsideProps {
  input: ReactNode;
  filter: boolean;
}

export const Aside: FC<AsideProps> = ({input, filter}) => {
  return (<div className="aside">
    {input}
    {filter? <Filter/>: null}
  </div>);
};

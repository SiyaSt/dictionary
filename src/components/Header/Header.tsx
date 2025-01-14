import { FC } from "react";
import { CustomLink } from "../../components";
import "./Header.scss"

export const Header: FC = () => {

  return (
    <div className="header">
      <CustomLink to="/" className="link">
        Word Keeper
      </CustomLink>
      <CustomLink to="/starWords" className="link">
        Starred Words
      </CustomLink>
    </div>
  );
};

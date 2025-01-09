import { Link } from "react-router-dom";
import { FC } from "react";
import "./Header.scss"
import { CustomLink } from "../CustomLink/CustomLink";

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

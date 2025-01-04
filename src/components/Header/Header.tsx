import { Link } from "react-router-dom";
import { FC } from "react";
import "./Header.scss"

export const Header: FC = () => {
  return (
    <div className="header">
      <Link to="/" className="link">
        Word Keeper
      </Link>
      <Link to="/starWords" className="link">
        Starred Words
      </Link>
    </div>
  );
};

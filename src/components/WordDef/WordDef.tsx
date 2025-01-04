import { FC } from "react";

interface WordDefProps {
  isExpanded: boolean;
  definition: string;
}

export const WordDef: FC<WordDefProps> = ({isExpanded, definition}) => {
  return (
    <>
      {isExpanded ? (
        <span className="def-details">{definition}</span>
      ) : (
        <span className="def">{definition}</span>
      )}
    </>
  );
};

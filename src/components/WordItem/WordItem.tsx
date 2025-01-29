import { FC } from "react";
import { Word } from "shared/types/types";

interface WordItemProps {
  result: Word;
}

export const WordItem: FC<WordItemProps> = ({ result }) => {
  return (
    <div className="word">
      <strong>{result.word}</strong>
      <i>{result.type}</i>
      <span className="def">{result.definition}</span>
    </div>
  );
};

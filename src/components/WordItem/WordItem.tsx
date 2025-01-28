import { FC } from "react";
import { Word } from "shared/types/types";

interface WordItemProps {
  result: Word;
  toggleExpanded: (value: string) => void;
}

export const WordItem: FC<WordItemProps> = ({ result, toggleExpanded }) => {
  return (
    <div className="word" onClick={() => toggleExpanded(result.word)}>
      <strong >{result.word}</strong>
      <i>{result.type}</i>
      <span className="def">{result.definition}</span>
    </div>
  );
};

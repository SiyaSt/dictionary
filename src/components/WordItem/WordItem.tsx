import { FC } from "react";
import { Word } from "../../types/types";

interface WordItemProps {
  result: Word;
  toggleExpanded: (value: string) => void;
}

export const WordItem: FC<WordItemProps> = ({ result, toggleExpanded }) => {
  return (
    <div className="word">
      <strong onClick={() => toggleExpanded(result.word)}>{result.word}</strong>
      <i>{result.type}</i>
      <span className="def">{result.definition}</span>
    </div>
  );
};

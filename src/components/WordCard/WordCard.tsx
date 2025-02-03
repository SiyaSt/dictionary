import { Checkbox } from "components/CheckBox/CheckBox";
import { WordDef } from "components/WordDef/WordDef";
import { WordItem } from "components/WordItem/WordItem";
import React, { FC, useState } from "react";
import { Word } from "shared/types/types";
import { ReactComponent as Star } from "imges/Star.svg";

interface WordCardProps {
  word: Word;
  index: number;
  isStarWordPage: boolean;
  handleToggleStarWords: (word: Word) => void;
  handleDrop: (e: React.DragEvent<HTMLLIElement>, index: number) => void;
}

export const WordCard: FC<WordCardProps> = ({ word, index, isStarWordPage, handleToggleStarWords, handleDrop}) => {
  const [isExpanded, setIsExpanded] = useState(false);


  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, word: Word) => {
    if (!isStarWordPage) return;
    e.dataTransfer.setData("text/plain", word.word);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    if (!isStarWordPage) return;
    e.preventDefault();
  };




  return (
    <li
      key={word.word}
      draggable={isStarWordPage}
      onDragStart={(e) => handleDragStart(e, word)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
      onClick={() => setIsExpanded((prev) => (!prev))}
    >
      <div className="word-item">
        {isStarWordPage && <span className="handle">☰</span>}
        <WordItem result={word} />
        <Checkbox
          checked={word.checked}
          onChange={() => handleToggleStarWords(word)}
          className="checkbox"
          icon={<Star className="icon" />}
        />
      </div>

      {isExpanded && (
        <WordDef
          definition={word.definition}
          pronunciation={word.pronunciation}
        />
      )}
    </li>
  );
};

import React, { FC, useState } from "react";
import { Word } from "../../types/types";
import { WordItem } from "../../components";
import { Checkbox } from "../../components";
import { ReactComponent as Star } from "../../imges/Star.svg";
import { WordDef } from "../../components";
import "./StarList.scss";

interface StarListProps {
  words: Word[];
  setWords: (value: Word[]) => void;
}

export const StarList: FC<StarListProps> = ({ words, setWords }) => {
  const [expandedWords, setExpandedWords] = useState<Record<string, boolean>>(
    {},
  );
  const toggleExpanded = (word: string) => {
    setExpandedWords((prev) => ({ ...prev, [word]: !prev[word] }));
  };

  const toggleStarWords = (word: Word) => {
    const updatedWord = { ...word, checked: !word.checked };

    const updatedStarWords = words.some((sw) => sw.word === word.word)
      ? words.filter((sw) => sw.word !== word.word)
      : [...words, updatedWord];
    setWords(updatedStarWords);
  };

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, word: Word) => {
    e.dataTransfer.setData("text/plain", word.word);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    const draggedWord = e.dataTransfer.getData("text/plain");
    const draggedWordIndex = words.findIndex(
      (word) => word.word === draggedWord,
    );
    const updatedWords = [...words];
    const [removed] = updatedWords.splice(draggedWordIndex, 1);
    updatedWords.splice(index, 0, removed);
    setWords(updatedWords);
  };

  const renderWord = (result: Word, index: number) => {
    const isExpanded = expandedWords[result.word] || false;
    return (
      <li
        key={result.word}
        draggable
        onDragStart={(e) => handleDragStart(e, result)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, index)}
      >
        <div className="word-item">
          <span className="handle">☰</span>
          <WordItem result={result} toggleExpanded={toggleExpanded} />
          <Checkbox
            checked={result.checked}
            onChange={() => toggleStarWords(result)}
            className="checkbox"
            icon={<Star className="icon" />}
          />
        </div>

        <WordDef
          definition={result.definition}
          pronunciation={result.pronunciation}
          isExpanded={isExpanded}
        />
      </li>
    );
  };

  return (
    <ul className="star-list">
      {words.map((word, index) => renderWord(word, index))}
    </ul>
  );
};

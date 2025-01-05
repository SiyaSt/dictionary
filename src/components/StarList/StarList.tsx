import React, { FC, useEffect } from "react";
import { Word } from "../../types/types";
import { WordItem } from "../WordItem/WordItem";
import { Checkbox } from "../CheckBox/CheckBox";
import { ReactComponent as Star } from "../../imges/Star.svg";
import "./StarList.scss"

interface StarListProps {
  words: Word[];
  setWords: (value: Word[]) => void
}

export const StarList:FC<StarListProps> = ({words, setWords}) => {

  useEffect(() => {
    localStorage.setItem("starWords", JSON.stringify(words));
  }, [words]);

  const toggleStarWords = (word: Word) => {
    const updatedWord = { ...word, checked: !word.checked };
    const updatedWords = words.map(w => w.word === word.word ? updatedWord : w);
    setWords(updatedWords);
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
    const draggedWordIndex = words.findIndex(word => word.word === draggedWord);
    const updatedWords = [...words];
    const [removed] = updatedWords.splice(draggedWordIndex, 1);
    updatedWords.splice(index, 0, removed);
    setWords(updatedWords);
  };

  const renderWord = (result: Word, index: number) => {
    return (
      <li
        key={result.word}
        draggable
        onDragStart={(e) => handleDragStart(e, result)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, index)}
      >
        <span className="handle">☰</span>
        <WordItem result={result} />
        <Checkbox
          checked={result.checked}
          onChange={() => toggleStarWords(result)}
          className="checkbox"
          icon={<Star className="star-icon" />}
        />
      </li>
    );
  };

  return (
    <ul className="word-list">
      {words.map((word, index) => renderWord(word, index))}
    </ul>
  );
};

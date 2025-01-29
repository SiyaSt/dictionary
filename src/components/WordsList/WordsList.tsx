import { WordCard } from "components/WordCard/WordCard";
import { setStarWords, toggleStarWord } from "features/starWordsSlice";
import { useDispatch } from "react-redux";
import { Word } from "shared/types/types";
import React, { FC } from "react";
import "./WordsList.scss";

interface WordsListProps {
  words: Word[];
  isStarWordPage: boolean;
}

export const WordsList: FC<WordsListProps> = ({ words, isStarWordPage }) => {
  const dispatch = useDispatch();

  const handleToggleStarWords = (word: Word) => {
    dispatch(toggleStarWord(word));
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    if (!isStarWordPage) return;
    e.preventDefault();
    const draggedWord = e.dataTransfer.getData("text/plain");
    const draggedWordIndex = words.findIndex(
      (word) => word.word === draggedWord,
    );
    const updatedWords = [...words];
    const [removed] = updatedWords.splice(draggedWordIndex, 1);
    updatedWords.splice(index, 0, removed);
    dispatch(setStarWords(updatedWords));
  };
  return (
    <ul className="word-list">
      {words.map((word, index) => (
        <WordCard
          key={index}
          word={word}
          index={index}
          isStarWordPage={isStarWordPage}
          handleDrop={handleDrop}
          handleToggleStarWords={handleToggleStarWords}
        />
      ))}
    </ul>
  );
};

import { Word } from "types/types";
import React, { FC, useState } from "react";
import { Checkbox, WordDef, WordItem } from "components";
import { ReactComponent as Star } from "imges/Star.svg";
import { useDispatch } from "react-redux";
import { useAppSelector } from "hooks/reduxHooks";
import { setStarWords, toggleStarWord } from "features/starWordsSlice";
import { selectStarWords } from "features/starWordsSelector";
import "./WordsList.scss";

interface WordsListProps {
  words: Word[];
  isStarWordPage: boolean;
}

export const WordsList: FC<WordsListProps> = ({
  words,
  isStarWordPage,
}) => {
  const dispatch = useDispatch();
  const starWords = useAppSelector(selectStarWords);
  const [expandedWords, setExpandedWords] = useState<Record<string, boolean>>(
    {},
  );

  const toggleStarWords = (word: Word) => {
    dispatch(toggleStarWord(word));
  };

  const toggleExpanded = (word: string) => {
    setExpandedWords((prev) => ({ ...prev, [word]: !prev[word] }));
  };

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, word: Word) => {
    if (!isStarWordPage) return;
    e.dataTransfer.setData("text/plain", word.word);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    if (!isStarWordPage) return;
    e.preventDefault();
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

  const renderWord = (word: Word, index: number) => {
    const isStarred = starWords.some((starWord) => starWord.word === word.word);
    const isExpanded = expandedWords[word.word] || false;
    return (
      <li
        key={word.word}
        draggable={isStarWordPage}
        onDragStart={(e) => handleDragStart(e, word)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, index)}
      >
        <div className="word-item">
          {isStarWordPage && <span className="handle">☰</span>}
          <WordItem result={word} toggleExpanded={toggleExpanded} />
          <Checkbox
            checked={isStarred}
            onChange={() => toggleStarWords(word)}
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

  return (
    <ul className="word-list">
      {words.map((word, index) => renderWord(word, index))}
    </ul>
  );
};

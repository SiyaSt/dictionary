import { Word } from "../../types/types";
import { FC, useEffect, useState } from "react";
import { Checkbox, WordItem } from "../../components";
import { ReactComponent as Star } from "../../imges/Star.svg";
import "./WordsList.scss";

interface WordsListProps {
  results: Word[];
}

export const WordsList: FC<WordsListProps> = ({ results }) => {
  const [starWords, setStarWords] = useState<Word[]>(
    JSON.parse(localStorage.getItem("starWords") || "[]"),
  );

  useEffect(() => {
    localStorage.setItem("starWords", JSON.stringify(starWords));
  }, [starWords]);

  const toggleStarWords = (word: Word) => {
    const updatedWord = { ...word, checked: !word.checked };

    const updatedStarWords = starWords.some((sw) => sw.word === word.word)
      ? starWords.filter((sw) => sw.word !== word.word)
      : [...starWords, updatedWord];
    setStarWords(updatedStarWords);
  };

  const renderWord = (result: Word) => {
    const isStarred = starWords.some(
      (starWord) => starWord.word === result.word,
    );
    return (
      <li key={result.word}>
        <WordItem result={result} />
        <Checkbox
          checked={isStarred}
          onChange={() => toggleStarWords({ ...result, checked: isStarred })}
          className="checkbox"
          icon={<Star className="icon" />}
        />
      </li>
    );
  };

  return <ul className="word-list">{results.map(renderWord)}</ul>;
};

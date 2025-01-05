import { Word } from "../../types/types";
import { FC, useEffect, useState } from "react";
import { Checkbox, WordItem } from "../../components";
import { ReactComponent as Star } from "./Star.svg";
import "./WordsList.scss";

interface WordsListProps {
  results: Word[];
}

export const WordsList: FC<WordsListProps> = ({ results }) => {
  const [starWords, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem("starWords") || "[]"),
  );

  useEffect(() => {
    localStorage.setItem("starWords", JSON.stringify(starWords));
    console.log(localStorage.getItem("starWords"));
  }, [starWords]);

  const toggleStarWords = (word: string) => {
    if (starWords.includes(word)) {
      setFavorites(starWords.filter((star) => star !== word));
    } else {
      setFavorites([...starWords, word]);
    }
  };

  const renderWord = (result: Word) => {
    return (
      <li key={result.word}>
        <WordItem result={result} />
        <Checkbox
          checked={false}
          onChange={() => toggleStarWords(result.word)}
          className="checkbox"
          icon={<Star className="star-icon" />}
        />
      </li>
    );
  };

  return <ul className="word-list">{results.map(renderWord)}</ul>;
};

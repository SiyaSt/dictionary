import { Word } from "../../types/types";
import { FC, useState } from "react";
import { WordDef } from "../../components";
import "./WordsList.scss";


interface WordsListProps {
  results: Word[];
}

export const WordsList: FC<WordsListProps> = ({ results }) => {
  const [expandedWords, setExpandedWords] = useState<Record<string, boolean>>(
    {},
  );

  const toggleExpanded = (word: string) => {
    setExpandedWords((prev) => ({ ...prev, [word]: !prev[word] }));
  };

  const renderWord = (result: Word) => {
    const isExpanded = expandedWords[result.word] || false;
    return (
      <li key={result.word} className={isExpanded ? "expanded" : ""}>
        <strong onClick={() => toggleExpanded(result.word)}>
          {result.word}
        </strong>
        <i>{result.type}</i>
        <WordDef isExpanded={isExpanded} definition={result.definition} />
      </li>
    );
  };

  return <ul className="word-list">{results.map(renderWord)}</ul>;
};

import { classNames } from "../../utils/ClassName";
import { WordDef } from "../../components";
import { FC, useState } from "react";
import { Word } from "../../types/types";

interface WordItemProps{
  result: Word;
}

export const WordItem: FC<WordItemProps> = ({result}) => {
  const [expandedWords, setExpandedWords] = useState<Record<string, boolean>>(
    {},
  );

  const toggleExpanded = (word: string) => {
    setExpandedWords((prev) => ({ ...prev, [word]: !prev[word] }));
  };

  const isExpanded = expandedWords[result.word] || false;

  return (
    <div className={classNames({ args: ["word", { isExpanded: isExpanded }] })}>
      <strong onClick={() => toggleExpanded(result.word)}>{result.word}</strong>
      <i>{result.type}</i>
      <WordDef isExpanded={isExpanded} definition={result.definition} />
    </div>
  );
};

import { Aside, InputStar, StarList } from "../../components";
import "./StarWordPage.scss";
import { useState } from "react";
import { Word } from "../../types/types";

export const StarWordPage = () => {
  const [words, setWords] = useState<Word[]>(() => {
    const savedWords = localStorage.getItem("starWords");
    return savedWords ? JSON.parse(savedWords) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredWords = words.filter((word) =>
    word.word.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="star-page">
      <Aside
        input={
          <InputStar value={searchTerm} onChange={setSearchTerm} delay={300} />
        }
        filter={false}
      />
      <StarList words={filteredWords} setWords={setWords} />
    </div>
  );
};

import { Aside, Input, InputStar, StarList } from "../../components";
import { useEffect, useState } from "react";
import { Word } from "../../types/types";
import { useSearchParams } from "react-router-dom";
import "./StarWordPage.scss";

export const StarWordPage = () => {
  const [words, setWords] = useState<Word[]>(() => {
    const savedWords = localStorage.getItem("starWords");
    return savedWords ? JSON.parse(savedWords) : [];
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("starWords", JSON.stringify(words));
  }, [words]);

  const handleFilterChange = (filterParam: string) => {
    setSearchParams({ filter: filterParam });
  };

  const filterWords = (
    words: Word[],
    filterParam: string,
    searchTerm: string,
  ): Word[] => {
    const filters = filterParam === "all" ? [] : filterParam.split(",");
    return words.filter((word) => {
      const wordTypeMatch = filters.length === 0 || filters.includes(word.type);
      const searchTermMatch =
        searchTerm.trim() === "" ||
        word.word.toLowerCase().includes(searchTerm.toLowerCase());
      return wordTypeMatch && searchTermMatch;
    });
  };

  const filteredWords = filterWords(
    words,
    searchParams.get("filter") || "all",
    searchTerm,
  );

  const delay = 300;
  return (
    <div className="star-page">
      <Aside
        input={
          <Input value={searchTerm} onChange={setSearchTerm} delay={delay} />
        }
        onFilterChange={handleFilterChange}
        filter={true}
      />
      <StarList words={filteredWords} setWords={setWords} />
    </div>
  );
};

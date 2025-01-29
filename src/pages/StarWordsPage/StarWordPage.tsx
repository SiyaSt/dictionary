import { Aside, WordsList } from "components";
import { useDebounce } from "hooks/useDebounce";
import { useEffect, useState } from "react";
import { delay } from "shared/consts";
import { Word } from "shared/types/types";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "hooks/reduxHooks";
import { selectStarWords } from "features/starWordsSelector";
import { setStarWords } from "features/starWordsSlice";
import "./StarWordPage.scss";

export const StarWordPage = () => {
  const dispatch = useDispatch();
  const starWords = useAppSelector(selectStarWords);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, delay);

  useEffect(() => {
    dispatch(setStarWords(starWords));
  }, [starWords, dispatch]);


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
    starWords,
    searchParams.get("filter") || "all",
    debouncedValue,
  );

  return (
    <div className="star-page">
      <Aside
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onFilterChange={handleFilterChange}
        filter={true}
      />
      <WordsList words={filteredWords} isStarWordPage={true} />
    </div>
  );
};

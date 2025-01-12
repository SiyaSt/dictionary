import { FC, ReactNode, useMemo } from "react";
import "./Aside.scss";
import { Filter } from "../Filter/Filter";
import { useSearchParams } from "react-router-dom";
import { Options } from "../../types/types";

interface AsideProps {
  input: ReactNode;
  filter: boolean;
  onFilterChange?: (newFilter: string) => void;
}

export const Aside: FC<AsideProps> = ({ input, onFilterChange, filter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilters = useMemo(() => {
    const filterParam = searchParams.get("filter");
    return filterParam ? filterParam.split(",") : [];
  }, [searchParams]);

  const optionsFilter: Options[] = [
    { value: "noun", label: "Noun" },
    { value: "verb", label: "Verb" },
    { value: "adjective", label: "Adjective" },
  ];

  const handleFilterChange = (newSelectedFilters: string[]) => {
    const filterParam = newSelectedFilters.join(",");
    setSearchParams({ filter: filterParam });
    if (onFilterChange) {
      onFilterChange(filterParam);
    }
  };

  return (
    <div className="aside">
      {input}
      {filter && (
        <Filter options={optionsFilter} onChange={handleFilterChange} selectedFilters={selectedFilters} />
      )}
    </div>
  );
};

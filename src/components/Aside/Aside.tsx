import { FC, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Options } from "shared/types/types";
import { Filter, Input } from "components";
import "./Aside.scss";

interface AsideProps {
  searchTerm: string;
  filter: boolean;
  setSearchTerm: (value: string) => void;
  onFilterChange?: (newFilter: string) => void;
}

export const Aside: FC<AsideProps> = ({onFilterChange, filter, searchTerm, setSearchTerm }) => {
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
      <Input value={searchTerm} setInputValue={setSearchTerm}/>
      {filter && (
        <Filter
          options={optionsFilter}
          onChange={handleFilterChange}
          selectedFilters={selectedFilters}
        />
      )}
    </div>
  );
};

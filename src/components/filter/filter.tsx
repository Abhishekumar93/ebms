import React, { useEffect, useState } from "react";
import { filterFields } from "@/types/dataType.type";

export interface IProps {
  setFilterClick: (value: filterFields) => void;
}

const FILTER_TYPE = [
  { title: "Active", id: "active" },
  { title: "Inactive", id: "inactive" },
  { title: "All", id: "all" },
];

const Filter: React.FC<IProps> = ({ setFilterClick }) => {
  const [filterBy, setFilterBy] = useState<filterFields>("all");

  useEffect(() => {
    setFilterClick(filterBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBy]);

  const updateFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selectedElement = e.target.id;
    if (selectedElement) {
      setFilterBy(
        selectedElement === "all"
          ? "all"
          : selectedElement === "active"
          ? "active"
          : "inactive"
      );
    }
  };

  const displayFilterList = () => {
    return FILTER_TYPE.map((item, index) => {
      return (
        <section
          key={item.id}
          className={`text-sm flex items-center ${
            index === FILTER_TYPE.length - 1 ? null : "mb-2"
          }`}
        >
          <input
            type="radio"
            name={item.id}
            id={item.id}
            checked={filterBy === item.id}
            className="h-3 cursor-pointer"
            onChange={updateFilterValue}
          />
          <label className="pl-2">{item.title}</label>
        </section>
      );
    });
  };

  return (
    <aside className="absolute right-4 top-12 rounded-md px-3 py-1.5 shadow-inner dark:shadow-slate-300 shadow-slate-600 border border-collapse min-w-[9rem]">
      <h3 className="text-lg pb-4">Filter By:</h3>
      {displayFilterList()}
    </aside>
  );
};

export default Filter;

import React from "react";
import "./FilterSidebar.css";

const FilterSidebar = ({ filters, onFilterChange }) => {
    return (
        <div className="filter-sidebar">
            <h2>Filter By</h2>
            {filters.map((filterGroup) => (
                <div key={filterGroup.title} className="filter-group">
                    <h3>{filterGroup.title}</h3>
                    {filterGroup.options.map((option) => (
                        <div key={option.value} className="filter-option">
                            <label>
                                <input
                                    type="checkbox"
                                    value={option.value}
                                    onChange={onFilterChange}
                                />
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default FilterSidebar;

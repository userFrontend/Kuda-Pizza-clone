// Filter.js
import React from 'react';
import './Filter.scss'

const Filter = ({ category, items, selectedFilters, toggleFilter }) => (
  <div className="filter-category">
    <h3>{category}</h3>
    <div className="filter-items">
      {items.map(item => {
        const isActive = selectedFilters.find(filter => filter.category === category && filter.item === item);
        return (
          <button
            key={item}
            className={`filter-item ${isActive ? 'active' : ''}`}
            onClick={() => toggleFilter(category, item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  </div>
);

export default Filter;

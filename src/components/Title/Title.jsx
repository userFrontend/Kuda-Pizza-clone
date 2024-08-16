import React, { useState } from 'react'
import './Title.scss'
import Layout from '../Layout/Layout'
import Filter from '../Filter/Filter';

const Title = ({text}) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [open, setOpen] = useState(false)
  const openToggle = () => setOpen(!open)

  const toggleFilter = (category, item) => {
    setSelectedFilters((prevSelected) => {
      const exists = prevSelected.find(filter => filter.category === category && filter.item === item);
      if (exists) {
        return prevSelected.filter(filter => !(filter.category === category && filter.item === item));
      } else {
        return [...prevSelected, { category, item }];
      }
    });
  };

  const resetFilters = () => {
    setSelectedFilters([]);
  };

  const applyFilters = () => {
    // Filtrlar qo'llash logikasini bu yerga qo'shing
    console.log("Selected Filters:", selectedFilters);
  };
  

  const filterData = {
    Общие: ['Хит', 'Новинка', 'С мясом', 'Вегетарианская', 'С курицей', 'Без лука', 'С грибами', 'С морепродуктами', 'Барбекю'],
    Сыр: ['Реджанито', 'Моцарелла', 'Чеддер', 'С голубой плесенью', 'Смесь итальянских сыров', 'Мягкий молодой сыр'],
    Мясо: ['Пепперони', 'Свинина', 'Ветчина', 'Бекон', 'Говядина', 'Чоризо', 'Колбаски', 'Куриная грудка'],
    Компонент: ['Креветка', 'Ананасы', 'Шампиньоны', 'Лук', 'Перец халапеньо', 'Орегано', 'Зеленый перец', 'Томаты', 'Чеснок', 'Красный перец', 'Оливки', 'Маслины', 'Клубника', 'Смесь итальянских трав']
  };
  return (
    <>
      <div className='title'>
        <h2>{text}</h2>
        <button onClick={openToggle}><i className="fa-solid fa-filter"></i> Фильтры</button>
      </div>
      {open && <Layout title={'Фильтры'} toggle={openToggle}>
      {Object.keys(filterData).map(category => (
        <Filter
          key={category}
          category={category}
          items={filterData[category]}
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
        />
      ))}
      <div className="buttons">
        <button className="reset-button" onClick={resetFilters}>Сбросить</button>
        <button className="apply-button" onClick={() => {applyFilters(); openToggle()}}>Применить</button>
      </div>
      </Layout>}
    </>
  )
}

export default Title
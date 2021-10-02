import { useEffect } from 'react';
import { useGlobalContext } from '../../store/context';
import { FaSearch } from 'react-icons/fa';

import classes from './Search.module.scss';

const Search = () => {
  const {
    setSearch,
    query,
    sorting,
    setCategory,
    setSorting,
    setQuery,
    category,
  } = useGlobalContext();

  useEffect(() => {
    const timeout = setTimeout(() => setSearch(query), 500);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className={classes['search-container']}>
      <div className={classes['btn-flex']}>
        <div className={classes.buttons}>
          <button
            className={`button ${category === 'sports' && 'active'}`}
            onClick={() => setCategory('sports')}
          >
            Sports
          </button>
          <button
            className={`button ${category === 'technology' && 'active'}`}
            onClick={() => setCategory('technology')}
          >
            Technology
          </button>
        </div>
        <div className={classes.buttons}>
          <button
            className={`button ${sorting === 'published_desc' && 'active'}`}
            onClick={() => setSorting('published_desc')}
          >
            Newest
          </button>
          <button
            className={`button ${sorting === 'published_asc' && 'active'}`}
            onClick={() => setSorting('published_asc')}
          >
            Oldest
          </button>
        </div>
      </div>
      <div className={classes['search-input']}>
        <FaSearch className={classes.icon} />
        <input
          placeholder={`search ${category}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type='text'
        />
      </div>
    </div>
  );
};

export default Search;

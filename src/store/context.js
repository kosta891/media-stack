import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const AppContext = createContext();

const AppProvider = (props) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // category and sorting query
  const [category, setCategory] = useState('sports');
  const [sorting, setSorting] = useState('published_desc');

  // for search query
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');

  // offset query
  const [offset, setOffset] = useState(0);

  // error
  const [error, setError] = useState('');

  const API_ENDPOINT = `http://api.mediastack.com/v1/news?access_key=${process.env.REACT_APP_API_KEY}&languages=en&categories=${category}&keywords=${search}&sort=${sorting}`;
  const API_ENDPOINT_PAGES = `${API_ENDPOINT}&offset=${offset}`;

  const fetchNews = async (url) => {
    setIsLoading(true);

    try {
      const response = await axios.get(url);

      const { data, pagination } = await response.data;

      if (data.length === 0) {
        setNews([]);
        setError('No data were found!');
      } else {
        const modifyData = data.map((article) => ({ ...article, id: uuid() }));
        setNews(modifyData);
        setOffset(pagination.limit);
        setError('');
      }
    } catch (error) {
      setIsLoading(false);
      setError('There is an error!');
    }
    setIsLoading(false);
  };

  const fetchMorePages = async () => {
    try {
      const response = await axios.get(API_ENDPOINT_PAGES);
      const { data, pagination } = await response.data;

      const modifyData = data.map((article) => ({ ...article, id: uuid() }));
      setNews((oldData) => {
        return [...oldData, ...modifyData];
      });

      setOffset((prevOffset) => prevOffset + pagination.limit);
    } catch (error) {}
  };

  useEffect(() => {
    fetchNews(API_ENDPOINT);
  }, [API_ENDPOINT]);

  return (
    <AppContext.Provider
      value={{
        news,
        isLoading,
        query,
        category,
        sorting,
        error,
        setCategory,
        setSorting,
        setSearch,
        setQuery,
        fetchMorePages,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };

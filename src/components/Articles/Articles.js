import Article from './Article';
import { useGlobalContext } from '../../store/context';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './Articles.module.scss';

const Articles = () => {
  const { news, isLoading, fetchMorePages, error } = useGlobalContext();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  console.log(news);
  if (error) {
    return (
      <div className='page-error'>
        <h2>{error}</h2>
      </div>
    );
  }

  if (!isLoading && news.length === 0) {
    return <div className='page-error'>No data!</div>;
  }

  return (
    <InfiniteScroll
      dataLength={news.length}
      next={fetchMorePages}
      hasMore={true}
      hasChildren={true}
      loader={<LoadingSpinner />}
      style={{ overflow: 'hidden' }}
      endMessage='No more data'
    >
      <section className={classes.articles}>
        {news.map((article) => {
          const { author, title, description, image, url, published_at, id } =
            article;

          const transformData = new Date(published_at).toLocaleDateString();

          return (
            <Article
              key={id}
              author={author}
              title={title}
              description={description}
              image={image}
              url={url}
              transformData={transformData}
            />
          );
        })}
      </section>
    </InfiniteScroll>
  );
};

export default Articles;

import classes from './Article.module.scss';

const urlNoPicture =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

const Article = ({ title, author, description, image, transformData, url }) => {
  return (
    <article className={classes.article}>
      <img src={image || urlNoPicture} alt={title} className={classes.image} />
      <div className={classes['article-info']}>
        <h3>{title}</h3>
        <p>{author}</p>
        <p>{description} </p>
        <p>{transformData}</p>
        <a
          className='button'
          href={url}
          target='_blank'
          rel='noopener noreferrer'
        >
          Read more
        </a>
      </div>
    </article>
  );
};

export default Article;

import Articles from './components/Articles/Articles';
import Search from './components/Search/Search';

function App() {
  return (
    <main className='main'>
      <div className='title'>
        <h1>Media stack news</h1>
        <div className='underline'></div>
      </div>
      <Search />
      <Articles />
    </main>
  );
}

export default App;

import "./App.css";
import Raw from "./Raw";
import request from "./requests";
import Banner from "./Bannar";
import Nav from "./Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <Raw
        title="NETFLIX ORIGINALS"
        fetchUrl={request.fetchNetflixOriginals}
        isLargeRow
      />
      <Raw title="Trending Now" fetchUrl={request.fetchTrending} />
      <Raw title="Top Rated" fetchUrl={request.fetchTopRated} />
      <Raw title="Action Movies" fetchUrl={request.fetchActionMovies} />
      <Raw title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
      <Raw title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
      <Raw title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
      <Raw title="Documentaries" fetchUrl={request.fetchDocumentaries} />
    </div>
  );
}

export default App;

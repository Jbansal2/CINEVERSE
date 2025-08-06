import Index from "./pages/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";
import NewPopular from "./pages/NewPopular";
import MyList from "./pages/MyList";
import MovieDetail from "./pages/MovieDetail";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import './index.css'



const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/tv-shows" element={<TVShows />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/new-popular" element={<NewPopular />} />
      <Route path="/my-list" element={<MyList />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App


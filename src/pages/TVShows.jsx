import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { getPopularTVShows, getTopRatedTVShows, getTVShowsByGenre, formatContent, getBackdropUrl, GENRE_MAP } from "../lib/tmdb";
import Header from "../components/ui/header";
import TVShowRow from "../components/ui/TVShowRow";
import HeroSection from "../components/ui/HeroSection";


export default function TVShows() {
  const [popularShows, setPopularShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [comedyShows, setComedyShows] = useState([]);
  const [heroContent, setHeroContent] = useState(null);
  const [loading, setLoading] = useState({
    popular: true,
    topRated: true,
    comedy: true,
    hero: true
  });

  const formatTMDBContent = (item) => {
    const mainGenre = item.genre_ids[0] ? GENRE_MAP[item.genre_ids[0]] || 'TV Show' : 'TV Show';
    
    return {
      ...formatContent(item),
      genre: mainGenre
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularData = await getPopularTVShows();
        const formattedPopular = popularData.results.slice(0, 10).map(formatTMDBContent);
        setPopularShows(formattedPopular);
        setLoading(prev => ({ ...prev, popular: false }));

        if (formattedPopular.length > 0) {
          setHeroContent(formattedPopular[0]);
          setLoading(prev => ({ ...prev, hero: false }));
        }

        const topRatedData = await getTopRatedTVShows();
        const formattedTopRated = topRatedData.results.slice(0, 10).map(formatTMDBContent);
        setTopRatedShows(formattedTopRated);
        setLoading(prev => ({ ...prev, topRated: false }));

        const comedyData = await getTVShowsByGenre(35);
        const formattedComedy = comedyData.results.slice(0, 10).map(formatTMDBContent);
        setComedyShows(formattedComedy);
        setLoading(prev => ({ ...prev, comedy: false }));

      } catch (error) {
        console.error('Error fetching TMDB data:', error);
        setLoading({
          popular: false,
          topRated: false,
          comedy: false,
          hero: false
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <HeroSection heroContent={heroContent} />
      
      <div className="relative z-10 -mt-32 pb-16">
        <TVShowRow title="Popular TV Shows" shows={popularShows} loading={loading.popular} />
        <TVShowRow title="Top Rated Series" shows={topRatedShows} loading={loading.topRated} />
        <TVShowRow title="Comedy Series" shows={comedyShows} loading={loading.comedy} />
      </div>

      <Footer />
    </div>
  );
}
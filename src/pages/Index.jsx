import { useState, useEffect } from "react";
import Header from "../components/ui/header";
import AutoScrollHeroSection from "../components/ui/AutoScrollHeroSection";
import MovieRow from "../components/ui/MovieRow";
import {
    getTrending,
    getPopularMovies,
    getUpcomingMovies,
    getPopularTVShows,
    getMoviesByGenre,
    getTVShowsByGenre,
    formatContent,
    getBackdropUrl,
    GENRE_MAP
} from "../lib/tmdb";
import Footer from "../components/Footer";


export default function Index() {
    const [trendingContent, setTrendingContent] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [popularTVShows, setPopularTVShows] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyContent, setComedyContent] = useState([]);
    const [horrorMovies, setHorrorMovies] = useState([]);
    const [dramaShows, setDramaShows] = useState([]);
    const [heroContent, setHeroContent] = useState([]);
    const [loading, setLoading] = useState({
        trending: true,
        popular: true,
        upcoming: true,
        tvShows: true,
        action: true,
        comedy: true,
        horror: true,
        drama: true,
        hero: true
    });

    const formatTMDBContent = (item) => {
        const isMovie = 'title' in item;
        const mainGenre = item.genre_ids[0] ? GENRE_MAP[item.genre_ids[0]] || 'Unknown' : 'Unknown';
        return {
            ...formatContent(item),
            genre: mainGenre
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trendingData = await getTrending('all', 'week');
                const formattedTrending = trendingData.results.slice(0, 10).map(formatTMDBContent);
                setTrendingContent(formattedTrending);
                setLoading(prev => ({ ...prev, trending: false }));

                if (formattedTrending.length > 0) {
                    setHeroContent(formattedTrending.slice(0, 5));
                    setLoading(prev => ({ ...prev, hero: false }));
                }

                const popularData = await getPopularMovies();
                const formattedPopular = popularData.results.slice(0, 10).map(formatTMDBContent);
                setPopularMovies(formattedPopular);
                setLoading(prev => ({ ...prev, popular: false }));

                const upcomingData = await getUpcomingMovies();
                const formattedUpcoming = upcomingData.results.slice(0, 10).map(formatTMDBContent);
                setUpcomingMovies(formattedUpcoming);
                setLoading(prev => ({ ...prev, upcoming: false }));

                const tvShowsData = await getPopularTVShows();
                const formattedTVShows = tvShowsData.results.slice(0, 10).map(formatTMDBContent);
                setPopularTVShows(formattedTVShows);
                setLoading(prev => ({ ...prev, tvShows: false }));

                const actionData = await getMoviesByGenre(28);
                const formattedAction = actionData.results.slice(0, 10).map(formatTMDBContent);
                setActionMovies(formattedAction);
                setLoading(prev => ({ ...prev, action: false }));

                const [comedyMovies, comedyShows] = await Promise.all([
                    getMoviesByGenre(35),
                    getTVShowsByGenre(35)
                ]);
                const mixedComedy = [
                    ...comedyMovies.results.slice(0, 5).map(formatTMDBContent),
                    ...comedyShows.results.slice(0, 5).map(formatTMDBContent)
                ];
                setComedyContent(mixedComedy);
                setLoading(prev => ({ ...prev, comedy: false }));

                const horrorData = await getMoviesByGenre(27);
                const formattedHorror = horrorData.results.slice(0, 10).map(formatTMDBContent);
                setHorrorMovies(formattedHorror);
                setLoading(prev => ({ ...prev, horror: false }));

                const dramaData = await getTVShowsByGenre(18);
                const formattedDrama = dramaData.results.slice(0, 10).map(formatTMDBContent);
                setDramaShows(formattedDrama);
                setLoading(prev => ({ ...prev, drama: false }));

            } catch (error) {
                console.error('Error fetching TMDB data:', error);
                setLoading({
                    trending: false,
                    popular: false,
                    upcoming: false,
                    tvShows: false,
                    action: false,
                    comedy: false,
                    horror: false,
                    drama: false,
                    hero: false
                });
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-black w-full min-h-screen">
            <Header />
            <AutoScrollHeroSection heroContent={heroContent} />
            <div className="relative z-10 -mt-32 pb-16">
                <MovieRow title="Trending Now" movies={trendingContent} loading={loading.trending} />
                <MovieRow title="Popular Movies" movies={popularMovies} loading={loading.popular} />
                <MovieRow title="Popular TV Shows" movies={popularTVShows} loading={loading.tvShows} />
                <MovieRow title="Action Movies" movies={actionMovies} loading={loading.action} />
                <MovieRow title="Comedy" movies={comedyContent} loading={loading.comedy} />
                <MovieRow title="Horror Movies" movies={horrorMovies} loading={loading.horror} />
                <MovieRow title="Drama Series" movies={dramaShows} loading={loading.drama} />
                <MovieRow title="Upcoming Movies" movies={upcomingMovies} loading={loading.upcoming} />
            </div>
            <Footer />
        </div>
    );
}
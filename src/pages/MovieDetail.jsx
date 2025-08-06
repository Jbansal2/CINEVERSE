import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Play, Plus, ThumbsUp, ThumbsDown, Share2, Download, ArrowLeft, Star, Clock, Calendar, Users,  Loader2 } from "lucide-react";
import Footer from "../components/Footer";
import { getMovieDetails, getTVShowDetails, getSimilarMovies, getSimilarTVShows,  getBackdropUrl, formatContent } from "../lib/tmdb";
import Header from "../components/ui/header";
import TrailerHeroSection from "../components/ui/TrailerHeroSection";


const CastSection = ({ cast }) => {
  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 py-8">
      <h2 className="text-white text-2xl font-semibold mb-6">Series Cast</h2>
      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
        {cast.slice(0, 12).map((actor) => (
          <div key={actor.id} className="flex-shrink-0 group cursor-pointer">
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
              <div className="relative">
                <img
                  src={actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?w=300'
                  }
                  alt={actor.name}
                  className="w-36 h-48 object-cover"
                  onError={(e) => {
                    const target = e.target;
                    target.src = 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?w=300';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-4">
                <h3 className="text-white text-sm font-semibold truncate mb-1">{actor.name}</h3>
                <p className="text-gray-400 text-xs truncate leading-relaxed">{actor.character}</p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-500 text-xs">Cast</span>
                  </div>
                  {actor.popularity && (
                    <div className="text-xs text-gray-500">
                      ★ {Math.round(actor.popularity / 10) || 'N/A'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <div className="flex space-x-1">
          {Array.from({ length: Math.min(4, Math.ceil(cast.length / 3)) }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-gray-600 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};


const SimilarContent = ({ contentId, contentType }) => {
  const [similarContent, setSimilarContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarContent = async () => {
      try {
        const data = contentType === 'movie'
          ? await getSimilarMovies(contentId)
          : await getSimilarTVShows(contentId);

        // Handle both API response format and mock data format
        const results = data.results || data || [];
        const formatted = results.slice(0, 6).map((item) => formatContent(item));
        setSimilarContent(formatted);
      } catch (error) {
        console.error('Error fetching similar content:', error);
        // Set empty array as fallback
        setSimilarContent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarContent();
  }, [contentId, contentType]);

  if (loading) {
    return (
      <div className="px-4 md:px-12 py-8">
        <h2 className="text-white text-2xl font-semibold mb-6">More Like This</h2>
        <div className="flex justify-center items-center h-40">
          <Loader2 className="text-white animate-spin" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 py-8">
      <h2 className="text-white text-2xl font-semibold mb-6">More Like This</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {similarContent.map((item) => (
          <Link 
            key={item.id}
            to={`/movie/${item.id}`}
            className="group cursor-pointer"
          >
            <div className="relative transform transition-transform duration-300 group-hover:scale-105">
              <img 
                src={item.image}
                alt={item.title}
                className="w-full h-32 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target;
                  target.src = 'https://images.unsplash.com/photo-1489599687443-08de695baaaf?w=500';
                }}
              />
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                ★ {item.rating}
              </div>
            </div>
            <h3 className="text-white text-sm font-medium mt-2 truncate">{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

const LoadingScreen = () => (
  <div className="bg-black min-h-screen">
    <Header />
    <div className="pt-20 flex items-center justify-center h-screen">
      <Loader2 className="text-white animate-spin" size={48} />
    </div>
  </div>
);

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const popularMovieIds = [550, 278, 13, 155, 680, 238, 424, 129, 274, 244];

  const redirectToValidMovie = () => {
    const randomMovieId = popularMovieIds[Math.floor(Math.random() * popularMovieIds.length)];
    navigate(`/movie/${randomMovieId}`, { replace: true });
  };

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const numericId = parseInt(id);

        if (isNaN(numericId) || numericId <= 0) {
          setError('Invalid content ID');
          return;
        }

        try {
          const movieData = await getMovieDetails(numericId);
          if (movieData && movieData.id) {
            setContent(movieData);
          } else {
            throw new Error('Invalid movie data received');
          }
        } catch (movieError) {
          console.log('Movie fetch failed, trying TV show...', movieError.message);

          try {
            const tvData = await getTVShowDetails(numericId);
            if (tvData && tvData.id) {
              setContent(tvData);
            } else {
              throw new Error('Invalid TV show data received');
            }
          } catch (tvError) {
            console.error('Both movie and TV show fetch failed:', {
              movieError: movieError.message,
              tvError: tvError.message
            });

            if (movieError.message.includes('404') && tvError.message.includes('404')) {
              console.log(`Movie ID ${id} not found, redirecting to a popular movie...`);
              setTimeout(() => {
                redirectToValidMovie();
              }, 2000);
              setError('Content not found. Redirecting to a popular movie...');
            } else {
              setError('Failed to load content details. Please try again later.');
            }
          }
        }
      } catch (error) {
        console.error('Error fetching content details:', error);
        setError('An unexpected error occurred while loading content details.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !content) {
    return (
      <div className="bg-black min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-2xl px-4">
            <div className="mb-8">
              <div className="text-6xl mb-4">🎬</div>
              <h2 className="text-white text-3xl font-bold mb-4">
                {error?.includes('not found') ? 'Content Not Found' : 'Something Went Wrong'}
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                {error?.includes('Redirecting')
                  ? "The movie or TV show you're looking for doesn't exist. We're redirecting you to a popular movie instead..."
                  : error?.includes('not found')
                  ? "The movie or TV show you're looking for doesn't exist in our database. It might have been removed or the link is invalid."
                  : error || "We're having trouble loading this content. Please try again later."
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-netflix-red hover:bg-red-700 text-white px-8 py-3">
                  Browse Home
                </Button>
              </Link>
              <Link to="/movies">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3">
                  Browse Movies
                </Button>
              </Link>
              <Link to="/tv-shows">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3">
                  Browse TV Shows
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3">
                  Search Content
                </Button>
              </Link>
            </div>

            {id && (
              <div className="mt-8 p-4 bg-gray-900 rounded-lg">
                <p className="text-gray-400 text-sm">
                  <strong>Debug Info:</strong> Tried to load content with ID: {id}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const isMovie = 'title' in content;
  const title = isMovie ? content.title : content.name;
  const releaseDate = isMovie ? content.release_date : content.first_air_date;
  const runtime = isMovie ? `${content.runtime} min` : `${content.number_of_seasons} Season${content.number_of_seasons > 1 ? 's' : ''}`;
  const contentType = isMovie ? 'movie' : 'tv';

  const formatDate = (dateString) => {
    return new Date(dateString).getFullYear().toString();
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getCast = () => {
    if (content.credits?.cast) {
      return content.credits.cast.slice(0, 5).map(actor => actor.name).join(', ');
    }
    return 'Cast information not available';
  };

  const getDirectorOrCreator = () => {
    if (isMovie && content.credits?.crew) {
      const director = content.credits.crew.find(person => person.job === 'Director');
      return director ? director.name : 'Director not available';
    } else if (!isMovie && 'created_by' in content) {
      return content.created_by.map(creator => creator.name).join(', ') || 'Creator not available';
    }
    return 'Not available';
  };

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Header />

      <TrailerHeroSection
        contentId={content.id}
        contentType={contentType}
        backdropUrl={getBackdropUrl(content.backdrop_path)}
        title={title}
        content={content}
        isMovie={isMovie}
        releaseDate={releaseDate}
        runtime={runtime}
      />
      
      <div className="px-4 md:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-white text-2xl font-semibold mb-4">About {title}</h2>
            
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-2">
                <Users className="text-gray-500 mt-1 flex-shrink-0" size={16} />
                <div>
                  <span className="text-white font-medium">Cast: </span>
                  <span>{getCast()}</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Users className="text-gray-500 mt-1 flex-shrink-0" size={16} />
                <div>
                  <span className="text-white font-medium">{isMovie ? 'Director' : 'Creator'}: </span>
                  <span>{getDirectorOrCreator()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="text-gray-500" size={16} />
                <span className="text-white font-medium">Release Date:</span>
                <span>{new Date(releaseDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="text-gray-500" size={16} />
                <span className="text-white font-medium">Duration:</span>
                <span>{isMovie ? formatRuntime(content.runtime) : `${content.number_of_episodes} episodes`}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium">Language:</span>
                <span>{content.original_language.toUpperCase()}</span>
              </div>
              
              {!isMovie && 'number_of_seasons' in content && (
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">Seasons:</span>
                  <span>{content.number_of_seasons}</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Ratings</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">TMDB</span>
                  <div className="flex items-center space-x-2">
                    <Star className="text-yellow-500 fill-current" size={16} />
                    <span className="text-white font-semibold">{content.vote_average.toFixed(1)}/10</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Votes</span>
                  <span className="text-white font-semibold">{content.vote_count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Popularity</span>
                  <span className="text-green-500 font-semibold">{Math.round(content.popularity)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CastSection cast={content.credits?.cast} />

      <SimilarContent contentId={content.id} contentType={contentType} />

      <Footer />
    </div>
  );
}
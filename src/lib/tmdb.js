const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const getApiKey = () => {
  return (
    import.meta.env.VITE_TMDB_API_KEY || "7076ebfb043164c03de784f2a8b084f9"
  );
};

const tmdbFetch = async (endpoint, params = {}) => {
  const apiKey = getApiKey();

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", apiKey);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (!response.ok) {
        const errorMsg = `TMDB API error: ${response.status} - ${response.statusText}`;
        console.error(errorMsg);
        console.error(`URL: ${url.toString()}`);
        console.error(`Attempt ${attempt}/3`);

        if (response.status === 404) {
          throw new Error(`404 - Content not found: ${endpoint}`);
        }

        if (response.status === 401) {
          throw new Error(`401 - Authentication failed. Check API key.`);
        }

        if (attempt === 3) {
          throw new Error(errorMsg);
        }

        if (response.status < 400 || response.status >= 500) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
          continue;
        } else {
          throw new Error(errorMsg);
        }
      }

      const data = await response.json();
      if (attempt > 1) {
        console.log(`TMDB API call succeeded on attempt ${attempt}`);
        console.log("API response:", data.results?.map(item => ({
          title: item.title || item.name,
          poster_path: item.poster_path
        })));
      }
      return data;
    } catch (error) {
      console.error(`TMDB Fetch Error (attempt ${attempt}/3):`, error);
      console.error(`URL attempted: ${url.toString()}`);
      console.error(`Error details: ${error.message}`);

      if (attempt === 3) {
        console.error("All retry attempts failed");
        console.error("URL attempted:", url.toString());
        console.error(
          "API Key (first 10 chars):",
          apiKey.substring(0, 10) + "..."
        );
        console.log("Falling back to mock data");
        return getMockData(endpoint);
      }
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
};

const getMockData = (endpoint) => {
  const mockMovies = [
    {
      id: 550,
      title: "Fight Club",
      overview:
        "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
      poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      backdrop_path: "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
      release_date: "1999-10-15",
      vote_average: 8.4,
      vote_count: 26280,
      genre_ids: [18],
      adult: false,
      original_language: "en",
      original_title: "Fight Club",
      popularity: 61.416,
      video: false,
    },
    {
      id: 13,
      title: "Forrest Gump",
      overview:
        "A man with a low IQ has accomplished great things in his life and been present during significant historic events.",
      poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      backdrop_path: "/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
      release_date: "1994-06-23",
      vote_average: 8.5,
      vote_count: 25603,
      genre_ids: [35, 18, 10749],
      adult: false,
      original_language: "en",
      original_title: "Forrest Gump",
      popularity: 48.307,
      video: false,
    },
    {
      id: 278,
      title: "The Shawshank Redemption",
      overview:
        "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
      poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      backdrop_path: "/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
      release_date: "1994-09-23",
      vote_average: 8.7,
      vote_count: 24346,
      genre_ids: [18, 80],
      adult: false,
      original_language: "en",
      original_title: "The Shawshank Redemption",
      popularity: 88.057,
      video: false,
    },
    {
      id: 155,
      title: "The Dark Knight",
      overview:
        "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations.",
      poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      backdrop_path: "/qlAXVtHdtGiCO3srYDLkIIW4Q3B.jpg",
      release_date: "2008-07-18",
      vote_average: 8.5,
      vote_count: 31000,
      genre_ids: [28, 80, 18],
      adult: false,
      original_language: "en",
      original_title: "The Dark Knight",
      popularity: 123.456,
      video: false,
    },
    {
      id: 680,
      title: "Pulp Fiction",
      overview:
        "A burger-loving hit man, his philosophical partner, a drug-addicted gangster's moll and a washed-up boxer converge in this sprawling crime caper.",
      poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      backdrop_path: "/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
      release_date: "1994-09-10",
      vote_average: 8.9,
      vote_count: 27000,
      genre_ids: [80, 18],
      adult: false,
      original_language: "en",
      original_title: "Pulp Fiction",
      popularity: 97.123,
      video: false,
    },
  ];

  const mockTVShows = [
    {
      id: 1399,
      name: "Game of Thrones",
      overview:
        "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war.",
      poster_path: "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
      backdrop_path: "/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
      first_air_date: "2011-04-17",
      vote_average: 8.3,
      vote_count: 11504,
      genre_ids: [18, 10759, 10765],
      origin_country: ["US"],
      original_language: "en",
      original_name: "Game of Thrones",
      popularity: 369.594,
    },
    {
      id: 1396,
      name: "Breaking Bad",
      overview:
        "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
      poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
      backdrop_path: "/eSzpy96DwBujGFj0xMbXBcGcfxX.jpg",
      first_air_date: "2008-01-20",
      vote_average: 8.9,
      vote_count: 12893,
      genre_ids: [18, 80],
      origin_country: ["US"],
      original_language: "en",
      original_name: "Breaking Bad",
      popularity: 317.292,
    },
    {
      id: 94605,
      name: "Arcane",
      overview:
        "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
      poster_path: "/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
      backdrop_path: "/rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg",
      first_air_date: "2021-11-06",
      vote_average: 8.7,
      vote_count: 4200,
      genre_ids: [16, 18, 10765],
      origin_country: ["US"],
      original_language: "en",
      original_name: "Arcane",
      popularity: 425.123,
    },
  ];

  const isTVEndpoint = endpoint.includes("/tv/") || endpoint.includes("tv");
  const baseData = isTVEndpoint ? mockTVShows : mockMovies;

  const mockResults = Array.from({ length: 20 }, (_, i) => {
    const baseItem = baseData[i % baseData.length];
    const suffix =
      i > baseData.length - 1 ? ` ${Math.floor(i / baseData.length) + 1}` : "";

    return {
      ...baseItem,
      id: baseItem.id + i * 1000,
      title: baseItem.title ? `${baseItem.title}${suffix}` : undefined,
      name: baseItem.name ? `${baseItem.name}${suffix}` : undefined,
      vote_average: Math.max(6.0, baseItem.vote_average - Math.random() * 2),
      popularity: baseItem.popularity + Math.random() * 100,
    };
  });

  return {
    results: mockResults,
    page: 1,
    total_pages: 10,
    total_results: 200,
  };
};

export const getImageUrl = (path, size = "w500") => {
  if (!path || typeof path !== "string" || path.trim() === "") {
    console.warn("Invalid poster path:", path);
    return "https://placehold.co/500x750?text=No+Image";
  }
  const url = `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  console.log("Generated image URL:", url);
  return url;
};

export const getBackdropUrl = (path, size = "w1280") => {
  if (!path || typeof path !== "string" || path.trim() === "") {
    console.warn("Invalid backdrop path:", path);
    return "https://placehold.co/1200x675?text=No+Image";
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getTrending = async (mediaType = "all", timeWindow = "week") => {
  const data = await tmdbFetch(`/trending/${mediaType}/${timeWindow}`); // Reverted to API
  console.log("Trending API response:", data.results.map(item => ({
    title: item.title || item.name,
    poster_path: item.poster_path
  })));
  return data;
};

export const getPopularMovies = async (page = 1) => {
  const data = await tmdbFetch("/movie/popular", { page: page.toString() });
  console.log("Popular movies API response:", data.results.map(item => ({
    title: item.title || item.name,
    poster_path: item.poster_path
  })));
  return data;
};

export const getPopularTVShows = async (page = 1) => {
  const data = await tmdbFetch("/tv/popular", { page: page.toString() });
  console.log("Popular TV shows API response:", data.results.map(item => ({
    title: item.title || item.name,
    poster_path: item.poster_path
  })));
  return data;
};

export const getTopRatedMovies = async (page = 1) => {
  const data = await tmdbFetch("/movie/top_rated", { page: page.toString() });
  console.log("Top rated movies API response:", data.results.map(item => ({
    title: item.title || item.name,
    poster_path: item.poster_path
  })));
  return data;
};

export const getTopRatedTVShows = async (page = 1) => {
  const data = await tmdbFetch("/tv/top_rated", { page: page.toString() });
  console.log("Top rated TV shows API response:", data.results.map(item => ({
    title: item.title || item.name,
    poster_path: item.poster_path
  })));
  return data;
};

export const getUpcomingMovies = async (page = 1) => {
  const data = await tmdbFetch("/movie/upcoming", { page: page.toString() });
  console.log("Upcoming movies API response:", data.results.map(item => ({
    title: item.title || item.name,
    poster_path: item.poster_path
  })));
  return data;
};

export const getNowPlayingMovies = async (page = 1) => {
  const data = await tmdbFetch("/movie/now_playing", { page: page.toString() });
  console.log("Now playing movies API response:", data.results.map(item => ({
    title: item.title || item.name,
    poster_path: item.poster_path
  })));
  return data;
};

export const getTVShowsAiringToday = async (page = 1) => {
  const data = await tmdbFetch("/tv/airing_today", { page: page.toString() });
  console.log("TV shows airing today API response:", data.results.map(item => ({
    title: item.title || item.name,
    poster_path: item.poster_path
  })));
  return data;
};

export const getTVShowsOnTheAir = async (page = 1) => {
  const data = await tmdbFetch("/tv/on_the_air", { page: page.toString() });
  console.log("TV shows on the air API response:", data.results.map(item => ({
    title: item.title || item.name,
    poster_path: item.poster_path
  })));
  return data;
};

export const getMovieDetails = async (movieId) => {
  const data = await tmdbFetch(`/movie/${movieId}`, {
    append_to_response: "credits,videos,similar",
  });
  console.log("Movie details API response:", {
    title: data.title,
    poster_path: data.poster_path
  });
  return data;
};

export const getTVShowDetails = async (tvId) => {
  const data = await tmdbFetch(`/tv/${tvId}`, {
    append_to_response: "credits,videos,similar",
  });
  console.log("TV show details API response:", {
    title: data.name,
    poster_path: data.poster_path
  });
  return data;
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  const data = await tmdbFetch("/discover/movie", {
    with_genres: genreId.toString(),
    page: page.toString(),
    sort_by: "popularity.desc",
  });
  console.log(`Movies by genre ${genreId} API response:`, data.results.map(item => ({
    title: item.title || item.name,
    poster_path: item.poster_path
  })));
  return data;
};

export const getTVShowsByGenre = async (genreId, page = 1) => {
  const data = await tmdbFetch("/discover/tv", {
    with_genres: genreId.toString(),
    page: page.toString(),
    sort_by: "popularity.desc",
  });
  console.log(`TV shows by genre ${genreId} API response:`, data.results.map(item => ({
    title: item.title || item.name,
    poster_path: item.poster_path
  })));
  return data;
};

export const getSimilarMovies = async (movieId) => {
  const data = await tmdbFetch(`/movie/${movieId}/similar`);
  console.log("Similar movies API response:", data.results.map(item => ({
    title: item.title || item.name,
    poster_path: item.poster_path
  })));
  return data;
};

export const getSimilarTVShows = async (tvId) => {
  const data = await tmdbFetch(`/tv/${tvId}/similar`);
  console.log("Similar TV shows API response:", data.results.map(item => ({
    title: item.title || item.name,
    poster_path: item.poster_path
  })));
  return data;
};

export const searchMulti = async (query, page = 1) => {
  const data = await tmdbFetch("/search/multi", {
    query: encodeURIComponent(query),
    page: page.toString(),
  });
  console.log("Search multi API response:", data.results.map(item => ({
    title: item.title || item.name,
    poster_path: item.poster_path
  })));
  return data;
};

export const getMovieGenres = async () => {
  const data = await tmdbFetch("/genre/movie/list");
  console.log("Movie genres API response:", data.genres);
  return data;
};

export const getTVGenres = async () => {
  const data = await tmdbFetch("/genre/tv/list");
  console.log("TV genres API response:", data.genres);
  return data;
};

export const formatContent = (item) => {
  const isMovie = "title" in item;
  return {
    id: item.id,
    title: isMovie ? item.title : item.name,
    image: getImageUrl(item.poster_path),
    backdrop: getBackdropUrl(item.backdrop_path),
    genre: "",
    year: isMovie
      ? item.release_date?.split("-")[0] || ""
      : item.first_air_date?.split("-")[0] || "",
    rating: item.vote_average.toFixed(1),
    overview: item.overview,
    type: isMovie ? "movie" : "tv",
  };
};

export const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};
const animeQuery = {
  query: `
            query {
                Page(page: 1, perPage: 20) {
                    media(type: ANIME, sort: POPULARITY_DESC) {
                        id 
                        title {
                            romaji
                            english
                        }
                        coverImage {
                            large
                        }
                        description(asHtml: false)
                        genres
                        averageScore
                        format
                        episodes
                    }
                }
            }
        `,
};

const animeGenreQuery = {
  query: `
            query ($genre: String, $page: Int) {
                Page(page: $page, perPage: 20) {
                    pageInfo {
                      total
                      currentPage
                      lastPage
                      hasNextPage
                    }
                    media(genre: $genre, type: ANIME, sort: POPULARITY_DESC) {
                        id 
                        title {
                            romaji
                            english
                        }
                        coverImage {
                            large
                        }
                        startDate {
                            year
                            month
                            day
                        }
                        status
                        description(asHtml: false)
                        genres
                        averageScore
                        format
                        episodes
                    }
                }
            }
        `,
  variables: {
    pagee: 1, // default, will be overridden dynamically
  },
};

const seasonalTopRatedAnimeQuery = {
  query: `
    query {
  Page(perPage: 11) {
    media(type: ANIME, status_in: RELEASING, sort: TRENDING_DESC) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
      }
      genres
      description(asHtml: false)
      format
      episodes
      duration
      startDate {
        year
        month
        day
      }
    }
  }
}

  `,
  variables: {},
};

const trendingAnimeQuery = {
  query: `
    query ($page: Int) {
      Page(page: $page, perPage: 20) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
        }
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          startDate {
            year
            month
            day
          }
          bannerImage
          description(asHtml: false)
          genres
          averageScore
          format
          episodes
        }
      }
    }
  `,
  variables: {
    page: 1, // default, will be overridden dynamically
  },
};

const upcomingAnimeQuery = {
  query: `
  query ($season: MediaSeason, $seasonYear: Int, $page: Int) {
        Page(page: $page, perPage: 20) {
            pageInfo {
              total
              currentPage
              lastPage
              hasNextPage
            }
            media(type: ANIME, season: $season, seasonYear: $seasonYear ,sort: POPULARITY_DESC) {
                id 
                title {
                    romaji
                    english
                }
                coverImage {
                    large
                }
                startDate {
                    year
                    month
                    day
                }
                description(asHtml: false)
                genres
                averageScore
                format
                episodes
            }
        }
      }
    `,
  variables: {
    page: 1, // default, will be overridden dynamically
  },
};

const latestAnimeQuery = {
  query: `
  query ($page: Int) {
      Page(page: $page, perPage: 20) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
        }
        media(type: ANIME, status_in: RELEASING, sort: START_DATE_DESC) {
          id 
          title {
          romaji
          english
                }
          coverImage {
            large
          }
          startDate {
            year
            month
            day
          }
          status
          description(asHtml: false)
          genres
          averageScore
          format
          episodes
        }
      }
    }
  `,
  variables: {
    page: 1, // default, will be overridden dynamically
  },
};

const animeSearchQuery = {
  query: `
      query ($search: String, $page: Int) {
        Page(page: $page, perPage: 20) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
          }
          media(type: ANIME, search: $search, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            description(asHtml: false)
            genres
            status
            averageScore
            format
            episodes
            startDate {
              year
              month
              day
            }
          }
        }
      }
    `,
  variables: {
    page: 1, // default, will be overridden dynamically
  },
};

const animeDetailsQuery = {
  query: `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          idMal
          title {
            romaji
            english
          }
          relations {
            edges {
              relationType
              node {
                id
                title {
                  romaji
                  english
                }
                format
                status
                episodes
                coverImage {
                  large
                }
                type
              }
            }
          }
          recommendations(sort: RATING_DESC, perPage: 20) {
            edges {
              node {
                mediaRecommendation {
                  id
                  title {
                    romaji
                    english
                  }
                  coverImage {
                    large
                  }
                  format
                  averageScore
                  episodes
                }
              }
            }
          }
          coverImage {
            extraLarge
          }
          bannerImage
          trailer {
            id
            site
            thumbnail
          }
          description(asHtml: false)
          averageScore
          popularity
          format
          episodes
          duration
          genres
          source
          status
          startDate {
            year
            month
            day
          }
          season
          seasonYear
        }
      }
    `,
  variables: {},
};

const animeCharacterQuery = {
  query: `
    query ($id: Int, $page: Int) {
      Media(id: $id, type: ANIME) {
        characters(perPage: 20, page: $page, sort: [ROLE, FAVOURITES_DESC]) {
          pageInfo {
            total
            currentPage
            hasNextPage
          }
          edges {
            role
            node {
              id
              name {
                full
                native
              }
              image {
                large
              }
              gender
              age
              description(asHtml: false)
              dateOfBirth {
                year
                month
                day
              }
            }
            voiceActors {
              id
              name {
                full
                native
              }
              language
              image {
                large
              }
            }
          }
        }
      }
    }
  `,
  variables: {},
};

const animeStaffQuery = {
  query: `
    query ($id: Int, $page: Int) {
      Media(id: $id, type: ANIME) {
        staff(perPage: 20, page: $page, sort: [ROLE_DESC]) {
          pageInfo {
            total
            currentPage
            hasNextPage
          }
          edges {
            role
            node {
            id
            name {
              full
              native
            }
            image {
              large
            }
          }
        }
      }
    }
  }
  `,
  variables: {},
};

const animeMoreInfoQuery = {
  query: `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        status
        source
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        nextAiringEpisode {
          episode
          airingAt
        }
        favourites
        studios(isMain: true) {
          nodes {
            name
          }
        }
        rankings {
          id
          rank
          type
          format
          allTime
        }
        tags {
          name
          rank
          isMediaSpoiler
          description
        }
        externalLinks {
          site
          url
          type
          color
        }
        hashtag
        siteUrl
        updatedAt
        isAdult
        countryOfOrigin
      }
    }
  `,
  variables: {},
};

module.exports = {
  trendingAnimeQuery,
  animeQuery,
  animeGenreQuery,
  upcomingAnimeQuery,
  latestAnimeQuery,
  animeSearchQuery,
  animeDetailsQuery,
  animeCharacterQuery,
  animeStaffQuery,
  animeMoreInfoQuery,
  seasonalTopRatedAnimeQuery,
};

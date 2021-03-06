const showQuery = `query ($search: String) {
	anime: Page(page: 1, perPage: 50) {
	  pageInfo {
		total
	  }
	  results: media(type: ANIME, sort: [SEARCH_MATCH], isAdult: false, search: $search, format_in: [TV, ONA, OVA, SPECIAL], endDate_greater: 20190108, endDate_lesser: 20200112, duration_greater: 15, episodes_greater: 1, countryOfOrigin: JP) {
		id
		format
		startDate {
		  year
		}
		title {
		  romaji
		  english
		  native
		  userPreferred
		}
		coverImage {
		  large
		}
		siteUrl
	  }
	}
  }
  `;

const prodQuery = `query ($search: String) {
	anime: Page(page: 1, perPage: 50) {
	  pageInfo {
		total
	  }
	  results: media(type: ANIME, search: $search, sort: [SEARCH_MATCH], isAdult: false, format_in: [TV, TV_SHORT, ONA, OVA, SPECIAL], endDate_greater: 20190108, endDate_lesser: 20200112, episodes_greater: 1, countryOfOrigin: JP) {
		id
		format
		startDate {
		  year
		}
		title {
		  romaji
		  english
		  native
		  userPreferred
		}
		coverImage {
		  large
		}
		siteUrl
	  }
	}
  }
  `;

const testQuery = `query ($search: String) {
	anime: Page(page: 1, perPage: 50) {
	  pageInfo {
		total
	  }
	  results: media(type: ANIME, sort: [SEARCH_MATCH], format_in: [TV, TV_SHORT, ONA, OVA, SPECIAL, MOVIE], search: $search, endDate_greater: 20190108, endDate_lesser: 20200112, isAdult: false, countryOfOrigin: JP) {
		id
		format
		startDate {
		  year
		}
		title {
		  romaji
		  english
		  native
		  userPreferred
		}
		coverImage {
		  large
		}
		siteUrl
	  }
	}
  }
  `;

// The catch here is that there's literally no filtering on these. The endDate object needs to be filtered client-side for both these queries.
// Essentially the check is super weird to perform. JS's Date() object can work. One of these needs to be the beginning of the eligibility criteria
// and the other needs to be the end. You create another date object for the character or VA and check if it lies between and filter by that.
const charQuery = `query ($search: String) {
	character: Page(page: 1, perPage: 50) {
	  pageInfo {
		total
	  }
	  results: characters(search: $search, sort: [SEARCH_MATCH]) {
		id
		name {
		  full
		  alternative
		  native
		}
		image {
		  large
		}
		media(sort: [START_DATE], type: ANIME, page: 1, perPage: 50) {
		  nodes {
			id
			title {
			  romaji
			  english
			  native
			  userPreferred
			}
			endDate {
			  year
			  month
			  day
			}
		  }
		  edges {
			id
			characterRole
		  }
		}
		siteUrl
	  }
	}
  }`;

const vaQuery = `query ($search: String) {
	character: Page(page: 1, perPage: 50) {
	  pageInfo {
		total
	  }
	  results: characters(search: $search, sort: [SEARCH_MATCH]) {
		id
		name {
		  full
		}
		image {
		  large
		}
		media(sort: [START_DATE], type: ANIME, page: 1, perPage: 50) {
		  nodes {
			id
			title {
			  romaji
			  english
			  native
			  userPreferred
			}
			endDate {
			  year
			  month
			  day
			}
		  }
		  edges {
			id
			node {
			  id
			}
			characterRole
			voiceActors(language: JAPANESE) {
			  id
			  name {
				full
				alternative
				native
			  }
			}
		  }
		}
		siteUrl
	  }
	}
  }
  `;

const showByIDQuery = `query ($id: [Int]) {
	Page {
	  pageInfo {
		total
	  }
	  results: media(type: ANIME, id_in: $id) {
		id
		format
		startDate {
		  year
		}
		title {
		  romaji
		  english
		  native
		  userPreferred
		}
		coverImage {
		  large
		}
		siteUrl
	  }
	}
  }`;

const charByIDQuery = `query ($id: [Int]) {
	Page {
	  pageInfo {
		total
	  }
	  results: characters(id_in: $id) {
		id
		name {
		  full
		  alternative
		  native
		}
		image {
		  large
		}
		media(sort: [START_DATE], type: ANIME, page: 1, perPage: 1) {
		  nodes {
			id
			title {
			  romaji
			  english
			  native
			  userPreferred
			}
			endDate {
			  year
			  month
			  day
			}
		  }
		  edges {
			id
			characterRole
		  }
		}
		siteUrl
	  }
	}
  }
  `;

const vaByIDQuery = `query ($id: [Int]) {
	Page {
	  pageInfo {
		total
	  }
	  results: characters(id_in: $id) {
		id
		name {
		  full
		}
		image {
		  large
		}
		media(sort: [START_DATE], type: ANIME, page: 1, perPage: 1) {
		  nodes {
			id
			title {
			  romaji
			  english
			  native
			  userPreferred
			}
			endDate {
			  year
			  month
			  day
			}
		  }
		  edges {
			id
			node {
			  id
			}
			characterRole
			voiceActors(language: JAPANESE) {
			  id
			  name {
				full
				alternative
				native
			  }
			}
		  }
		}
		siteUrl
	  }
	}
  }
  `;

const themeByIDQuery = `query ($id: [Int]) {
	Page {
	  results: media(id_in: $id) {
		id
		format
		startDate {
		  year
		}
		title {
		  romaji
		  english
		}
		coverImage {
		  large
		}
		siteUrl
	  }
	}
  }
  `;

const showQuerySimple = `query ($id: [Int], $page: Int, $perPage: Int) {
	Page (page: $page, perPage: $perPage) {
	  pageInfo {
		total
		currentPage
		lastPage
	  }
	  results: media(type: ANIME, id_in: $id) {
		id
		format
		startDate {
		  year
		}
		title {
		  romaji
		  english
		}
		synonyms
		coverImage {
		  large
		  extraLarge
		}
		siteUrl
		idMal
	  }
	}
  }`;

const charQuerySimple = `query ($id: [Int], $page: Int, $perPage: Int) {
	Page(page: $page, perPage: $perPage) {
	  pageInfo {
		total
		currentPage
		lastPage
	  }
	  results: characters(id_in: $id) {
		id
		name {
		  full
		  alternative
		}
		image {
		  large
		}
		media(sort: [START_DATE], type: ANIME, page: 1, perPage: 1) {
		  nodes {
			id
			title {
			  romaji
			  english
			}
		  }
		  edges {
			id
			node {
			  id
			}
			characterRole
			voiceActors(language: JAPANESE) {
			  id
			  name {
				full
				alternative
			  }
			}
		  }
		}
		siteUrl
	  }
	}
  }
  `;

module.exports = {
	showQuery,
	showQuerySimple,
	charQuery,
	charQuerySimple,
	vaQuery,
	testQuery,
	prodQuery,
	showByIDQuery,
	charByIDQuery,
	vaByIDQuery,
	themeByIDQuery,
};

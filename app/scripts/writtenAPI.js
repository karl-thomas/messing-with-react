import axios from 'axios';

const writtenAPI = ({ GHOST_ID, GHOST_SECRET, GHOST_ADDRESS }) => {
  const API = {
    auth: `?client_id=${GHOST_ID}&client_secret=${GHOST_SECRET}`,

    defaultParams: '&include=tags',

    uri(searchTerms) {
      return searchTerms + this.auth + this.defaultParams;
    },

    externalUrl(searchTerms) {
      return `http://${GHOST_ADDRESS}/ghost/api/v0.1/${this.uri(searchTerms)}`;
    },

    internalUrl(searchTerms) {
      return process.env.NODE_ENV === 'development'
        ? `http://localhost:8080/${this.uri(searchTerms)}`
        : `http://karl-thomas.com/${this.uri(searchTerms)}`;
    },

    Server: {
      Posts: {
        all() {
          return axios.get(API.externalUrl('posts'));
        },
        find(slug) {
          return axios.get(API.externalUrl(`/posts/slug/${slug}`));
        }
      }
    },

    Client: {
      Posts: {
        all() {
          return axios.get('/api/written/posts');
        },
        find(slug) {
          return axios.get(`/api/written/posts/${slug}`);
        }
      }
    }
  };
  return API;
};

export default writtenAPI;

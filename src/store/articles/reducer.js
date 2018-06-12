import Immutable from 'seamless-immutable';
import * as types from './actionTypes';
import _ from 'lodash';

const initialState = Immutable({
  meshSearch: 'epilepsy',
  loading: false
});

export default function reduce(state = initialState, action = {}) {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case types.ARTICLES_FETCHED:
      return state.merge({
        meshArticles: action.meshArticles,
      });
    case types.FILTER_CHANGED:
      return state.merge({
        meshSearch: action.newFilter
      });
    case types.ARTICLES_LOADING:
      return state.merge({
        loading: action.loading
      });
    default:
      return state;
  }
}

export function getArticles(state) {
  return state.articles.meshArticles;
}

export function getMeshSearch(state) {
  return state.articles.meshSearch;
}

export function getLoading(state) {
  return state.articles.loading;
}


export function getMeshCounts(state) {
  var cnts = _.countBy(_.map(state.articles.meshArticles, (article) => (article.pubYear)));
  var vals = [];
  _.forEach(cnts, function(value, key) {
    vals.push({x: key, y: value})
  });
  return vals;
}

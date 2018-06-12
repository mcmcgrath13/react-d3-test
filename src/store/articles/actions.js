import medlineService from '../../services/medline';
import * as articleSelectors from './reducer';
import * as types from './actionTypes';

export function fetchArticles() {
  return async(dispatch, getState) => {
    try {
      dispatch({ type: types.ARTICLES_LOADING, loading: true });
      const meshParam = articleSelectors.getMeshSearch(getState());
      const fetchPromises = medlineService.getMedline(meshParam);
      const meshArticles = await Promise.resolve(fetchPromises);
      dispatch({ type: types.ARTICLES_FETCHED, meshArticles });
      dispatch({ type: types.ARTICLES_LOADING, loading: false });
    } catch (error) {
      console.error(error);
    }
  };
}

export function changeFilter(newFilter) {
  return({ type: types.FILTER_CHANGED, newFilter})
}

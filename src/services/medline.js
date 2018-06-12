import _ from 'lodash';

const MEDLINE_ENDPOINT = 'http://localhost:3001';

class MedlineService {

  async getMedline(meshQuery) {
    var url = `${MEDLINE_ENDPOINT}/articles`;
    if (meshQuery) {
      url = url + '?mesh=' + meshQuery;
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`RedditService getMedline failed, HTTP status ${response.status}`);
    }
    const data = await response.json();

    // return data;
    return _.map(data, (article) => {
      // abstract away the specifics of the reddit API response and take only the fields we care about
      return {
        title: _.get(article, 'title'),
        pmid: _.get(article, 'pmid'),
        authors: _.get(article, 'authors'),
        pubYear: _.get(article, 'pub_year')
      }
    });
  }
}

export default new MedlineService();

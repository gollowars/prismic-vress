import Prismic from 'prismic-javascript'

class Request {
  constructor() {


    this.__init()
  }

  __init() {

  }

  getAll(endpoint,query = '') {
    return new Promise((resolve, reject) => {
      Prismic.api(endpoint).then(function (api) {
        return api.query(query); // An empty query will return all the documents
      }).then(function (response) {
        // console.log("Documents: ", response.results);
        resolve(response.results)
      }, function (err) {
        reject(err)
        // console.log("Something went wrong: ", err);
      });
    })
  }
}

export default new Request()

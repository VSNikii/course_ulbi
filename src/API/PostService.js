import axios from 'axios';

export default class PostService {
  static async getAll(limit = 30, page = 1) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _limit: limit,
        _page: page,
      },
    });
    return response;
  }
  static async getById(id){
    const reponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return reponse
  }
}

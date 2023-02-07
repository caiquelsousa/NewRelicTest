import RegisterApi from '../RegisterApiDecorator';
import UserService from '../service/UserService';

const userService = new UserService();

export default class User {
  constructor() {
    console.log('User APIs registered!');
  }

  @RegisterApi('GET', '/user/(?<id>\\d+)')
  static getUserById(req, res, done, params) {
    console.log('api', userService);
    const user = userService.getUserById(params.path.id); // mock data import
    res.write(JSON.stringify(user));
    done();
  }
}

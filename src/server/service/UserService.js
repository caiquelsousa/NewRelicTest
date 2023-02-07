import UserRepository from '../repository/UserRepository';

export default class UserService {
  constructor() {
    this._userRepository = new UserRepository();
  }

  getUserById(id) {
    console.log('service');
    return this._userRepository.getUserById(id);
  }
}

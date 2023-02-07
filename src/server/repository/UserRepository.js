const user = {
  id: 1,
  name: 'a very long name',
  email: 'averylongemailadress@companyname.com',
};

export default class UserRepository {
  getUserById(id) {
    //mock data
    if (id == 1) {
      return user;
    }
  }
}

import UserRepository from '../UserRepository';

const repository = new UserRepository();

test('User OK', () => {
  const id = 1;
  const user = repository.getUserById(id);
  expect(typeof user).toBe('object');
  expect(user.id).toBe(id);
  expect(user.name).toMatch(/\w{3,}/);
  expect(user.email).toMatch(/\w{3,}/);
});

test('User Not Found', () => {
  const id = 50;
  const user = repository.getUserById(id);
  expect(user).toBeUndefined();
});

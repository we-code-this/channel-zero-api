export const login = async app => {
  const response = await app.inject({
    method: 'POST',
    url: '/login',
    payload: {
      email: 'user@example.com',
      password: 'password'
    }
  });

  return JSON.parse(response.payload).token;
};

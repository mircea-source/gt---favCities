export async function verifyUserCredentials(username, password) {

    if (username === 'admin' && password === 'password') {
      return { id: 1, name: 'Admin', email: 'admin@example.com' };
    }
    return null;
  }
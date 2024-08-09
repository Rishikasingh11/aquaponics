interface User {
  accessToken?: string;
}

export default function authHeader(): string | undefined {
  const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

  if (user && user.accessToken) {
    return user.accessToken;
  } else {
    return undefined;
  }
}
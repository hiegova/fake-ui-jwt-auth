import { RawData } from './Chart';
import { delay, random } from './helpers';

const accessToken = 'fake_token';
const storedUsername = 'test';
const storedPassword = 'test';

export type UserRole = 'admin' | 'guest';

export interface UserData {
  accessToken: string;
  roles: UserRole[];
  username: string;
}

export interface FakeResponse<DataT> {
  status: number;
  data?: DataT;
}

export interface FakeResponseError {
  status: number;
}

export async function login(
  username: string,
  password: string,
): Promise<FakeResponse<UserData>> {
  await delay(random(80, 1200));

  if (username !== storedUsername || password !== storedPassword) {
    return { status: 401 };
  }

  return {
    status: 200,
    data: {
      accessToken: 'fake_token',
      roles: ['admin'],
      username,
    },
  };
}

export async function getRandomDataList(
  username: string,
  token: string,
): Promise<FakeResponse<RawData[]>> {
  await delay(random(80, 1200));

  if (username !== storedUsername || token !== accessToken) {
    return { status: 401 };
  }

  const data = new Array(1000).fill(null).map(() => ({
    month: random(1, 12),
    value: random(1, 1000),
  }));

  return {
    status: 200,
    data,
  };
}

import { fetchData } from '../userData';

// Mock @react-native-firebase/auth and @react-native-firebase/firestore
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock auth() function
const mockAuthCurrentUser = jest.fn();

// Mock firestore() function
const mockFirestoreCollection = jest.fn();
const mockFirestoreWhere = jest.fn();
const mockFirestoreGet = jest.fn();

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    currentUser: mockAuthCurrentUser,
  })),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    collection: mockFirestoreCollection,
  })),
}));

describe('fetchData function', () => {
  beforeEach(() => {
    // Clear all mock calls before each test
    jest.clearAllMocks();
  });

  it('should return null if no authenticated user found', async () => {
    // Mock no authenticated user
    mockAuthCurrentUser.mockReturnValueOnce(null);

    // Call fetchData
    const result = await fetchData();

    // Assert
    expect(result).toBe(null);
  });

});
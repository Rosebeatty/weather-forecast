import "@testing-library/jest-dom";

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};

const mockPermissions = {
  query: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve({ status: "granted" })),
};

global.navigator.geolocation = mockGeolocation;
global.navigator.permissions = mockPermissions;
global.window = { location: { pathname: null } };

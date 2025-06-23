import { Polar } from "@polar-sh/sdk";

const getAccessToken = () => {
  return process.env.NODE_ENV === "production" 
    ? process.env.POLAR_ACCESS_TOKEN_PROD!
    : process.env.POLAR_ACCESS_TOKEN_SANDBOX!;
};

const getServer = () => {
  return process.env.NODE_ENV === "production" ? "production" : "sandbox";
};

export const polar = new Polar({
  accessToken: getAccessToken(),
  server: getServer(),
});

export { getAccessToken, getServer }; 
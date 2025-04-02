export type ProxyConfig = {
  baseUrl: string;
  // apiKey: string;
};

export const proxy = {
  baseUrl: String(process.env.PROXY_URL),
  // apiKey: String(process.env.PROXY_API_KEY),
};

export const config = {
  urlForIp: String(process.env.URL_FOR_IP),
};

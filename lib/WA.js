import axios from "axios";

export default async (opts) => {
  if (!opts.apikey) return console.log("No API key provided");
  if (!opts.application_key) return console.log("No application key provided");

  const instance = axios.create({
    baseURL: "https://www.worldanvil.com/api/aragorn",
    headers: {
      "x-auth-token": opts.apikey,
      "x-application-key": opts.application_key,
      "Content-Type": "application/json",
      "User-Agent":
        "WorldAnvilNative ( https://github.com/zuedev/WorldAnvilNative, 0.0.0 )",
    },
  });

  if (opts.method === "GET") {
    if (!opts.url) return console.log("No URL provided");
    const res = await instance.get(opts.url);
    return res.data;
  }
};

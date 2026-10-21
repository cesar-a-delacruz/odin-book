import requestHandler from "@/handlers/requestHandler";

let cache = new Map();

export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, requestHandler.get(url));
  }
  return cache.get(url);
}

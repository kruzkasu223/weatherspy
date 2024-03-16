export const fetcher = async <T>(
  url: string,
  init?: RequestInit | undefined
) => {
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error((await response?.json())?.message)
  }
  return response.json() as T
}

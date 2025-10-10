// src/api/opentdbCategories.ts
// Fetches quiz categories (groups) from OpenTDB

export type OpenTDBCategory = {
  id: number;
  name: string;
};

export async function fetchOpenTDBCategories(): Promise<OpenTDBCategory[]> {
  const res = await fetch('https://opentdb.com/api_category.php');
  const data = await res.json();
  return data.trivia_categories;
}

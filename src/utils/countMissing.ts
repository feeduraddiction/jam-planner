import { Song } from "@/app/page";

export const countMissing = (song: Song) => {
  let missing = 0;
  for (const key in song.instruments) {
    const entry = song.instruments[key as keyof typeof song.instruments];
    if (entry === "") missing++;
  }
  return missing;
}
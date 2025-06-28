// /components/SongTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { type Song } from "@/app/page";
import { countMissing } from "@/utils/countMissing";

const instrumentLabels: Record<string, string> = {
  guitar: "🎸",
  secondGuitar: "🎸2",
  bass: "🎸b",
  keys: "🎹",
  drums: "🥁",
};

export default function SongTable({ songs }: { songs: Song[] }) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>🎤</TableCell>
            <TableCell>Песня</TableCell>
            {Object.entries(instrumentLabels).map(([key, emoji]) => (
              <TableCell key={key}>{emoji}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song, index) => {
            const missing = countMissing(song);
            const bgColor =
              missing === 1 ? "#fff8e1" : missing > 1 ? "#ffebee" : "#cbe4d6";

            return (
              <TableRow key={index} sx={{ backgroundColor: bgColor }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{song.vocalist}</TableCell>
                <TableCell>
                  {song.youtubeLink ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={song.youtubeLink}
                    >
                      {song.song}
                    </a>
                  ) : (
                    song.song
                  )}
                </TableCell>
                {Object.keys(instrumentLabels).map((key) => {
                  const val =
                    song.instruments[key as keyof Song["instruments"]];
                  return (
                    <TableCell key={key}>
                      {val !== undefined ? (val === "" ? "—" : val) : ""}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

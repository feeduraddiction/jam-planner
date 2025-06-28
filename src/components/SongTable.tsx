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

const instrumentLabels: Record<keyof Song["instruments"], string> = {
  guitar: "🎸",
  secondGuitar: "🎸2",
  bass: "🎵",
  drums: "🥁",
  keys: "🎹",
};

export default function SongTable({ songs }: { songs: Song[] }) {
  const countMissing = (song: Song) => {
    let missing = 0;
    for (const key in song.instruments) {
      const instr = song.instruments[key as keyof typeof song.instruments];
      if (instr.required && !instr.name) missing++;
    }
    return missing;
  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>🎤</TableCell>
            <TableCell>Песня</TableCell>
            <TableCell>🔗</TableCell>
            {Object.entries(instrumentLabels).map(([key, emoji]) => (
              <TableCell key={key}>{emoji}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song, index) => {
            const missing = countMissing(song);
            const bgColor =
              missing === 1 ? "#fff8e1" : missing > 1 ? "#ffebee" : undefined;

            return (
              <TableRow key={index} sx={{ backgroundColor: bgColor }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{song.vocalist}</TableCell>
                <TableCell>{song.song}</TableCell>
                <TableCell>
                  {song.youtubeLink ? (
                    <a
                      href={song.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ссылка
                    </a>
                  ) : (
                    "—"
                  )}
                </TableCell>
                {Object.keys(instrumentLabels).map((key) => (
                  <TableCell key={key}>
                    {song.instruments[key as keyof Song["instruments"]].name ||
                      "—"}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

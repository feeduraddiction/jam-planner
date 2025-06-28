// /components/SongCards.tsx
import { Card, CardContent, Typography, Box } from "@mui/material";
import { type Song } from "@/app/page";

const instrumentLabels: Record<keyof Song["instruments"], string> = {
  guitar: "🎸",
  secondGuitar: "🎸2",
  bass: "🎵",
  drums: "🥁",
  keys: "🎹",
};

export default function SongCards({ songs }: { songs: Song[] }) {
  const countMissing = (song: Song) => {
    let missing = 0;
    for (const key in song.instruments) {
      const instr = song.instruments[key as keyof typeof song.instruments];
      if (instr.required && !instr.name) missing++;
    }
    return missing;
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {songs.map((song, index) => {
        const missing = countMissing(song);
        const bgColor =
          missing === 1 ? "#fff8e1" : missing > 1 ? "#ffebee" : undefined;

        return (
          <Card
            key={index}
            variant="outlined"
            sx={{ backgroundColor: bgColor }}
          >
            <CardContent>
              <Typography variant="h6">№ {index + 1}</Typography>

              <Typography variant="h6">{song.song}</Typography>
              <Typography variant="subtitle2" gutterBottom>
                🎤 {song.vocalist}
              </Typography>
              {song.youtubeLink && (
                <Typography variant="body2">
                  <a
                    href={song.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ссылка на видео
                  </a>
                </Typography>
              )}
              <Box mt={1}>
                {Object.entries(instrumentLabels).map(([key, emoji]) => (
                  <Typography variant="body2" key={key}>
                    {emoji}:{" "}
                    {song.instruments[key as keyof Song["instruments"]].name ||
                      "—"}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}

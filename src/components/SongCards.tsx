import { Card, CardContent, Typography, Box } from "@mui/material";
import { type Song } from "@/app/page";
import { countMissing } from "@/utils/countMissing";

const instrumentLabels: Record<string, string> = {
  guitar: "🎸",
  secondGuitar: "🎸2",
  bass: "🎸b",
  keys: "🎹",
  drums: "🥁",
};

export default function SongCards({ songs }: { songs: Song[] }) {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {songs.map((song, index) => {
        const missing = countMissing(song);
        const bgColor =
          missing === 1 ? "#fff8e1" : missing > 1 ? "#ffebee" : "#cbe4d6";

        return (
          <Card
            key={index}
            variant="outlined"
            sx={{ backgroundColor: bgColor }}
          >
            <CardContent>
              <Typography variant="h6">№ {index + 1}</Typography>
              <Typography variant="h6">
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
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                🎤 {song.vocalist}
              </Typography>
              <Box mt={1}>
                {Object.entries(instrumentLabels).map(([key, emoji]) =>
                  key in song.instruments ? (
                    <Typography variant="body2" key={key}>
                      {emoji}:{" "}
                      {song.instruments[key as keyof Song["instruments"]] === ""
                        ? "—"
                        : song.instruments[key as keyof Song["instruments"]]}
                    </Typography>
                  ) : null
                )}
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}

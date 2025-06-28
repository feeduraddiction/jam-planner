"use client";

import { useState, useEffect } from "react";
import { Container, Tabs, Tab, Box, Typography } from "@mui/material";
import SongTable from "@/components/SongTable";
import SongCards from "@/components/SongCards";

export interface InstrumentEntry {
  name: string;
  required: boolean;
}

export interface Song {
  song: string;
  vocalist: string;
  youtubeLink: string;
  instruments: {
    guitar: InstrumentEntry;
    secondGuitar: InstrumentEntry;
    bass: InstrumentEntry;
    drums: InstrumentEntry;
    keys: InstrumentEntry;
  };
}

function getClosestSunday(): string {
  const now = new Date();
  const day = now.getDay();
  const distance = day === 0 ? 0 : 7 - day;
  now.setDate(now.getDate() + distance);
  return now.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function SongsPage() {
  const [view, setView] = useState("table");
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetch("/data/songs.json")
      .then((res) => res.json())
      .then((data) => setSongs(data.songs));
  }, []);

  const date = getClosestSunday();

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Jam Session {date}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Всего песен: {songs.length}
      </Typography>
      <Tabs value={view} onChange={(e, val) => setView(val)}>
        <Tab label="Таблица" value="table" />
        <Tab label="Карточки" value="cards" />
      </Tabs>

      <Box mt={4}>
        {view === "table" ? (
          <SongTable songs={songs} />
        ) : (
          <SongCards songs={songs} />
        )}
      </Box>
    </Container>
  );
}

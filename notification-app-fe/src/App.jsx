import { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

function App() {
  const [notifications] = useState([
    {
      ID: "1",
      Type: "Placement",
      Message: "Marvell Technology Inc. hiring",
      Timestamp: "2026-06-22 21:02:16",
      priorityScore: 100,
    },
    {
      ID: "2",
      Type: "Placement",
      Message: "PayPal Holdings Inc. hiring",
      Timestamp: "2026-06-22 22:59:27",
      priorityScore: 98,
    },
    {
      ID: "3",
      Type: "Result",
      Message: "mid-sem",
      Timestamp: "2026-06-22 11:32:03",
      priorityScore: 80,
    },
    {
      ID: "4",
      Type: "Result",
      Message: "project-review",
      Timestamp: "2026-06-22 16:01:37",
      priorityScore: 78,
    },
    {
      ID: "5",
      Type: "Event",
      Message: "Hackathon Registration Open",
      Timestamp: "2026-06-23 09:00:00",
      priorityScore: 60,
    },
  ]);

  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(5);

  const filteredNotifications = notifications
    .filter((item) =>
      filter ? item.Type === filter : true
    )
    .slice(0, Number(limit));

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Campus Notifications
      </Typography>

      <TextField
        label="Top N"
        type="number"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        sx={{ mr: 2, mb: 2 }}
      />

      <FormControl sx={{ minWidth: 200, mb: 2 }}>
        <InputLabel>Filter</InputLabel>

        <Select
          value={filter}
          label="Filter"
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>

      {filteredNotifications.map((item) => (
        <Card key={item.ID} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {item.Message}
            </Typography>

            <Typography>
              Type: {item.Type}
            </Typography>

            <Typography>
              Time: {item.Timestamp}
            </Typography>

            <Typography>
              Priority: {item.priorityScore}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default App;
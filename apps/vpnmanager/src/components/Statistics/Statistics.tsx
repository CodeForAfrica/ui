import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { Section } from "@commons-ui/core";

import formatDateTime from "@/vpnmanager/utils/formatDate";

interface Data {
  ID: number;
  userId: string;
  usage: number;
  date: string;
  cumulativeData: number;
  email: string;
  createdAt: string;
}

interface Props {
  data: Data[];
}

const Statistics: React.FC<Props> = ({ data }) => {
  const [filters, setFilters] = useState({
    ID: "",
    userId: "",
    email: "",
    dateStart: "",
    dateEnd: "",
  });

  // Update filter values
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <TableContainer component={Paper}>
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
        <Box style={{ display: "flex", gap: "16px", padding: "16px" }}>
          <TextField
            label="ID"
            name="ID"
            variant="outlined"
            value={filters.ID}
            onChange={handleFilterChange}
          />
          <TextField
            label="User ID"
            name="userId"
            variant="outlined"
            value={filters.userId}
            onChange={handleFilterChange}
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            value={filters.email}
            onChange={handleFilterChange}
          />
          <TextField
            label="Date Start"
            name="dateStart"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={filters.dateStart}
            onChange={handleFilterChange}
          />
          <TextField
            label="Date End"
            name="dateEnd"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={filters.dateEnd}
            onChange={handleFilterChange}
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                User ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Usage</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                Total Usage(30 days)
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.ID}>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell>{row.usage}</TableCell>
                  <TableCell>{formatDateTime(row.date)}</TableCell>
                  <TableCell>{row.cumulativeData}</TableCell>
                  <TableCell>
                    {formatDateTime(row.createdAt, { includeTime: true })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Section>
    </TableContainer>
  );
};

export default Statistics;

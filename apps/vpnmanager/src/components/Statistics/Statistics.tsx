import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Grid,
  Button,
  TablePagination,
} from "@mui/material";
import { Section } from "@commons-ui/core";
import { useRouter } from "next/router";

import formatDateTime from "@/vpnmanager/utils/formatDate";
import { fetchJson } from "@/vpnmanager/utils";

export interface Data {
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

const Statistics: React.FC<Props> = ({ data: result }) => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    ID: router.query.ID || "",
    userId: router.query.userId || "",
    email: router.query.email || "",
    "date.start": router.query["date.start"] || "",
    "date.end": router.query["date.end"] || "",
    date: router.query.date,
    orderBy: "date DESC",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState(result);
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
  useEffect(() => {
    (async () => {
      try {
        const params: any = {};
        Object.keys(filters).forEach((key) => {
          if (filters[key as keyof typeof filters]) {
            params[key] = filters[key as keyof typeof filters];
          }
        });
        const res = await fetchJson.get("/api/statistics", {
          params: params as Record<string, string>,
        });
        setData(res || []);
      } catch (error) {}
    })();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    const params: any = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key as keyof typeof filters]) {
        params[key] = filters[key as keyof typeof filters];
      }
    });

    if (Object.keys(params).length) {
      router.push(
        {
          pathname: router.pathname,
          query: params,
        },
        undefined,
        { shallow: true },
      );
    }
  };

  useEffect(() => {
    setFilters({
      ID: router.query.ID || "",
      userId: router.query.userId || "",
      email: router.query.email || "",
      "date.start": router.query["date.start"] || "",
      "date.end": router.query["date.end"] || "",
      orderBy: "date DESC",
      date: router.query.date,
    });
  }, [router.query]);

  return (
    <TableContainer component={Paper}>
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="ID"
              name="ID"
              variant="outlined"
              value={filters.ID}
              onChange={handleFilterChange}
              placeholder="ID"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Date"
              name="date"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              value={filters["date"]}
              onChange={handleFilterChange}
              placeholder="Date Start"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="User ID"
              name="userId"
              variant="outlined"
              value={filters.userId}
              onChange={handleFilterChange}
              placeholder="User ID"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              value={filters.email}
              onChange={handleFilterChange}
              placeholder="Email"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Date Start"
              name="date.start"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              value={filters["date.start"]}
              onChange={handleFilterChange}
              placeholder="Date Start"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Date End"
              name="date.end"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              value={filters["date.end"]}
              onChange={handleFilterChange}
              size="small"
              placeholder="Date End"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button onClick={applyFilters} size="small" variant="contained">
              Apply Filters
            </Button>
          </Grid>
        </Grid>

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
            {paginatedData?.length > 0 ? (
              paginatedData.map((row) => (
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
        {data.length ? (
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(
              event: React.ChangeEvent<HTMLInputElement>,
            ) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            sx={{ alignItems: "center", "*": { m: 0, gap: 2 } }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        ) : null}
      </Section>
    </TableContainer>
  );
};

export default Statistics;

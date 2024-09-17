import React, { useEffect, useRef, useState } from "react";
import {
  Box,
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

import formatDateTime, { formatDate } from "@/vpnmanager/utils/formatDate";
import { fetchJson, formatBytes } from "@/vpnmanager/utils";
import { Link } from "@commons-ui/next";

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
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const [filters, setFilters] = useState({
    ID: router.query.ID || "",
    userId: router.query.userId || "",
    email: router.query.email || "",
    "date.start": router.query["date.start"] || "",
    "date.end": router.query["date.end"] || "",
    date: router.query.date || formatDate(yesterday),
    orderBy: "date DESC",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rawData, setData] = useState(result);
  const data = rawData.map((d) => ({
    ...d,
    cumulativeData: formatBytes(d.cumulativeData),
    usage: formatBytes(d.usage),
  }));
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
  useEffect(() => {
    (async () => {
      try {
        const params: Partial<Record<keyof typeof filters, string>> =
          Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => Boolean(value)),
          );
        const res = await fetchJson.get("/api/statistics", {
          params,
        });
        setData(res || []);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    const params: Partial<Record<keyof typeof filters, string>> =
      Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => Boolean(value)),
      );

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
    setFilters((initial) => ({
      ...initial,
      ID: router.query.ID || "",
      userId: router.query.userId || "",
      email: router.query.email || "",
      "date.start": router.query["date.start"] || "",
      "date.end": router.query["date.end"] || "",
      orderBy: "date DESC",
    }));
  }, [router.query]);

  const exportRef = useRef();

  function exportAsCsv() {
    const csvHeaders = [
      "ID",
      "User ID",
      "Email",
      "Usage",
      "Date",
      "Cumulative Data",
      "Created At",
    ];

    const csvRows = data.map((row) =>
      [
        row.ID,
        row.userId,
        row.email,
        row.usage,
        row.date,
        row.cumulativeData,
        row.createdAt,
      ].join(","),
    );

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    if (exportRef.current) {
      exportRef.current?.setAttribute("href", URL.createObjectURL(blob));
    }
  }

  exportAsCsv();

  return (
    <TableContainer component={Paper}>
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              name="ID"
              variant="outlined"
              value={filters.ID}
              InputLabelProps={{ shrink: true }}
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
              name="userId"
              variant="outlined"
              value={filters.userId}
              onChange={handleFilterChange}
              InputLabelProps={{ shrink: true }}
              placeholder="User ID"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              name="email"
              variant="outlined"
              value={filters.email}
              onChange={handleFilterChange}
              InputLabelProps={{ shrink: true }}
              placeholder="Email"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
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
            <Button
              sx={{ width: "100%" }}
              onClick={applyFilters}
              size="small"
              variant="contained"
            >
              Apply Filters
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link
              target="_blank"
              ref={exportRef}
              href={"#"}
              download="statistics.csv"
            >
              <Button sx={{ width: "100%" }} size="small" variant="contained">
                Export as CSV
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Box sx={{ width: "100%", overflowX: "auto" }}>
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
        </Box>
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

"use client";
import React, { MouseEvent, ChangeEvent, Fragment, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  TablePagination,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { RichTypography } from "@commons-ui/core";
import Header from "@/outline-vpn/app/components/Header";
import { CheckBox } from "@mui/icons-material";
import { GoogleUser, User } from "@/outline-vpn/app/types";

const options: string[] = ["Resend VPN", "Generate new key", "Disable VPN"];

interface Props {
  users: User[];
  header: GoogleUser;
}
export default function Dashboard(props: Props): JSX.Element {
  const { users: rows, header } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Header {...header} />
      <Box
        sx={{
          margin: "auto",
          maxWidth: "1440px",
          width: "100%",
          my: 8,
          px: { xs: 3, sm: 5, md: 8 },
        }}
      >
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <CheckBox />
                </TableCell>
                <TableCell>
                  <RichTypography color="inherit" variant="h6">
                    Name
                  </RichTypography>
                </TableCell>
                <TableCell>
                  <RichTypography color="inherit" variant="h6">
                    Email
                  </RichTypography>
                </TableCell>
                <TableCell>
                  <RichTypography color="inherit" variant="h6">
                    Last VPN Key Sent Date
                  </RichTypography>
                </TableCell>
                <TableCell>
                  <RichTypography color="inherit" variant="h6">
                    Status
                  </RichTypography>
                </TableCell>
                <TableCell>
                  <RichTypography color="inherit" variant="h6">
                    Action
                  </RichTypography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <CheckBox />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.lastVpnKeySentDate}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    sx={{ margin: 0 }}
                    key={option}
                    onClick={handleClose}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 8, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Fragment>
  );
}

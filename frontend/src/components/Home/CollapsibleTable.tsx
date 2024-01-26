import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { propertySchema } from "../../schemas/property";
import { z } from "zod";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Delete, Edit } from "@mui/icons-material";
import { convertToReal } from "../../lib/format";
import { useProperties } from "../../hooks/useProperties";

export type propertySchemaData = z.infer<typeof propertySchema>;

type RowProps = { row: propertySchemaData };

function Row({ row }: RowProps) {
  const { mutateAsyncDeleteProperty } = useProperties();
  const [open, setOpen] = React.useState(false);

  const handleClickDelete = (id: number) => mutateAsyncDeleteProperty(id);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="center">
          {row.sold ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="error" />
          )}
        </TableCell>
        <TableCell align="center">{row.size}</TableCell>
        <TableCell align="center">{convertToReal.format(row.value)}</TableCell>
        <TableCell align="center">
          <IconButton>
            <Edit color="primary" />
          </IconButton>
          <IconButton onClick={() => handleClickDelete(row.id)}>
            <Delete color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Endereço
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Rua</TableCell>
                    <TableCell align="left">Número</TableCell>
                    <TableCell align="left">CEP</TableCell>
                    <TableCell align="left">Cidade</TableCell>
                    <TableCell align="center">Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.address.id}>
                    <TableCell>{row.address.street}</TableCell>
                    <TableCell>{row.address.number}</TableCell>
                    <TableCell>{row.address.zipCode}</TableCell>
                    <TableCell align="left">{row.address.city}</TableCell>
                    <TableCell align="center">{row.address.state}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CollapsibleTable = ({
  properties,
}: {
  properties?: propertySchemaData[];
}) => {
  return (
    <Box
      maxWidth="lg"
      sx={{
        padding: 0,
        marginX: "auto",
        width: "100%",
      }}
    >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Titulo</TableCell>
              <TableCell align="center">Vendido</TableCell>
              <TableCell align="center">Tamanho</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties?.map((property) => (
              <Row key={property.id} row={property} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export { CollapsibleTable };

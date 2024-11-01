import { useState } from "react";
import { useParams } from "react-router-dom";
import { data } from "../shared/ListOfOrchids";
import {
  Button,
  Divider,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import ModalCase from "./ModalCase";

export default function OrchidDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const abc = useParams();
  const orchid = data.find((obj) => {
    return obj.id == abc.id;
  });

  return (
    <div style={{ padding: "10px 10px" }}>
      <Grid2 container spacing={2}>
        <Grid2 size={3}>
          <img src={orchid.image} alt={orchid.orchidName} style={{ width: "100%" }} />
        </Grid2>
        <Grid2 size={9}>
          <Typography variant="h4" color="#4caf50">
            {orchid.orchidName}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h5" color="#ffeb3b">
            ${orchid.price}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody sx={{ fontSize: "1.1em" }}>
                <TableRow>
                  <TableCell>
                    <Typography variant="caption" color="primary">
                      Is Natural:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="primary">
                      {orchid.isNatural ? "Yes" : "No"}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography variant="caption" color="primary">
                      Is Attractive:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="primary">
                      {orchid.isAttractive ? "Yes" : "No"}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography variant="caption" color="primary">
                      Details:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="primary">
                      {orchid.description}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography variant="caption" color="primary">
                      Shipping:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="primary">
                      Calculated At Checkout
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>
      </Grid2>

      <Grid2 maxWidth="sm">
        <a onClick={() => setIsOpen(true)}>
          <Button variant="outlined">View in clip</Button>
        </a>
        {isOpen && <ModalCase setIsOpen={setIsOpen} orchid={orchid} />}
      </Grid2>
    </div>
  );
}

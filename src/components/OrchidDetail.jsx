import { useState } from "react";
import { useParams } from "react-router-dom";
import { data } from "../shared/ListOfOrchids";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import ModalCase from "./ModalCase";
import CloseIcon from "@mui/icons-material/Close";

export default function OrchidDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const orchid = data.find((obj) => obj.id == id);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#e0f2f1", minHeight: "100vh" }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card elevation={6} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={orchid.image}
              alt={orchid.orchidName}
              sx={{ height: 400, objectFit: "cover", transition: "transform 0.5s", '&:hover': { transform: 'scale(1.05)' } }}
            />
            <CardContent>
              <Typography variant="h4" color="#00796b" fontWeight="bold" gutterBottom>
                {orchid.orchidName}
              </Typography>
              <Typography variant="h5" color="#d32f2f" fontWeight="bold">
                ${orchid.price.toFixed(2)}
              </Typography>
              <Box mt={2}>
                <Chip label={orchid.isNatural ? "Natural" : "Not Natural"} color={orchid.isNatural ? "success" : "default"} sx={{ marginRight: 1 }} />
                <Chip label={orchid.isAttractive ? "Attractive" : "Not Attractive"} color={orchid.isAttractive ? "warning" : "default"} />
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                <strong>Details:</strong> {orchid.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <strong>Shipping:</strong> Calculated At Checkout
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsOpen(true)}
          sx={{ borderRadius: 20, paddingX: 4 }}
        >
          View in Clip
        </Button>
      </Box>

      {isOpen && (
        <Paper
          elevation={8}
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 2,
            zIndex: 1000,
            maxWidth: 600,
            width: "100%",
          }}
        >
          <IconButton
            onClick={() => setIsOpen(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <ModalCase setIsOpen={setIsOpen} orchid={orchid} />
        </Paper>
      )}
    </Box>
  );
}

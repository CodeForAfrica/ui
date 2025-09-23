import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import {
  Typography,
  Box,
  TextField,
  Grid2 as Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import React, { forwardRef } from "react";

// eslint-disable-next-line import/no-unresolved
import CheckIcon from "@/trustlab/assets/check-circle.svg?url";
// eslint-disable-next-line import/no-unresolved
import ErrorPageIcon from "@/trustlab/assets/error-page-icon.svg?url";

const ErrorPage = forwardRef(function ErrorPage(props, ref) {
  const { title, subtitle, form, image, link, ...other } = props;
  const [formValues, setFormValues] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/v1/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        form: form?.id,
        ...formValues,
      }),
    });
    const data = await res.json();
    setOpen(true);
    setFormValues({});
    return data;
  };
  return (
    <Section
      ref={ref}
      {...other}
      sx={{
        py: 8,
        textAlign: "center",
        margin: "0 auto",
        px: { xs: 2.5, md: 0 },
      }}
    >
      <Dialog
        sx={{ borderRadius: 16 }}
        open={open}
        onClose={() => setOpen(false)}
        placement="center"
      >
        <DialogContent sx={{ width: "400px" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              backgroundColor: "#DCFAE6",
              mb: 1,
            }}
          >
            <Figure
              ImageProps={{
                src: CheckIcon,
              }}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                height: 20,
                width: 20,
                padding: "14px",
              }}
            />
          </Box>
          <LexicalRichText
            elements={form?.confirmationMessage}
            TypographyProps={{
              gutterBottom: true,
              sx: {
                mb: 0,
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 4,
              height: 58,
              backgroundColor: "#252B37",
              textTransform: "none",
              border: "none",
              "&:hover": {
                backgroundColor: "#1F2937",
                border: "none",
              },
              width: "100%",
              mb: 1,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{ maxWidth: 600, margin: "0 auto" }}
        gap={2.5}
      >
        <Figure
          ImageProps={{
            alt: "Error page background",
            src: image?.url ?? ErrorPageIcon,
            sx: { objectFit: "cover", opacity: 0.3 },
          }}
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            height: 128,
            width: 172,
          }}
        />
        <Typography strong variant="display4">
          {title}
        </Typography>
        <LexicalRichText
          elements={subtitle}
          TypographyProps={{
            gutterBottom: true,
            sx: {
              mb: 0,
            },
          }}
        />
        <Grid
          component="form"
          onSubmit={onSubmit}
          container
          spacing={1}
          sx={{ width: "100%" }}
        >
          <Grid sx={{ flex: 1 }} size={{ xs: 12, md: 9 }}>
            {form?.fields?.map((formField) => {
              return (
                <TextField
                  key={formField.name}
                  type={formField.blockType}
                  placeholder={formField.label}
                  fullWidth
                  onChange={onChange}
                  name={formField.name}
                  value={formValues[formField.name] || ""}
                  required={formField.required}
                  {...(formField.blockType === "email" && {
                    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                    title: "Please enter a valid email address",
                  })}
                  sx={{
                    mb: 1,
                    width: "100%",
                    flex: 1,
                    borderColor: "#5D5E61",
                    backgroundColor: "#ebecf0",
                    borderRadius: 8,
                  }}
                />
              );
            })}
          </Grid>
          <Grid sx={{ width: "100%" }} size={{ xs: 12, md: 3 }}>
            <Button
              sx={{
                borderRadius: 4,
                height: 58,
                backgroundColor: "#252B37",
                textTransform: "none",
                border: "none",
                "&:hover": {
                  backgroundColor: "#1F2937",
                  border: "none",
                },
                mb: 1,
                width: { xs: "100%", md: "100%" },
              }}
              variant="contained"
              color="primary"
              type="submit"
            >
              {form.submitButtonLabel}
            </Button>
          </Grid>
        </Grid>
        <Button
          component={link?.href ? Link : undefined}
          href={link?.href}
          variant="text"
          sx={{
            textTransform: "none",
            border: "none",
            backgroundColor: "transparent",
            color: "#1020E1",
          }}
        >
          {link.label}
        </Button>
      </Box>
    </Section>
  );
});

export default ErrorPage;

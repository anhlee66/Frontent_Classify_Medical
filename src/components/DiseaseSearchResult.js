import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

const SearchResult = ({ results }) => {
  const diseaseInfo = results;

  const extractVietnameseName = (label) => {
    const match = label.match(/\(([^)]+)\)/);
    return match ? match[1] : label;
  };

  return (
    <Box>
      {diseaseInfo && (
        <Box sx={{ padding: 2 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box width={700}>
              <Card>
                <div style={{ justifyItems: "center" }}>
                  <Typography marginTop={3} align="center" variant="h5">
                    {diseaseInfo.name}
                  </Typography>
                  <Typography align="center" variant="subtitle1">
                    {extractVietnameseName(diseaseInfo.label)}
                  </Typography>
                </div>
                {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
                <CardContent>
                  <Typography variant="h6">Thông tin:</Typography>
                  <Typography paragraph variant="body1" color="text.secondary">
                    {diseaseInfo.concept}
                  </Typography>
                  <Typography variant="h6">Nguyên nhân:</Typography>
                  <Typography paragraph variant="body1" color="text.secondary">
                    {diseaseInfo.reason}
                  </Typography>
                  <Typography variant="h6">Triệu chứng:</Typography>
                  <Typography paragraph variant="body1" color="text.secondary">
                    {diseaseInfo.symptom}
                  </Typography>
                  <Typography variant="h6">Di chứng:</Typography>
                  <Typography paragraph variant="body1" color="text.secondary">
                    {diseaseInfo.consequence}
                  </Typography>
                  <Typography variant="h6">Loại bệnh:</Typography>
                  <Typography paragraph variant="body1" color="text.secondary">
                    {diseaseInfo.type}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default SearchResult;

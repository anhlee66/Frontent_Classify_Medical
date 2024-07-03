import { Box } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import React from "react";

const SearchResult = ({ results }) => {
  const [expanded, setExpanded] = React.useState(true);
  //   const [searchResults, setSearchResults] = useState([]);
  // const [selectedDiseaseIndex, setSelectedDiseaseIndex] = useState(0);

  const diseaseInfo = results;

  // const ExpandMore = styled((props) => {
  //   const { expand, ...other } = props;
  //   return <IconButton {...other} />;
  // })(({ theme, expand }) => ({
  //   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  //   marginLeft: "auto",
  //   transition: theme.transitions.create("transform", {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  // }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const extractVietnameseName = (label) => {
    const match = label.match(/\(([^)]+)\)/);
    return match ? match[1] : label;
  };

  // const handlePreviousClick = () => {
  //   setSelectedDiseaseIndex((prevIndex) =>
  //     prevIndex > 0 ? prevIndex - 1 : prevIndex
  //   );
  // };

  // const handleNextClick = () => {
  //   setSelectedDiseaseIndex((prevIndex) =>
  //     prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex
  //   );
  // };

  // const diseaseInfo = searchResults[selectedDiseaseIndex];

  return (
    <Box>
      {diseaseInfo && (
        <Box bgcolor="#efeff0" sx={{ padding: 2 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // maxWidth: "500",
            }}
          >
            {/* {searchResults.length > 1 && (
              <div
                style={{
                  display: "flex",
                  marginRight: 10,
                  backgroundColor: "#d9d9d9",
                  borderRadius: 5,
                }}
              >
                <Button onClick={handlePreviousClick}>Previous</Button>
              </div>
            )} */}
            <Box width={700}>
              <Card>
                <div style={{ justifyItems: "center" }}>
                  <Typography marginTop={3} align="center" variant="h5">
                    {diseaseInfo.name}
                  </Typography>
                  <Typography align="center" variant="subtitle1">
                    {extractVietnameseName(diseaseInfo.label)}
                  </Typography>
                  {/* <CardHeader
                    title={diseaseInfo.name}
                    subheader={extractVietnameseName(diseaseInfo.label)}
                  /> */}
                </div>
                {/* <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions> */}
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography variant="h6">Thông tin:</Typography>
                    <Typography
                      paragraph
                      variant="body1"
                      color="text.secondary"
                    >
                      {diseaseInfo.concept}
                    </Typography>
                    <Typography variant="h6">Nguyên nhân:</Typography>
                    <Typography
                      paragraph
                      variant="body2"
                      color="text.secondary"
                    >
                      {diseaseInfo.reason}
                    </Typography>
                    <Typography variant="h6">Triệu chứng:</Typography>
                    <Typography
                      paragraph
                      variant="body2"
                      color="text.secondary"
                    >
                      {diseaseInfo.symptom}
                    </Typography>
                    <Typography variant="h6">Di chứng:</Typography>
                    <Typography
                      paragraph
                      variant="body2"
                      color="text.secondary"
                    >
                      {diseaseInfo.consequence}
                    </Typography>
                    <Typography variant="h6">Loại bệnh:</Typography>
                    <Typography
                      paragraph
                      variant="body2"
                      color="text.secondary"
                    >
                      {diseaseInfo.type}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Box>
            {/* {searchResults.length > 1 && (
              <div
                style={{
                  display: "flex",
                  marginLeft: 10,
                  backgroundColor: "#d9d9d9",
                  borderRadius: 5,
                }}
              >
                <Button onClick={handleNextClick}>Next</Button>
              </div>
            )} */}
          </div>
        </Box>
      )}
    </Box>
  );
};

export default SearchResult;

import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Avatar,
  Button,
  ListGroup,
  ListGroupItem,
  LinearProgress,
  Box,
  Typography
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { useStateValue } from "../../StateProvider";

const DoctorDetails = ({ 
  doctorDetails: { 
    jobTitle, 
    performanceReportTitle, 
    performanceReportValue, 
    cmp, 
    area, 
    especialidad 
  } 
}) => {
  const [{ user }] = useStateValue();

  return (
    <Card sx={{ mb: 4, pt: 3 }}>
      <CardHeader
        title={`Dr. ${user?.displayName}`}
        subheader={jobTitle}
        avatar={<Avatar src={user?.photoURL} alt={user?.displayName} />}
        action={
          <Button 
            variant="outlined" 
            startIcon={<PersonAdd />} 
            size="small"
          >
            Follow
          </Button>
        }
      />
      <ListGroup>
        <ListGroupItem>
          <Box sx={{ my: 2 }}>
            <Typography variant="body2" color="textSecondary">
              {performanceReportTitle}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={performanceReportValue} 
            />
            <Typography variant="caption">
              {performanceReportValue}%
            </Typography>
          </Box>
        </ListGroupItem>
        <ListGroupItem>
          <Typography variant="body2" color="textSecondary">
            CMP
          </Typography>
          <Typography>{cmp}</Typography>
        </ListGroupItem>
        <ListGroupItem>
          <Typography variant="body2" color="textSecondary">
            Área
          </Typography>
          <Typography>{area}</Typography>
        </ListGroupItem>
        <ListGroupItem>
          <Typography variant="body2" color="textSecondary">
            Especialidad
          </Typography>
          <Typography>{especialidad}</Typography>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

DoctorDetails.propTypes = {
  doctorDetails: PropTypes.shape({
    jobTitle: PropTypes.string,
    performanceReportTitle: PropTypes.string,
    performanceReportValue: PropTypes.number,
    cmp: PropTypes.string,
    area: PropTypes.string,
    especialidad: PropTypes.string
  })
};

DoctorDetails.defaultProps = {
  doctorDetails: {
    jobTitle: "Physician",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    cmp: "12345",
    area: "Cardiología",
    especialidad: "Cardiólogo",
  }
};

export default DoctorDetails;

import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "@mui/material";
import { useStateValue } from "../../StateProvider";

const DoctorDetails = ({ doctorDetails }) => {
  const [{ user }] = useStateValue();

  return (
    <Card small className="mb-4 pt-3">
      <CardHeader className="border-bottom text-center">
        <div className="mb-3 mx-auto">
          <img
            className="rounded-circle"
            src={user?.photoURL}
            alt=""
            width="110"
          />
        </div>
        <h4 className="mb-0">Dr. {user?.displayName}</h4>
        <span className="text-muted d-block mb-2">{doctorDetails.jobTitle}</span>
        <Button pill outline size="sm" className="mb-2">
          <i className="material-icons mr-1">person_add</i> Follow
        </Button>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="px-4">
          <div className="progress-wrapper">
            <strong className="text-muted d-block mb-2">
              {doctorDetails.performanceReportTitle}
            </strong>
            <Progress
              className="progress-sm"
              value={doctorDetails.performanceReportValue}
            >
              <span className="progress-value">
                {doctorDetails.performanceReportValue}%
              </span>
            </Progress>
          </div>
        </ListGroupItem>
        <ListGroupItem className="p-4">
          <strong className="text-muted d-block mb-2">
            CMP
          </strong>
          <span>{doctorDetails.cmp}</span>
        </ListGroupItem>
        <ListGroupItem className="p-4">
          <strong className="text-muted d-block mb-2">
            Área
          </strong>
          <span>{doctorDetails.area}</span>
        </ListGroupItem>
        <ListGroupItem className="p-4">
          <strong className="text-muted d-block mb-2">
            Especialidad
          </strong>
          <span>{doctorDetails.especialidad}</span>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

DoctorDetails.propTypes = {
  /**
   * The doctor details object.
   */
  doctorDetails: PropTypes.object
};

DoctorDetails.defaultProps = {
  doctorDetails: {
    name: "Dr. Vivek Kumar Singh",
    avatar: require("./../../images/avatars/vivek.jpg"),
    jobTitle: "Physician",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    cmp: "12345",
    area: "Cardiología",
    especialidad: "Cardiólogo",
  }
};

export default DoctorDetails;

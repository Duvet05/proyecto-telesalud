import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PageTitle from "../../components/common/PageTitle";

import UserDetails from "../../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../../components/user-profile-lite/UserAccountDetails";

type Props = {};

const StaffPage = (props: Props) => {
  return (
    <div>
      <h1>Lista de Doctores</h1>
      <hr></hr>
      <Container className="main-content-container px-4">
        <Grid item xs={12}>
          <PageTitle
            title="Doctor's Profile"
            subtitle="Overview"
            className={"table1"}
          />
        </Grid>
        <Grid item xs={12}>
          <PageTitle
            title="Doctor's Profile"
            subtitle="Overview"
            className={"table2"}
          />
        </Grid>
      </Container>
    </div>
  );
};

export default StaffPage;

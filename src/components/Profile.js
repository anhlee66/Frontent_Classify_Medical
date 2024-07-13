import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const ProfileCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: "auto",
  marginTop: theme.spacing(5),
  padding: theme.spacing(3),
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: "auto",
  marginBottom: theme.spacing(2),
}));

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

const Profile = ({ userinfo }) => {
  return (
    <ProfileCard>
      <ProfileAvatar alt={userinfo.name} src={userinfo.avatar} />
      <CardContent>
        <Typography variant="h4" component="div" align="center" gutterBottom>
          {userinfo.name}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          gutterBottom
        >
          {userinfo.email}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ProfilePaper>
              <Typography variant="subtitle1" gutterBottom>
                Username
              </Typography>
              <Typography variant="body2">{userinfo.username}</Typography>
            </ProfilePaper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ProfilePaper>
              <Typography variant="subtitle1" gutterBottom>
                Gender
              </Typography>
              <Typography variant="body2">{userinfo.gender}</Typography>
            </ProfilePaper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ProfilePaper>
              <Typography variant="subtitle1" gutterBottom>
                Permission
              </Typography>
              <Typography variant="body2">{userinfo.permission}</Typography>
            </ProfilePaper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ProfilePaper>
              <Typography variant="subtitle1" gutterBottom>
                Created
              </Typography>
              <Typography variant="body2">{userinfo.created}</Typography>
            </ProfilePaper>
          </Grid>
        </Grid>
      </CardContent>
    </ProfileCard>
  );
};

export default Profile;

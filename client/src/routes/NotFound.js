import React from 'react';
import { Box, Typography, Button, Container, Paper, Grid, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import logo from "assets/images/healing.jpg"
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `linear-gradient(${theme.palette.primary.light}, ${theme.palette.primary.main}), url("https://www.transparenttextures.com/patterns/45-degree-fabric-light.png")`,
    backgroundBlendMode: 'overlay',
  },
  paper: {
    padding: theme.spacing(6),
    textAlign: 'center',
  },
  logo: {
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    marginBottom: theme.spacing(4),
  },
}));

const NotFound = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.root}>
      <Container maxWidth="xs">
        <Paper className={classes.paper} elevation={5}>
          <img className={classes.logo} src={logo} alt="하이힐링원"  style={{    width: "250px"}}/>
          <Typography variant="h3" className={classes.title} color="primary">
            404 NOT FOUND
          </Typography>
          <Typography variant="h5" className={classes.subtitle} color="textSecondary">
            페이지를 찾을 수 없습니다.

          </Typography>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <IconButton color="primary" onClick={() => navigate('/')}>
                <HomeIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                홈페이지로 돌아가기
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound;

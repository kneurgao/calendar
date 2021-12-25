import * as React from 'react';
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const hours = [
  '1 AM',
  '2 AM',
  '3 AM',
  '4 AM',
  '5 AM',
  '6 AM',
  '7 AM',
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
  '12 PM',
  '1 PM',
  '2 PM',
  '3 PM',
  '4 PM',
  '5 PM',
  '6 PM',
  '7 PM',
  '8 PM',
  '9 PM',
  '10 PM',
  '11 PM',
  '12 AM',
];

const WeekView = () => {
  return (
    <Container fixed>
      <Grid
        container
        columns={100}
        sx={{ position: 'sticky', background: '#fff', top: 0, zIndex: 1 }}
      >
        <Grid item xs={6}></Grid>
        <Divider orientation="vertical" flexItem></Divider>
        {weekdays.map((weekday) => {
          return (
            <>
              <Grid item xs={13}>
                <Typography
                  component={'div'}
                  style={{
                    margin: '5px 0',
                    fontSize: 12,
                    textAlign: 'center',
                    color: 'gray',
                  }}
                >
                  {weekday}
                </Typography>
                <Box
                  component="h4"
                  sx={{
                    bgcolor: 'primary.main',
                    width: 40,
                    height: 40,
                    lineHeight: '40px',
                    textAlign: 'center',
                    borderRadius: '50%',
                    margin: '10px auto',
                    color: '#fff',
                  }}
                >
                  10
                </Box>
                <Divider />
              </Grid>
              <Divider orientation="vertical" flexItem></Divider>
            </>
          );
        })}
      </Grid>
      <Grid container columns={100}>
        <Grid item xs={6}>
          <Paper sx={{ height: 10 }} elevation={0}></Paper>
          {hours.map((hour) => {
            return (
              <>
                <Paper sx={{ height: 10 }} elevation={0}></Paper>
                <Divider textAlign="left" style={{ marginTop: 9 }}>
                  <Typography
                    component={'span'}
                    style={{ fontSize: 12, color: 'gray' }}
                  >
                    {hour}
                  </Typography>
                </Divider>
              </>
            );
          })}
        </Grid>
        <Divider orientation="vertical" flexItem></Divider>
        {weekdays.map((weekday) => {
          return (
            <>
              <Grid item xs={13}>
                {hours.map((hour) => {
                  return (
                    <>
                      <Paper
                        elevation={0}
                        style={{ lineHeight: '40px', fontSize: 12 }}
                      >
                        {hour}
                      </Paper>
                      <Divider />
                    </>
                  );
                })}
              </Grid>
              <Divider orientation="vertical" flexItem></Divider>
            </>
          );
        })}
      </Grid>
    </Container>
  );
};

export default WeekView;

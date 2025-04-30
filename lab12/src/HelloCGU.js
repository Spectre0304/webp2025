import React from 'react';
// Material UI 核心組件
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

// Material UI 圖標
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';

// 定義樣式
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: theme.spacing(2),
  },
  title: {
    fontSize: '5rem',
    fontWeight: 'bold',
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
    },
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 36,
    color: '#4169E1',
    margin: theme.spacing(0, 2),
  },
}));

const HelloCGU = () => {
  // 使用樣式
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      {/* 主標題 */}
      <Typography variant="h1" className={classes.title}>
        hello CGU!!
      </Typography>
      
      {/* 圖標容器 */}
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        <Grid item>
          <Box textAlign="center">
            <ShoppingCartIcon className={classes.icon} />
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="center">
            <DeleteIcon className={classes.icon} />
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="center">
            <AlarmIcon className={classes.icon} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HelloCGU;
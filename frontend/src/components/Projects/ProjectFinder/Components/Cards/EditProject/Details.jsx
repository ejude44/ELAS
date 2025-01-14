import { Grid, Typography, makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Tooltip } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(30),
      height: theme.spacing(35),
    },
  },
  details: {
    fontWeight: 700,
    fontSize: 21,
  },
  det: {
    fontWeight: 400,
    fontSize: 13,

    lineHeight: 2,
  },
  detOptions: {
    fontWeight: 400,
    fontSize: 20,
  },
}));

export default function Details(props) {
  const classes = useStyles();
  const { value, handleOnEditDetailsClick } = props;

  return (
    <>
      <Grid container direction="column">
        <Paper className={classes.root}>
          <div style={{ padding: 10 }}>
            <Grid item>
              <Typography className={classes.details}>
                Details
                <Tooltip title="Click to Edit Details">
                  <EditOutlinedIcon
                    onClick={handleOnEditDetailsClick}
                    fontSize="small"
                    style={{ color: "#FF6500" }}
                  />
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.det}>faculty</Typography>
              <Typography className={classes.detOptions}>
                {value.faculty}
              </Typography>
              <Typography className={classes.det}>Maximum Team size</Typography>
              <Typography className={classes.detOptions}>
                {value.maxMembers}
              </Typography>
              <Typography className={classes.det}>Degree</Typography>
              <Typography className={classes.detOptions}>
                {value.degree}
              </Typography>
            </Grid>
          </div>
        </Paper>
      </Grid>
    </>
  );
}

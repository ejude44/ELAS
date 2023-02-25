import { Grid, Typography, makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Tooltip } from "@material-ui/core";
import { imgProject } from "../../../reuse/reuse";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      // width: theme.spacing(30),
      height: theme.spacing(35),
    },
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 400,
    fontSize: 21,
  },
}));

export default function Title(props) {
  const classes = useStyles();
  const { value, handleOnEditTitleClick } = props;

  return (
    <>
      <Grid container direction="column">
        <Paper className={classes.root}>
          <div style={{ padding: 4 }}>
            <img src={imgProject} height="70%" width="100%" alt="img" />

            <Grid item>
              <Typography className={classes.title} gutterBottom>
                {value.title}
                <span>
                  <Tooltip title="Click to Edit Title">
                    <EditOutlinedIcon
                      onClick={handleOnEditTitleClick}
                      fontSize="small"
                      style={{ color: "#FF6500" }}
                    />
                  </Tooltip>
                </span>
              </Typography>
            </Grid>
          </div>
        </Paper>
      </Grid>
    </>
  );
}

import { Typography, Grid } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../Cards/EditProject/Title';
import Details from '../Cards/EditProject/Details';
import DescriptionAndSkills from '../Cards/EditProject/DescriptionAndSkills';
import Discussion from '../Cards/EditProject/Discussion';

import EditTitle from '../Popup/EditProject/EditTitle';

import EditDetails from '../Popup/EditProject/EditDetails';
import EditDescSkills from '../Popup/EditProject/EditDescSkills';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    display: 'block',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(100),

      // height: theme.spacing(20),
    },
  },
  grid: {
    //   border: '1px solid grey',
    borderRadius: 5,

    margin: 0,
  },
  span: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'right',
  },
  Typography: {
    subtitle1: {
      fontweight: 'bold',
    },
  },
}));

export default function ProjectDetails({
  value,
  handleClose,
  open,
  handleSave,
  setValue,
  handleOnEditTitleClick,
  handleOnEditDetailsClick,
  handleOnEditDescSkillsClick,
  id,
}) {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <div style={{ padding: 20 }}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6} className={classes.grid}>
            <Title
              value={value}
              handleClose={handleClose}
              open={open}
              handleOnEditTitleClick={handleOnEditTitleClick}
            />

            <EditTitle
              open={open}
              handleClose={handleClose}
              value={value}
              handleSave={handleSave}
              setValue={setValue}
            />
          </Grid>

          <Grid item xs={6} className={classes.grid}>
            <Details
              value={value}
              handleClose={handleClose}
              open={open}
              handleOnEditDetailsClick={handleOnEditDetailsClick}
            />

            <EditDetails
              value={value}
              handleClose={handleClose}
              open={open}
              handleSave={handleSave}
              setValue={setValue}
            />
          </Grid>

          <Grid item xs={6} className={classes.grid}>
            <DescriptionAndSkills
              value={value}
              handleClose={handleClose}
              open={open}
              handleOnEditDescSkillsClick={handleOnEditDescSkillsClick}
            />
            <EditDescSkills
              value={value}
              handleClose={handleClose}
              open={open}
              handleSave={handleSave}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={6} className={classes.grid}>
            <Discussion value={value} id={id} />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

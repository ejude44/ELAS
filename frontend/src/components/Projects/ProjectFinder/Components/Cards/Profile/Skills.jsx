import { Grid, Typography, makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Tooltip } from "@material-ui/core";
import { useState } from "react";
import Chip from "@material-ui/core/Chip";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import EditProfileSkills from "../../Popup/EditProfileSkills/EditProfileSkills";
import UserContext from "../../../Store/UserContext";
import AuthContext from "../../../Store/AuthContext";
import { useContext } from "react";
import { List } from "@material-ui/core";
import { useEditProfile } from "../../../api/user/hooks";

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
  saveSkills: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "right",
    verticalAlign: "text-bottom",
    marginTop: 120,
  },
  profileSkills: {
    fontWeight: 700,
    fontSize: 22,
  },
  skillsBox: {
    backgroundColor: "transparent",
    border: 0,
    borderColor: " #303f9f",
    width: "100%",
  },
}));

export default function Skills({ props }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { editProfile } = useEditProfile();
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const { setValue, value, setStatus } = props;
  const [mySkills, setMySkills] = useState();
  const [myLanguageSkills, setMyLanguageSkills] = useState();

  const onChange = (event, skills) => {
    setValue({ ...value, skills: skills });

    setStatus("save");
  };

  const onLanguageSkillsChange = (event, lang) => {
    setValue({ ...value, languageSkills: lang });
  };

  const handleSave = async () => {
    if (value.skills === [] || value.languageSkills === []) {
      setOpen(false);
      return;
    } else {
      const save = await editProfile(userCtx.id, value, authCtx.token);
      await userCtx.getLoggedInUser();
      if (save.success) {
        setStatus(save.data.sucess);
        setOpen(false);
      } else {
        setStatus(save.data.failed);
      }
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (value.skills !== undefined) {
      setMySkills(value.skills);
    }
    if (value.languageSkills !== undefined) {
      setMyLanguageSkills(value.languageSkills);
    }
  }, [value]);

  return (
    <>
      <Grid container direction="column">
        <Paper
          className={classes.root}
          style={{ maxHeight: 300, overflow: "auto" }}
        >
          <List>
            <div style={{ padding: 5 }}>
              <Typography className={classes.profileSkills}>
                Skills
                <Tooltip title="click  to begin Editing skills">
                  <EditOutlinedIcon
                    onClick={handleOpen}
                    fontSize="small"
                    style={{ color: "#FF6500" }}
                  />
                </Tooltip>
              </Typography>

              <Grid item>
                <Typography gutterBottom>Computer skills</Typography>
                {mySkills ? (
                  <>
                    <Grid container spacing={1}>
                      {mySkills.map((skill, index) => (
                        <Grid item key={index}>
                          <Chip label={skill} size="small" />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                ) : (
                  <CircularProgress />
                )}
              </Grid>

              <Typography gutterBottom>Language Skills</Typography>
              {myLanguageSkills ? (
                <>
                  <Grid container spacing={1}>
                    {myLanguageSkills.map((lang, index) => (
                      <Grid item key={index}>
                        <Chip label={lang} size="small" />
                      </Grid>
                    ))}
                  </Grid>
                </>
              ) : (
                <CircularProgress />
              )}
            </div>
          </List>
        </Paper>

        {open && (
          <EditProfileSkills
            open={open}
            handleClose={handleClose}
            handleSave={handleSave}
            onChange={onChange}
            onLanguageSkillsChange={onLanguageSkillsChange}
          />
        )}
      </Grid>
    </>
  );
}

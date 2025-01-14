import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import TeamMembers from "../Cards/EditProject/Applications/TeamMembers";
import Applications from "../Cards/EditProject/Applications/Applications";
import Rejected from "../Cards/EditProject/Applications/Rejected";
import { useParams } from "react-router-dom";
import MemberDetails from "../Popup/MemberDetail.jsx/MemberDetails";
import { useState } from "react";
import { useEffect } from "react";
import {
  useMyMembershipStatus,
  useRemoveApplicant,
} from "../../api/project/hooks";
import { useAcceptApplicant } from "../../api/project/hooks";
import { useRejectApplicant } from "../../api/project/hooks";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    display: "block",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(100),
    },
  },
  grid: {
    borderRadius: 5,
    margin: 0,
  },
  span: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "right",
  },
  Typography: {
    subtitle1: {
      fontweight: "bold",
    },
  },
}));

export default function ProjectApplications() {
  const classes = useStyles();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [ID, setID] = useState(Number);
  const [loadedMembers, setLoadedMembers] = useState([]);
  const [teamMember, setTeamMember] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [isClicked, setIsClicked] = useState([]);
  const { memId, MEM, refetch } = useMyMembershipStatus(id, ID);
  const { accept } = useAcceptApplicant();
  const { reject } = useRejectApplicant();
  const { remove } = useRemoveApplicant();

  const handleAccept = async () => {
    await accept(memId);
    await refetch();
  };

  const handleReject = async () => {
    await reject(memId);
    await refetch();
  };

  const handleRemove = async () => {
    await remove(memId);
    await refetch();
  };

  useEffect(() => {
    if (MEM !== undefined) {
      const mems = MEM.filter(
        // eslint-disable-next-line eqeqeq
        (mem) => mem.status === "pending" && mem.project_id == id
      );
      const rejectedMems = MEM.filter(
        // eslint-disable-next-line eqeqeq
        (mem) => mem.status === "rejected" && mem.project_id == id
      );

      const teamMems = MEM.filter(
        // eslint-disable-next-line eqeqeq
        (mem) => mem.status === "accepted" && mem.project_id == id
      );
      setLoadedMembers(mems);
      setTeamMember(teamMems);
      setRejected(rejectedMems);
    }
  }, [MEM]);

  const toggleMemberDetails = () => {
    setOpen(false);
  };

  return (
    <Grid container direction="column">
      <Grid item style={{ padding: 10 }}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} sm={8} lg={4} className={classes.grid}>
            <TeamMembers
              teamMember={teamMember}
              setOpen={setOpen}
              ID={ID}
              setID={setID}
              handleReject={handleReject}
              setIsClicked={setIsClicked}
            />
          </Grid>

          <Grid item xs={12} sm={8} lg={4} className={classes.grid}>
            <Applications
              memberships={loadedMembers}
              setID={setID}
              setOpen={setOpen}
              ID={ID}
              handleAccept={handleAccept}
              handleReject={handleReject}
              setIsClicked={setIsClicked}
            />

            <MemberDetails
              open={open}
              toggleMemberDetails={toggleMemberDetails}
              isClicked={isClicked}
            />
          </Grid>

          <Grid item xs={12} sm={8} lg={4} className={classes.grid}>
            <Rejected
              rejected={rejected}
              setID={setID}
              setOpen={setOpen}
              ID={ID}
              handleAccept={handleAccept}
              handleRemove={handleRemove}
              setIsClicked={setIsClicked}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

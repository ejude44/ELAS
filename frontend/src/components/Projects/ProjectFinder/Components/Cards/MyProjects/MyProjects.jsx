import * as React from 'react';

import { Card } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { CardActionArea } from '@material-ui/core';

import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { Link } from 'react-router-dom';

import { makeStyles, mergeClasses } from '@material-ui/styles';
import { useProjectMembers } from '../../../api/user/hooks';
import AvatarMyProject from '../../AvatarMyProject/AvatarMyProject';
import { useProjectTeamMembers } from '../../../api/project/hooks';
import { CircularProgress } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

const useStyles = makeStyles({
  card: {
    borderRadius: 15,
    backgroundColor: '#FDBA74',
  },
  box: {
    display: 'flex',
  },
  editView: {
    margin: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'right',
  },
  textEditView: {
    fontWeight: 600,
    fontSize: 13,
  },
  title: {
    fontWeight: 400,
    fontSize: 17,
    lineHeight: 2,
  },
  applications: {
    fontWeight: 50,
    fontSize: 12,
    lineHeight: 2,
  },
  members: {
    margin: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'left',
  },
});

export default function MyProjects({ filteredProject, handleOpen }) {
  const { members } = useProjectMembers(filteredProject.id);
  const { teamMembers } = useProjectTeamMembers(filteredProject.id);

  const classes = useStyles();

  return (
    <>
      <Card style={{ borderRadius: 5, width: 310, height: 280 }}>
        <CardMedia
          component="img"
          height="80"
          alt="projects"
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFhUZGRgYGhgaHBoaGhgYHBgYGhgaGRgYGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQrJSQ0NDQ2MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALEBHQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAwECBAUGB//EADkQAAEDAgMDCQcFAAIDAAAAAAEAAhEDIQQxQRJRYQUiUnGBkaHR8AYTFDKSscFCU2Lh8RXScoKi/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QALBEAAgIBAwQBAgUFAAAAAAAAAAECESEDEjEEE0FRIhRhBTJSkaEVI0Jxsf/aAAwDAQACEQMRAD8A+TseQpN10MThHDNnG2ixERmFpFpms9OUXTGUYgtOuXWoZSkwhhByV2knKx+6Y1TpDGUi25MTxH2UuZ2+CqDPzZ8ZnvVXtINipyzXCWFgHUAdD2XhZn0iOpbqdaLOK0OAcLOHUYHcdUW1yLtxkrRyWvOqlrdVprUTOl90JTScirMHFxeRj4MGOCZTwwN5AG86JU9SlgMyJQ16NE1eUNeJBAOXisLwuiymDkbjgkPob96SHOLasy0zcFbH0TAdFikBkFb6WIbsljsjdp3G1uogJvAtOKdqRkNWBGqoRqpqNl3enMp8zthMmm3Q3DiQRw+10ipSiVpoMMgahXqNuZGYz4Qp4Zu4XExvALRe+SS1NezclDNUjB8ji2QkVE+juVX00BJWrMsKzSpc1Woi6pGNZLPZCWmvKXCCnyVeFUiyu8KpQSyrGSnGw4q1OmdB6NkPZGaApiNmV0sK3Zg5Q0+MrEw3Gl099eWnrgcePrelJGmm1F2KxD5HWSepZw1Ne2yoXwkJ5dsfSxX/AJd6tVeD8pHELIWEKxGSW0ruSqmBB07lZjt89h9XQx8b09oOk+CBRV8FAZOZ7UwsOsyq+7TGvmxTNEvYU2aFD6EZXTwxXqsspvJrswZWvibFLiTmtIw8iRnuVW0SCnaIcJCTTK14TCzmmWyU7UgAZhF2XGCTsRiKcTGhjrSWui5vvn7jiukzDyJ8FerhWhoPeldYL7TfyRzXNnIHtSXNK0taWy0zB9StNOgD6uqsz2OQjC4Wbnx/CmqNhxAgt0jitWIfsWGokcEnDs24bloP78bpL2U4pfFcl8A7nh0ZcSAm4ogm0xMzq47upTi6OwWsHzC7u6w8CrUqUtzUOuTojFpPTOa+neRklVGXnRa8SyDATKTAWOnfPgFV4Od6dycTnsMXTGNmVc0SNLfhWowqZCi06ZiqtVaITsSEptgmjCaqRR5V2NtKXEpz8gEyVm2KKqArEKITJH062zlnP+JT3SlqwCQ7bwNa2ASeH5KpSaT6yV35Hs+2allPPSw7ylZSjkHNnL+lV1Ju+VZrZFtEioLqWW1SuiWmc0MZGeSo1ya0pkp2WqU4OYPEJ1B4APFKe8nMz15qjSUF2ou0abFT7tKa5bNqWjKYvE+ISeDWNS5AvtHr+1Q3VXlRRdDvNKinLNMdSZeJWplObdyzuN7eu1DXnO59blLNoOKdF69OCUyg2x0V3HazzVm0yIslZah8rXAtjy0j0VVzySRock0tBtCmrTLY5vYNfJVYSi6xwWw+E2nAOz3lKrHnm0AQI4ZJ7K0jZmCr1GbXO3gT63qbaeTRQjKPxMNSnrE8VTDPjr8lubR5pzSG4YTM/lVGRlLSaaaNW1ttDyLix6lShSIJAPrcmYaoGE7txm++Frc2dktyOZ18VLdYOiMVJW+VycyphiZOu5KY3ZdDrArRSG06DmJn+k7E4ZpI6u1O6wY7N3yic7EgiwuBlxCU5uUJ+JYW23ZdSiebHd/SpcGMo3J2Z6tGfuslVi6DpiDksrmXjeqizn1IoilhjsF+4wlOC7+Iw2xS2elB8FxHNRGW6y9bR7VJ80KDdyoWLbhmXMgwB/izVDeVV5OZxxZnIVg1XayUxwCZCRVomT1J1JhdPE36goDJ5rc/sn0payM4OkGyiXBvprORDH7NosQZ7rLFVzTXvKQSpS8k6k/CJhWapa/gr2ORV0QiEBW2DmhttEUOiwZktNOkY/PkqUHgWcJB8NxTHsiBnuP54IZrBKrK1WkC4SV12BoA2gXNIAF25xfsmVhq4W20zLrB+3UpTNJ6flFGOy9eC1SIt6KxB+kJtM7j3puIQnWDWavdrPkujhX7QFrjI7+0LlUXc7eFuYQMgJ0I3et6zlE7dGebbFOeWPuLTluW5my4gbQAiL59QGqw4p9w6b/dWw+yTLiQRohrA4zqTXizU7CgGRO+x3eCqyuBA7xpHcrPxQFpz689xVRh9sSCJbmLb7mNVHjJs2r/ALfI/EMEF05gR1rNgIJMfMND4rXSZsjZsQQdwjrvGqw0AGvIyPcnF4aDUtNOv9j6uFLi4xca7uCMOwts75ZAzBHcQFswzKhN/lIMd8p72NLdo26sp4RkocvBrHSTW7hnBrth4Mxn68VspYol0bIdNiYiB5KvKOHMSBl6z3LTgKTwwjaacsi0/Ylatpxs5YRa1XFX7ObjGaD0FlfU5sbl0sZSjSDr1Fc3Z60ReDLWg1KvYEEgX/CRk9vAhdLDt/iO1Z6jOcTG5WnZlLTapnZ5Y+QRuH2XnQ1d3GvLqbT1flYAyBlvWWlhUzp61b5pr0jJi3hvMadb9awkJ9emZlVYxdCwjy525UDKdlVzFocICo5ylyK7aoVSpkEE5EwpxNacupUe+etUIQlfInLaqQlyqWppaqJswaDZUwmQiEy9pUEpm3OajZU7KAVovbROa6LZfns1WcNTASnRaYxwIFjbcppYoi2k9yoqwikx7mnaNVeMwM9cu1ZqjNc1YKWoUaBvcRQcRqtTcUO38rO4KAxDimOMpRwjc120JA7FRzt/+dSztJCdTeZvdLbRotSxNRxBiVvwGMLTbO+XrNZq7LpbRBsQRwn8gIcVJBHUlCVpnpaGJY4hsgOOUTE7oOUpOK5PghxPNO657AsODcCIi+h8l1nYoNZsG8zJJvHAi/Bc8otSwenHXjqQ+RlqYhrWjZJMTzST3yrUXseLuMmbCdxuIXLxJBNkhjy0yCVr2k0cz6tqWVg6lbEEcx5PfEaX4QtuBwzXMlj4dwtuXBrVHO5xJJJuTmtHJ+IeDAkd8dqUofHAodQnO2rR3amFlsuzuJsJI3rD/wAadmWDavv8kx2O2GkTJO+w8z4JGG5Z2DbgMrR1SJ181ioS5R2y19JtKRifIsQQQhhkRu1XoKtJtRoOxDjreIXMfhC3qGul+ITUk1Xkh6Mk9ydohtTaYGxr4Iexpls5C3FPfR2GEkxFgf0meMrDTYZ4ASTw6+0Ii1WA1E7Sa5MFcSs7jBWioZM8ctVlrFabsHnzhTshz1GamnTJKY6lGandkeyTVmfZUOTnM0Ue7hXuMnAzlqrsJziqpOVkbEh3ukGkui2irfDqt5r2jmikp90ul8Mj4ZG8OyznBisKa3/Dq3w6e8O0zAKat7pbxh1cUEbxrSZzhSUiiukMMp+GRvH2Wc0UUe6XTGGVa1MNBJyCN4npNI53u0tz2tN3AHrWHE8quNmiBvzPYdNFz7zf1r2JOZzykrwdt3KDBMkk8Bn2rC/lIn5WgDjcrC5AE+uCzc2JuUjVT5TqNu0x2D8qzeVKsk7UyIuAR3HXiszKcq3ulDkykpey4x1Tpd4HkrDlF86dUJQpKuxeJ33+yamyXFm6jylo8do8luw+PabB0TvsuCY9D7KZ9Z26lSmwUpRPSsdt3B2vFX9wdy81h672EOYYOhjPgZtqvQclcqe9dsvADt8xO6xVb2bac4ydS5OngsW5lsxuO7dO9dmk9jztCNoC5yNt/wB1y3YaEMBG8erZLKUVLKPT0taWnh5Q/lj5BEWzzEnS29c6oNmmP5CSSD9wP9XcouEbbjJk2tPrJJx7GESIMXHWbx3lYq44rFnY9k7lauvJ5d8TYjtse1ILST6stuNgWj0VnZRfnEDfl/q1Ujzp6fyr/g+kNgTF0oUnOM+u9MpgzJPr7+CaSTvjgI8SknktxuKT4RnfSDdVmqvC0vpn1dL9ze9u260TOeUX4RlAO5GyVrMDRJc/gnZk4V5O+2mriktAap2VluO1QQj3SkUk5rVcNRuL2Iz+6V20eCeGqwCTkNQRn90rto8FpDUxjFO8pQRnbRTBhwtLWJzGhS5lqCMQwy4ntU7ZoxzecYuYOV9kanzXqiYXluXvZ99auHtMtLYMkANjIC0wc8jmnGWcnN1UXsairbPH4bCl15EcTEHr32V6LWalwM9WUmCZsT+D26uU8D7p4pucD8pLWy4gGbCQL69qrWc0gMDA10jnl5sIsH5AZa3GyezezxtrTpkHCscAGHnEXbcm0k6WAG/h1qHYEzAEkbRLRziAMzI0VqZLfkkH9UFpbDbgtdJvnaTY5wuhQxYPzBwcI2QAIIh0G4PC2WaiTNoQtmLDYQmIIv4E5DuW3D8n72kkg2FtBe+k9326PJ+GL4s2GtbmZtsm2YzzjOd+vcZgH3ewbO1YAbVmwInf8s9ZXPLVo9PT6ZVk8a/k83IB2RednTWATcC9+tY34QkkZmCTuBGki2i9rieSyBsENBMkONo2RGyDlmAZ4Ea24lchjpcIEvadguGrZEySNFUJ2Y63TpK0cZvJ/Nm0Zkg3ymIP44JdZtPIbjJ52jtREkxeL/lbsTinGWsaWiTsk2cQCTD4sdLZTvXOexsbQItfnEBzj+qBOS3TOCUaKtptcSBzRB+Y2BvzZAubjRRhnGnUaZALTrlGRmJtmnV6jXNJDGtyjZm2/aaT4gacVmYxzy1rWlziYHEnQaBUZ+cH0WgzbAOm/wDtOFOLAJPIPJ5o0mtJJOZFjDjcgRouoWCxhYOWT24puKbVMzUeT3uvEBN/49ozdJ6wuoKrS2BGWtrrlVqD3Tzh3yO1Yz1pHToaGm8tnPxODpzMSRkIXPxIkxAtpu6z+F1nYINzcDxg+ULO7CsGTm9xP2URk/J3yUWqVHFdTJNv77NyY2i/IDtXUDGC2fUD/qax8ZMPcAtd5yPTzhM5P/HPO/1xTByMdR3rsNrkaeJS34l5y8AUd30S+mtW0cmpyUBnHcfysrsI0aDwXTxAqH9J8FzqlCoTu7QtI6l+Tl1dBrhHXDlMrwgxdT9x/wBTvNT8XU/cf9TvNb9r7nCut+x7sQrArwYxb/3H/W7zVvin9N/1u80u39yvrfse7BVg8LwYxT+m/wCt3mpGJf03/U7zR2rH9b9j37CnsXzwYh/Tf9TvNXGIf03/AFO80uw/ZS637fyfR2BODF81Fd/Tf9R81dtZ/Td9R80n0z9lLrE/H8n0GohjV4Rj39J3efNaWF/SPeUPQdcmsddS8HqMZyLSqEucxu0RG0BDsozGdt6xD2cpANbsu5uR2jnESRkT6ysuYxj+ke9NbTd0vFJQkvIduEnbib3ezbBTe1hc3aEkAB0ltwNk55AaZnhHJqezlZjC87JYJcf0kAgX2ch1T+nqW5gdv8VppuO9TKMvZceljdrAci8mVgZaCCBOTgYIymLai8ZFfSfZc0hThwaCBHOAsNbQvF4Wod58Vl9puVHsbT2XkElwnWLLklGSkmi9fR3Qq8Hc5fwbqlRwoggc4bVw3Zm4kC+ll4uvyBWe/mtJ0JcCwNyEy6Ji/wAs/LabL19WuYgEwLDPJc2s9+cnx809NS5NFofDa3wcih7FEmatXPZkMa0mwgc9wsBujQcI6I9kMPBGyYIiNq8TMbXzZ8fCyW+rU6bu93mstTE1um/6nf8AZdG2b8mL6XTj4s6lP2Tw8tOwOaCBckQd97nitzeSadP5GMbrYAZ55Lyr8TW/cf8AW7/skvxdf9x/1u80dmb8iXbi7Uf4PZe5Ch1Mb14Spja37j/rd5rM/HVv3X/W/wA0108/ZMuogvDPoD3Bt5WV+LHSjsC8G7GVTnUf9bvNKdianTf9TvND6SUuWgh1+nD/ABZ7l+Jn9R7vIJBxH8vD+14k4mp03/U7zVDiH9N/1O81P0cl5Kf4rD9LPcDFDpOPaPwFZ2KA/u58V4Q4p/Tf9TvNVOKf03/U7zR9I/Yf1WFflf7nvDjkt+P4+K8KcS/pu+o+aocQ/pu+o+aa6T7kS/FY/pf7ns62M4jvWR2KHS8P6XlvfP6TvqPmq+8d0nd5Vrp68mMvxJPwVCmFCkFdZ5KJAVlUFSHJUVZcKwCptKQUxpjGq4Sg71KuH8UykzQ0q7Z9ArMH9XgnNduCClI1sf6m/wBlrov9TP5XOZUPHwTmOHE5ZNak0bQ1KOox/wB9w/1ObU6+4rmsrRaRH/g7ulpATmV53SdznA8IErNxOmGqzoCorMqwc1z6mKY0XcLWvPdl5rl1+W2gkNE8dFlJejf6iEfzM9pQrrhe2VfmU94c7T+P9BcF/L9TSB4rHice94Ac6YuslB3bI1eshKDUbtn05mJ2hMjvCq93qy+e0eXazRAcD1icu1Op+01UG8EbhLfFCg0bLrtJrNnsqpWOq/16yXJpe0bHWcNniZPXcJ/xrHDmuHfA3Z7QWsV7Jl1EJflZoe/1dJqP6+0LO+tH+eZSn1OA7m+S2UTmlrE1KnEeu3sWZ7j6k/hWe8+ohZnP9StEjllOyXH1cJTyoL+pUc/j3SgzcgKqVBcqSgiySFUoLlXaSFYEKCFJKgoJbKqCpQglkSpVVIQBYKQVVVNYBJugGhTCyurncqOeTqpckOzYXgZn11I+IbvWFCNzHuN3xTRv7FHxjeiViQjcxbmbxyh/E96a3lT+JP8A7T+Fy0BLcxqTR1Tysej3kfgJFflF7hGQvYZXWNCTbZe6T8kueTmSUSoUJElw5TtpaFNDtjNtVLlVSmFsJUseRcGFCEwNVPlF7RAI7QFf/lH7h/8AXmsSqU7YOT9m88onojvKr8f/ABCxIT3MnczZ8YOio+LG4+CyIRuYrZs+Jad6kVGnVYkJ7mFm7aCgrG15GRTG1jqhSQWOQVRtQFWlWnYglRKFCAKF8KDVS0LPcwJc4nNQhCkAQhCABCEIAEIQgAQhCAJlSqoQOyyEIQUgRKEJUAIUKJToGyyhQhArJJUIQgkEIQgAQhCABCEIAEIQgAUhx3qEIAuKit7wJSE9zAEIQkAIQhAAhCEACEIQAIQhAAhCEACEIQBIUoQgtcAhCEAQ5QhCCWCEIQIEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgD/9k="
        />
        <CardHeader />

        <CardContent>
          <Typography className={classes.title}>
            {filteredProject.title.length <= 32
              ? filteredProject.title
              : filteredProject.title.substr(0, 32) + '...'}
          </Typography>
          <Grid item>
            <Typography className={classes.applications}>
              #Application(s) {members ? members.length : 'no applications yet'}{' '}
            </Typography>
          </Grid>
        </CardContent>
        <Box className={classes.box}>
          <Box className={classes.members}>
            <Grid item>
              <Typography>Members</Typography>

              {teamMembers ? (
                <AvatarGroup max={3}>
                  {teamMembers.map((filteredMembers) => (
                    <AvatarMyProject filteredMembers={filteredMembers} />
                  ))}
                </AvatarGroup>
              ) : (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              )}
            </Grid>
          </Box>

          {filteredProject.user_id ? (
            <CardActionArea
              component={Link}
              to={/projects/ + filteredProject.id + '/details'}
            >
              <Box className={classes.editView}>
                <Typography color="primary" className={classes.textEditView}>
                  EDIT PROJECT
                </Typography>
              </Box>
            </CardActionArea>
          ) : (
            <CardActionArea onClick={() => handleOpen(filteredProject.id)}>
              <Box className={classes.editView}>
                <Typography color="primary" className={classes.textEditView}>
                  VIEW PROJECT
                </Typography>
              </Box>
            </CardActionArea>
          )}
        </Box>
      </Card>
    </>
  );
}

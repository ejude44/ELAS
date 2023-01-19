import { Typography, Grid, TextField } from '@material-ui/core';
import { Faculties, Degrees, maxMembers } from '../../reuse/reuse';
import { MenuItem } from '@material-ui/core';

export default function TitleAndDetails({ props }) {
  const { value, setValue } = props;
  const onChange = (event) => {
    setValue({ ...value, 'title': event.target.value });
  };

  const onChangeFac = (event) => {
    setValue({ ...value, 'faculty': event.target.value });
  };

  const onChangeDeg = (event) => {
    setValue({ ...value, 'degree': event.target.value });
  };

  const onChangeMaxMem = (event) => {
    setValue({ ...value, 'maxMembers': event.target.value });
  };

  return (
    <Grid container direction="column" sx={{ mb: 2 }}>
      {/* <form
      noValidate
      //   onSubmit={submitFormHandler}
    > */}
      <Grid item>
        <TextField
          id="standard-full-width"
          label="Title"
          fullWidth
          variant="outlined"
          value={value.title}
          //   error={userInput.enteredTitleError.error}
          //   helperText={userInput.enteredTitleError.message}
          required
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <TextField
          id="outlined-select-faculty"
          select
          label="Select"
          fullWidth
          value={value.faculty}
          onChange={onChangeFac}
          //   error={userInput.enteredFacultyError.error}
          helperText="select faculty"
        >
          {Faculties.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item>
        <TextField
          id="outlined-select-degree"
          select
          label="Select"
          helperText="select Degree"
          fullWidth
          value={value.degree}
          onChange={onChangeDeg}
          //   error={userInput.enteredDegreeError.error}
          //   helperText={userInput.enteredDegreeError.message}
        >
          {Degrees.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item>
        <TextField
          id="outlined-select-max_members"
          select
          fullWidth
          // label="Select"
          value={value.maxMembers}
          onChange={onChangeMaxMem}
          //   error={userInput.enteredMaxMembersError.error}
          helperText="select maximum project members"
        >
          {maxMembers.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {/* </form> */}
    </Grid>
  );
}

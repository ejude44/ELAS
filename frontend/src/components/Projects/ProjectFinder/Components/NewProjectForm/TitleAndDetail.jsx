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
    <Grid container sx={{ mb: 2 }} direction="column">
      <Grid container spacing={3} direction="column">
        <Grid item xs>
          <TextField
            id="standard-full-width"
            label="Title"
            fullWidth
            variant="outlined"
            value={value.title}
            error={value.titleError.error}
            helperText={value.titleError.message}
            required
            onChange={onChange}
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="outlined-select-faculty"
            select
            label="Select faculty"
            fullWidth
            value={value.faculty}
            onChange={onChangeFac}
            error={value.facultyError.error}
            helperText={value.facultyError.message}
          >
            {Faculties.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            id="outlined-select-degree"
            select
            label="Select Degree"
            fullWidth
            value={value.degree}
            onChange={onChangeDeg}
            error={value.degreeError.error}
            helperText={value.degreeError.message}
          >
            {Degrees.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            id="outlined-select-max_members"
            select
            fullWidth
            label="Select max Members"
            // label="Select"
            value={value.maxMembers}
            onChange={onChangeMaxMem}
            error={value.maxMembersError.error}
            helperText={value.maxMembersError.message}
          >
            {maxMembers.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      {/* </form> */}
    </Grid>
  );
}

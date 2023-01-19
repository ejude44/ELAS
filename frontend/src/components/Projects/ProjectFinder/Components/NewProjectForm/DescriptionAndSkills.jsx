import { Typography, Grid, TextField, Divider } from '@material-ui/core';
import { skills } from '../../reuse/reuse';
import { Autocomplete } from '@material-ui/lab';

export default function DescriptionAndSkills({ props }) {
  const { value, setValue } = props;
  const onChangeDesc = (event) => {
    setValue({ ...value, 'description': event.target.value });
  };

  const onChangeSkills = (event, skills) => {
    setValue({ ...value, 'skills': skills });
    // setValue({ ...value, 'skills': event.target.value });
  };

  return (
    <Grid container direction="column" sx={{ mb: 2 }}>
      {/* <form
        noValidate
        //   onSubmit={submitFormHandler}
      > */}
      <Grid item>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          fullWidth
          multiline
          value={value.description}
          rows={10}
          // variant="outlined"
          onChange={onChangeDesc}
          // onChange={descriptionChangeHandler}
          //   error={userInput.enteredDescriptionError.error}
          // helperText="jajajajaa"
          //   helperText={userInput.enteredDescriptionError.message}
        />
      </Grid>
      <br></br>
      <Grid item>
        <Autocomplete
          multiple
          onChange={onChangeSkills}
          // onChange={(event, skills) => onChange(event, skills)}
          // onChange={(event, mySkills) => setMySkills(mySkills)}

          id="tags-standard"
          options={skills}
          freeSolo
          getOptionLabel={(option) => option}
          defaultValue={[skills[1]]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="choose Skills"
              placeholder="Favorites"
            />
          )}
        />
      </Grid>

      {/* <Grid item>
        <TextField
          id="standard-full-width"
          label="Enter Skills comma separated"
          variant="outlined"
          multiline
          fullWidth
          value={value.skills}
          onChange={onChangeSkills}
          //   error={userInput.enteredSkillsError.error}
          //   helperText={userInput.enteredSkillsError.message}
        />
      </Grid> */}
      {/* </form> */}
    </Grid>
  );
}

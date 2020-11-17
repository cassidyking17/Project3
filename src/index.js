import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

function Labels(props) {
  return <h2>{props.title}</h2>;
}
function Symptoms(props) {
  return <h3>{props.symptom}</h3>;
}

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function DropDownMenus() {
  const classes = useStyles();
  const [sick, setSick] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setSick(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Yes or No</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={sick}
          onChange={handleChange}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
function FinishButton(){
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary">
        Finish
      </Button>
    </div>
  )
}
export default function App(){
  return(
    <div>
      <h1>Should you get tested for COVID?</h1>
      <Labels title ="Do you have any of the following symptoms?"/>
      <Symptoms symptom = "Fever of above 100 degrees or chills:"/>
      <DropDownMenus></DropDownMenus>
      <Symptoms symptom ="Shortness of breath:" />
      <DropDownMenus></DropDownMenus>
      <Symptoms symptom ="Fatigue:" />
      <DropDownMenus></DropDownMenus>
      <Symptoms symptom ="Body aches:" />
      <DropDownMenus></DropDownMenus>
      <Symptoms symptom ="Loss of taste or smell:" />
      <DropDownMenus></DropDownMenus>
      <Symptoms symptom ="Conjestion/runny nose:" />
      <DropDownMenus></DropDownMenus>
      <Symptoms symptom ="Nausea/vomitting:" />
      <DropDownMenus></DropDownMenus>
      <Symptoms symptom ="Diarrhea:" />
      <DropDownMenus></DropDownMenus>
      <FinishButton></FinishButton>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

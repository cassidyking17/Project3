import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import './index.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

let results = []; 

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
    flexGrow: 1,
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
    results.push(event.target.value);
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
      <Button variant="contained" color="primary" id ="FinishButton" onClick={() => { 
  
        let output ='You do not need to get tested';
        results.forEach((input)=>{
          if(input===true){
            output='You should get tested';
          }
        }) 
        alert(output);
        results =[];
      }}>
        Finish
      </Button>
    </div>
  )
}
export default function App(){
  const classes = useStyles();
  return(
    <div>  
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <h1>Should you get tested for COVID?</h1>
          <h2>Do you have any of the following symptoms?</h2> 
          </Paper>
        </Grid>
     
        <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Symptoms symptom = "Fever of above 100 degrees or chills:"/>
      <DropDownMenus></DropDownMenus>
      <Symptoms symptom ="Shortness of breath:" />
      <DropDownMenus></DropDownMenus>
      <Symptoms symptom ="Fatigue:" />
      <DropDownMenus></DropDownMenus>
      <Symptoms symptom ="Body aches:" />
      <DropDownMenus></DropDownMenus>
      </Paper>
        </Grid>
      
        <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
        <Symptoms symptom ="Loss of taste or smell:" />
      <DropDownMenus></DropDownMenus>
      <Symptoms symptom ="Conjestion/runny nose:" />
      <DropDownMenus></DropDownMenus>
      <Symptoms symptom ="Nausea/vomitting:" />
      <DropDownMenus></DropDownMenus>
      <Symptoms symptom ="Diarrhea:" />
      <DropDownMenus></DropDownMenus>
      
      </Paper>
        </Grid>
        </Grid>

        <Grid item xs={6} sm={3}>
        <Grid item xs={6} sm={3}>
        <Grid item xs={6} sm={3}>
       
        <Grid item xs={6} sm={3}>
        <FinishButton> </FinishButton>
        </Grid>
        </Grid>
        </Grid>
        </Grid>
       
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

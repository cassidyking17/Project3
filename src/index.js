import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import './index.css';
import Grid from '@material-ui/core/Grid';

  document.body.style.background = "lightgrey";


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

let info={};

var request = new XMLHttpRequest();
  request.open("GET", "https://api.covidtracking.com/v1/us/current.json",true );
  request.onload = function() {
    const data = JSON.parse(this.response)[0];
    
    info ={
      "Total Positive Cases:": data.positive,
      "Currently Hospitalized:": data.hospitalizedCurrently,
      "Total Recovered:":data.recovered,
      "Total Deaths:":data.death,
      "Total Test Results Given:": data.totalTestResults
    } 

    function renderKeys(){
      const keys = Object.keys(info);
      return keys.map((key)=><h3>{key}</h3>)
    }
    function renderValues(){
      const values = Object.values(info);
      return values.map((value)=><h3>{value}</h3>)
    }
    ReactDOM.render(renderKeys(),document.getElementById('dashKeys'))
    ReactDOM.render(renderValues(),document.getElementById('dashValues'))
}  

let results = []; 
let output='You do not need to get tested';

function Symptoms(props) {
  return <h3>{props.symptom}</h3>;
}
function Test(props){
  return <h4>{props.test}</h4>
}

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
      <Button variant="contained" color="secondary" id ="FinishButton" onClick={() => { 
        output ='You do not need to get tested';
        results.forEach((input)=>{
          if(input===true){
            output='You should get tested';
          }
        }) 
        ReactDOM.render(
          output,document.getElementById('text')
        );
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
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          
          <h1>COVID Symptom Test</h1>
          <h2>Do you have any of the following symptoms?</h2> 
          
        </Grid>
      <Grid item xs={12} sm={6}> 
        <h1>
          COVID Dashboard:
        </h1>
        <h2 id ='facts'>Facts:</h2> 

        </Grid>
      
      <Grid item xs={6} sm={3}>
        <Symptoms symptom = "Fever of above 100 degrees or chills:"/>
        <DropDownMenus></DropDownMenus>
        <Symptoms symptom ="Shortness of breath:" />
        <DropDownMenus></DropDownMenus>
        <Symptoms symptom ="Fatigue:" />
        <DropDownMenus></DropDownMenus>
        <Symptoms symptom ="Body aches:" />
        <DropDownMenus></DropDownMenus>
      </Grid>
      
      <Grid item xs={6} sm={3}>
        <Symptoms symptom ="Loss of taste or smell:" />
        <DropDownMenus></DropDownMenus>
        <Symptoms symptom ="Conjestion/runny nose:" />
        <DropDownMenus></DropDownMenus>
        <Symptoms symptom ="Nausea/vomitting:" />
        <DropDownMenus></DropDownMenus>
        <Symptoms symptom ="Diarrhea:" />
        <DropDownMenus></DropDownMenus>
      </Grid>
      <Grid item xs={12} sm={3} id = 'dashKeys'/>
      <Grid item xs={12} sm={3} id = 'dashValues'/>
      </Grid>

        
      <Grid item xs={12} sm={6}>
      <FinishButton> </FinishButton>
        <h3 id="text">Results Shown Here</h3>
      </Grid>
   </div>
  )
}

request.send();
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

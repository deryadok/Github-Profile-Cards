import React from 'react';
import './App.css';
// import axios from './axios';

function App() {
  return (
    <AppStart></AppStart>
  );
}

function Title(params) {
  return(
    <div className="header">{params.title}</div>
  );
}

class Card extends React.Component{
  render(){
    const profile = this.props;
    return(
      <div>
        <div className="github-profile" style={{margin: '1rem'}}>
          <img src={profile.avatar_url} alt="Açıklama" width="75px"></img>
          <div className="info" style={{display:'inline-block', marginLeft: 10, marginBottom: 10}}>
            <div className="name" style={{fontSize: '125%'}}>{profile.name}</div>
            <div className="company">{profile.company}</div>
            {/* <div style={{color: Math.random() < 0.5 ? 'green' : 'red'}}>DENEME DENEME</div> */}
          </div>
        </div>
      </div>
      );
  }
}

function CardList(props){
  return(
    <div>
      {props.profiles.map(profile => <Card key={profile.name} {...profile}></Card>)}
    </div>
  );
}

class Form extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {userName : ''};
  }  

  handleSubmit = async (e) => {
    
    e.preventDefault();

    var data = await fetch(`https://api.github.com/users/${this.state.userName}`)
      .then(res=> res.json())
      .then(
          (result) => {
            return result;
          }
      );

      this.props.onSubmit(data);
  };

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="GitHub username" value={this.state.userName} onChange={event => this.setState({userName: event.target.value})} required></input>
        <button>Add Card</button>
      </form>
    );
  }
}

// const testData = [
//   {name: "Yiğit Özaksüt", avatar_url: "https://avatars2.githubusercontent.com/u/11349626?v=4", company: "@rise-consulting"},
//   {name: "Derya Dok", avatar_url: "https://avatars1.githubusercontent.com/u/26708098?v=4", company: "@rise-consulting"},
//   {name: "Emre Can Ergör", avatar_url: "https://avatars3.githubusercontent.com/u/30055298?v=4", company: "@rise-consulting"},
// ];

class AppStart extends React.Component
{
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     profiles : testData,
  //   };
  // }

  state = {
    profiles : [],
  };

  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles : [...prevState.profiles,profileData] 
    }));
  }

  render(){
    return(
      <div>
        <Title title="Profile Card"></Title>
        <Form onSubmit={this.addNewProfile}></Form>
        <CardList profiles={this.state.profiles}></CardList>
    </div>
    );
  }
}

export default App;
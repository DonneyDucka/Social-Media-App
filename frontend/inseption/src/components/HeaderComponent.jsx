import React, { Component } from 'react'
import { Link,Redirect  } from 'react-router-dom'
import AuthenticationService from '../api/todo/AuthenticationService.js'
import ProfileService from '../api/todo/ProfileService.js'

/*
This is the header component, which acts as the navigational bar (at the top of the web page), which includes
navigating through the other pages (profile, campus map) and logging out of the client. There is the list of all
the users in the database (profiles: [] - in order to have the search bar function) where an algorithm is built.
to find the matching or suggested name of what the user is attempting to input.
*/



class HeaderComponent extends Component {
    

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            profiles: [],
            matchingProfiles: [],
            empty: true
        }

        ProfileService.getAllUsers().then(
            response => { 
                this.setState({profiles: response.data});
            }
           )
    }

    onChangeText(e, focus) {

        const value = e.target.value;
        console.log(value);
       
        let matchingProfiles = [];
        let profiles = this.state.profiles;
        var size = profiles.length;

        if (value.length > 0) {
            this.setState({empty:false});
            for(var i = 0; i <size; i++) {
              
                if(profiles[i].username.includes(value)){
                    matchingProfiles.push(profiles[i].username);
                }
            }
        } else if(focus){

            for(var i = 0; i <size; i++) {
                    matchingProfiles.push(profiles[i].username);
            }

        }

        this.setState(() => ({ matchingProfiles, text: value }));

        console.log(profiles);
        this.renderSearchButton();
    }

    renderSearchs() {
       
        const { matchingProfiles } = this.state;
    
        if (matchingProfiles === 0) {
            return null;
        } console.log(matchingProfiles);
        return (matchingProfiles.map((item) => <ul onClick={()=>this.selectedSearch(item)}>{item}</ul>))
    }

    selectedSearch(value) {
        
        this.setState(() => ({
            text: value,
            matchingProfiles: []
        })
        )
    }

    getAddress(){
        let profile = this.state.profiles;  
        var exists = false; 
        var input = document.getElementById("searchBar");
        var matched;
        
        for(var i = 0; i <profile.length; i++) {
              
            if(profile[i].username == input.value){
                matched = profile[i].username;
                exists = true;
            }
        }
        
        if(exists){
            window.location.replace(`/profile?name=${matched}`)
        }
        else
        {
            alert(`User ${input.value} not found!`)
        }
    }
    
    renderSearchButton(){
        var input = this.state.text;
         
        if(input == undefined) {
           return(
            <button type="submit" id="searchButton" ><i class="fa fa-search"></i></button>
            )
         } else if( input != undefined){
          
            return(
                <button type="submit" onClick={()=> this.getAddress()} id="searchButton" ><i class="fa fa-search"></i></button>
                )
                
        }
         

    }


    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        this.state.username = AuthenticationService.getLoggedInUserName();
        const welcomeLink = "/welcome/" + this.state.username;
        const profileLink = "/profile?name=" + this.state.username;
        const maplink = '/campus/'
        const { text } = this.state;
        return (
            <header data-test="headerComponent">
                <nav className="nav-s">
                    <div className="nav-div-left">
                        <ul className="headerstuff">
                            {isUserLoggedIn && <li id="nav-li"><a href={welcomeLink}> <h3 id="rmit-links">Home</h3> </a></li>}
                            {isUserLoggedIn && <li id="nav-li"><a href={maplink}> <h3 id="rmit-links">Campus Events</h3> </a></li>}
                            {isUserLoggedIn && <li id="nav-li"><a href={profileLink}> <h3 id="rmit-links">Profile</h3> </a></li>}
                            {isUserLoggedIn && <li id="nav-li">
                                <div id="searchContainer">
                                <div className="searchBar">
                                <input id="searchBar" value={text} type="text" autocomplete='off' placeholder="Search by username..." onChange={(e) => this.onChangeText(e,false)} 
                                 onFocus={(e) => this.onChangeText(e,true)}></input>
                                {this.renderSearchButton()}
                                <ul className="search-objects" >
                                    {this.renderSearchs()}
                                </ul>
                                </div>
                                </div> </li>
                            }
                        </ul>
                    </div>


                    <div className="nav-div-right">
                        <ul data-test="logout-link">
                            {isUserLoggedIn && <li id="nav-li"><Link to="/logout" onClick={AuthenticationService.logout}> <h3 id="rmit-links">Logout</h3> </Link></li>}

                        </ul>

                    </div>


                </nav>
            </header>
        )
    }
}

export default HeaderComponent

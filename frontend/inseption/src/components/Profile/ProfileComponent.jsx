import React, { Component } from 'react'
import FileBase64 from 'react-file-base64';
import ProfileService from '../../api/todo/ProfileService.js'
import ClassDataService from '../../api/todo/ClassDataService.js'
import AuthenticationService from '../../api/todo/AuthenticationService.js'
import queryString from 'query-string'
import moment from 'moment'

/*
One of the main APIs, the Profile component is a profile page that has posts (RMIT chat functionality),
class timetable, and an 'About me'.
*/

class ProfileComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            imageUploadedBase64: '',
            major: '',
            age: '',
            aboutMe: '',
            posts: [],
            posterUsername: '',
            toBePosted: '',
            classMessage: null,
            postMessage: null,
            profiles: [],
            classes:[],
            show: false,
            profilePicture: ''
        }

        ProfileService.getAllUsers().then(
            response => { 
                this.setState({profiles: response.data});
            }
           )

        this.addPost = this.addPost.bind(this)
        this.getPost = this.getPost.bind(this)
        this.delPost = this.delPost.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.deleteClassClicked = this.deleteClassClicked.bind(this)
        this.addClassClicked = this.addClassClicked.bind(this)
        this.refreshClasses = this.refreshClasses.bind(this)
         this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    addPost() {
        let posterUsername = AuthenticationService.getLoggedInUserName()
        let post = {
            username: this.state.username, // get from url params
            posterUsername: posterUsername, // get from url params or something
            content: this.state.toBePosted,
            datePosted: new Date(),
        }
        if (post.content.length == 0) {
            this.setState({ postMessage: `You have not entered anything` })
        } else {
            ProfileService.createPost(post.username, post).then(res => {
                console.log(res)
                this.setState({ postMessage: `Post created` })
                this.getPost()
            }, err => {
                console.log(err)
            })
        }
    }

    getPost() {
        ProfileService.retrieveAllPosts(this.state.username)
            .then(
                response => {
                    let data = response.data
                    data.reverse()
                    this.setState({ posts: data })
                }
            )
    }

    delPost(id) {
        ProfileService.deletePost(this.state.username, id)
            .then(
                response => {
                    this.setState({ postMessage: `Post was deleted` })
                    this.getPost()
                }
            )
    }

    params() {
        const values = queryString.parse(this.props.location.search)
        this.setState({
            username: values.name
        }, () => ProfileService.retrieveProfile(this.state.username).then(res => {
            const data = res.data
            this.setState({
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                imageUploadedBase64: data.profilePicture,
                email: data.email,
                major: data.major,
                aboutMe: data.aboutMe,
                profilePicture: data.profilePicture
            })
            this.getPost()
        }, err => {
            console.log(err)
        }))
    }

    componentDidMount() {
        this.params()
        this.refreshClasses();
    }

     handleSubmit(e) {
        let username = AuthenticationService.getLoggedInUserName()
    
        ProfileService.editUserProfileService(
            username,
            this.state.firstName,
            this.state.lastName,
            this.state.profilePicture,
            this.state.major,
            this.state.aboutMe
        ).then(res => {
            console.log(res)
            this.props.history.push(`/profile?name=` + username)
            window.location.reload();
        }, err => {
            console.log(err)
        })
    }

    // Callback~
    getFiles(files) {
        this.setState({ profilePicture: files['base64'] })
        console.log(this.state.profilePicture)
    }

    refreshClasses() {
        const values = queryString.parse(this.props.location.search)
        ClassDataService.retrieveAllClasses(values.name)
            .then(
                response => {
                    this.setState({ classes: response.data })
                }
            )

        ClassDataService.retrieveCompletedClasses(values.name)
            .then(
                response => {
                    this.setState({ completed: response.data })
                }
            )
    }

    deleteClassClicked(id) {
        const values = queryString.parse(this.props.location.search)
        ClassDataService.deleteClass(values.name, id)
            .then(
                response => {
                    this.setState({ classMessage: `Class was deleted` })
                    this.refreshClasses()
                }
            )

    }

    getPosterImage(username){
      
     let users = this.state.profiles;
    
     for(var i =0; i < users.length;i++){
         
        if(username == users[i].username){
          return users[i].profilePicture;
        }
     }
      return this.state.imageUploadedBase64;
    }

    addClassClicked() {
        this.props.history.push(`/classes/-1`)
    }

    editClicked(){
        this.setState({show: true});
    }
    
    renderUpdate(){
       
        if(this.state.show == true) {
        return( 

                      <div className="updateForm">

                        <div className="img-wrap">
                            <img src={this.state.profilePicture} /><br />

                        </div>
                        <div className="uploadF">
                                <FileBase64 class="btn btn-danger" onDone={this.getFiles.bind(this)} />
                            <br />
                        </div>

                        <strong>First Name: </strong>
                        <input id="reg-Input" placeholder={this.state.firstName} type="text" name="firstName" onChange={this.handleChange} />
                        <br />
                        <strong>Last Name: </strong>
                        <input id="reg-Input" placeholder={this.state.lastName} type="text" name="lastName" onChange={this.handleChange} />
                        <br />
                        <strong>Major: </strong>
                        <input id="reg-Input" placeholder={this.state.major} type="text" name="major" onChange={this.handleChange} />
                        <br />
                        <strong>About me: </strong>
                        <input id="reg-Input" placeholder={this.state.aboutMe} type="text" name="aboutMe" onChange={this.handleChange} />
                        <br />

                        <button onClick={this.handleSubmit} type="submit" className="btn btn-primary" id="reg-submit">Save Details</button>
                    </div>
           );
    }
    
    }
     
    
    renderPosts() {

        return (this.state.posts.map
            (
                post => {
                    if (post.posterUsername == post.username) {
                        return (
                            <div className="yourPost overflow-hidden" data-test="postComponent">
                               <div className="comment float-right">
                                {((post.posterUsername == AuthenticationService.getLoggedInUserName())) ? <button className="delPost float-right" onClick={()=>this.delPost(post.id)}>  </button> : null} 
                                <p style={{float:"right"}}>{post.content}</p>
                                </div>
                                <div className="post-bottom">
                                <ul className="comDetails">
                                    <li > {moment(post.datePosted).format('YYYY-MM-DD HH:mm')}</li>
                                    <li >{post.posterUsername}</li>
                                   <img className="comImg" src={this.state.imageUploadedBase64}></img>
                                </ul>
                                </div>
                            </div>)
                    }
                    else {
                        return (
                            <div className="otherPost overflow-hidden" data-test="postComponent">
                               <div className="otherComment">
                                <p>{post.content}</p>
                                </div>
                                <div className="post-bottom float-left">
                                <ul className="othercomDetails">
                                    <img className="comImg" src={this.getPosterImage(post.posterUsername)}></img> 
                                    <li >{post.posterUsername}</li>
                                    <li > {moment(post.datePosted).format('YYYY-MM-DD HH:mm')}</li>
                                </ul>
                                </div>
                            </div>)
                    }

                }
            )
        )

    }


    // Display profile in this component.
    render() {
        return ( 

    
            <div className="profile-container">
                {/* Top part of the banner page for profile */}
                <div className="profile-top">

                </div>

                {/* Middle part of the profile page, profile picture, name and the edit profile button */}
                <div className="profile-left">
                    <div className="profile-left-image">
                        <img src={this.state.imageUploadedBase64}></img>
                    </div>

                    <div className="profile-left-name">
                        <strong> {this.state.firstName} {this.state.lastName}</strong>
                    </div>

                    <div className="profile-left-edit">
                        {(this.state.username == AuthenticationService.getLoggedInUserName()) ? <button onClick={()=>this.editClicked()}> Edit Profile </button> : <div></div>}
                    </div>
       
                </div>
                  {this.renderUpdate()}

                {/* This part is the about me part of the profile page for the user */}
                <div className="profile-wrapper" data-test='profileComponent'>
                    <div className="profile-content">

                        {/* The left side of this div will contain the users' detail */}
                        <div className="profile-content-left">
                            <h1>Details</h1>
                            <div className="profile-content-left-details">
                                <strong>Username: </strong>
                                {this.state.username} <br />

                                <strong>Email: </strong>
                                {this.state.email} <br />

                                <strong>Major: </strong>
                                {this.state.major} <br /> <br />

                                <strong>About me: </strong>
                                {this.state.aboutMe}
                            </div>
                            <br></br>
                            <h1>Timetable</h1>
                            <div className="timetable" data-test="timetableComponent">

                                {this.state.classMessage && <div class="alert alert-success" data-test="alertMessage">{this.state.classMessage}</div>}
                                <div className="timetable-container">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Class</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                                <th>Day</th>
                                                <th>Location</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                            {
                                this.state.classes.map(
                                    c =>
                                        <tr key={c.id} data-test="timeTableItem">
                                            <td>{c.description}</td>
                                            <td>{c.startTime}</td>
                                            <td>{c.endTime}</td>
                                            <td>{c.day}</td>
                                            <td>{c.location}</td>
                                            {(this.state.username == AuthenticationService.getLoggedInUserName()) ? <td><button className="btn btn-danger "style={{borderRadius:"20px"}} onClick={() => this.deleteClassClicked(c.id)}>Delete</button></td> : <td></td>}
                                        </tr>
                                )
                            }
                        </tbody>
                                    </table>
                                    <div className="button-row">
                                        {(this.state.username == AuthenticationService.getLoggedInUserName()) ? <button className="btn btn-outline-secondary " style={{borderRadius:"20px"}} onClick={this.addClassClicked}>Add</button> : <div></div>}
                                    </div>
                                </div>

                            </div>

                        </div>




                        {/* The right side of the div will contain the users wall (WALL API) */}
                        <div className="profile-content-right">
                            <h1> RMIT Wall </h1>
                            <div className="profile-content-right-post">
                                <div className="profile-content-right-top-post" data-test="profileImg">
                                    <img src={this.state.imageUploadedBase64}></img> {this.state.firstName} {this.state.lastName}
                                </div>
                                <textarea onChange={this.handleChange} id="post-textarea" name="toBePosted" placeholder="Write your thoughts here..." type="text" />
                                <button className="btn btn-outline-primary" style={{borderRadius:"20px"}} onClick={this.addPost}>Post</button>
                            </div>
                            <ul className="profile-content-right-wall"  data-test="wallComponent">
                            
                                {this.renderPosts()}
                            </ul>


                        </div>

                    </div>
                </div>
            </div>

        )
    }
}

export default ProfileComponent
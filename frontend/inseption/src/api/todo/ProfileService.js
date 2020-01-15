import axios from "axios";
import { JPA_API_URL } from "../../Constants";

/*
This file is a javascript acting as a portal between the front end and the back end. The client side of the system
will push its properties into the backend side, and interact with the database, returning with data that can be used
to verify activity.
*/


class ProfileService {

    editUserProfileService(username, firstName, lastName, profilePicture, major, aboutMe) {
        console.log(`${ JPA_API_URL }/users/${username}/updateProfile`)
        let user = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            major : major,
            profilePicture : profilePicture,
            aboutMe: aboutMe
        }
        return axios.put(`${ JPA_API_URL }/users/${username}/updateProfile`, user)
    }

    retrieveProfile(name) {
        return axios.get(`${ JPA_API_URL }/users/${name}/profile`);
    }

    retrieveAllPosts(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/posts`);
    }

    retrieveTodo(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/posts/${id}`);
    }

    deletePost(name, id) {
        //console.log('executed service')
        return axios.delete(`${JPA_API_URL}/users/${name}/posts/${id}`);
    }

    updatePost(name, id, post) {
        //console.log('executed service')
        return axios.put(`${JPA_API_URL}/users/${name}/posts/${id}`, post);
    }

    createPost(name, post) {
        return axios.post(`${JPA_API_URL}/users/${name}/posts/`, post);
    }

    getAllUsers() {
        return axios.get(`${JPA_API_URL}/users/profiles`);
    }
   
}

export default new ProfileService();
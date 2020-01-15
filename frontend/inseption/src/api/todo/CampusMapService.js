import axios from "axios";
import { JPA_API_URL } from "../../Constants";

/*
This file is a javascript acting as a portal between the front end and the back end. The client side of the system
will push its properties into the backend side, and interact with the database, returning with data that can be used
to verify activity.
*/


class CampusMapService {

    updateEvent(id, username, title, descriptions, eventDate, eventEnd, buildingName) {
        let event = {
            id: id,
            username: username,
            title: title,
            descriptions: descriptions,
            eventDate : eventDate,
            eventEnd: eventEnd,
            buildingName : buildingName
        }
        return axios.put(`${ JPA_API_URL }/events/${username}/${id}`, event)
    }

    addEvent(username, title, descriptions, eventDate, eventEnd, buildingName) {
        let event = {
            username: username,
            title: title,
            descriptions: descriptions,
            eventDate : eventDate,
            eventEnd: eventEnd,
            buildingName : buildingName
        }
        return axios.post(`${ JPA_API_URL }/events/${username}`, event)
    }

    retrieveAllEventsByUser(name) {
        return axios.get(`${ JPA_API_URL }/events/${name}`);
    }

    retrieveAllEvents() {
        return axios.get(`${JPA_API_URL}/events`);
    }

    retrieveEventByUser(name, id) {
        return axios.get(`${JPA_API_URL}/events/${name}/${id}`);
    }

    deleteEvent(name, id) {
        return axios.delete(`${JPA_API_URL}/events/${name}/${id}`);
    }
   
}

export default new CampusMapService();
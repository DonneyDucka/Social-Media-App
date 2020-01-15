import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'

class ClassDataService {

    retrieveAllClasses(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/classes`);
    }
    retrieveClass(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/classes/${id}`);
    }

    retrieveCompletedClasses(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/classes/completed`);
    }

    deleteClass(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/classes/${id}`);
    }

    updateClass(name, id, c) {
        return axios.put(`${JPA_API_URL}/users/${name}/classes/${id}`, c);
    }

    createClass(name, c) {
        return axios.post(`${JPA_API_URL}/users/${name}/classes/`, c);
    }

}

export default new ClassDataService()
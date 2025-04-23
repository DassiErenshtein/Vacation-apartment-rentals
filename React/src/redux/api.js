import axios from "axios"
import { useDispatch } from "react-redux"
import { setCurrentUser } from "./Actions"
const basicUrl = "http://localhost:4333"
export const register = async (advertiser) => {
    // debugger
    try {
        let a = await axios.post(`${basicUrl}/advertiser/register`, advertiser)
        if (a.status === 200) {
            //setCurrentUser(a.data.user)            
            localStorage.setItem('token', a.data.token)
            return {a:true,m:a.data.advertiser};
        }
        else
            return {a:false,m:"error"};
    }
    catch (error) {
        return {a:false,m:error.response.data.error};
    }
}
export const login = async (email, password) => {
     debugger
    try {
        let a = await axios.post(`${basicUrl}/advertiser/login`, { email, password })
        debugger
        if (a.status === 200) {
            //setCurrentUser(a.data.user)            
            localStorage.setItem('token', a.data.token)
            return {a:true,m:a.data.user};
        }
        if (a.status === 405)

            return { a: false, m: "you need to register" };
        else
            return { a: false, m: "something wrong, try again later" };
    }
    catch (error) {
        console.log(error);
       return {a:false,m:error.response.data.error};
    }
}
//apartments
export const addApartment = async (apartment) => {
    // debugger
    try {
        let a = await axios.post(`${basicUrl}/apartment/add`, apartment, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        if (a.status === 200)
            return true;
        return false;
    }
    catch (error) {
        console.log(error);

    }
}
export const updateApartment = async (apartment) => {
    try {
        debugger
        let a = await axios.put(`${basicUrl}/apartment/update`, apartment, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        if (a.status === 200)
            return true;
        return false;
    }
    catch (error) {
        console.log(error);
    }
}
export const deleteApart = async (apartmentId) => {
    try {
        // debugger
        let a = await axios.delete(`${basicUrl}/apartment/delete/${apartmentId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        if (a.status === 200)
            return true;
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
export const getAllAparts = async () => {
    // debugger
    try {
        let a = await axios.get(`${basicUrl}/apartment/all`)
        return a.status === 200 ? a.data : false
    }
    catch (error) {
        console.log(error);
        return false;
    }

}
export const getByIdApartment = async (id) => {
    try {
        // debugger
        let list = await axios.get(`${basicUrl}/apartment/byid/${id}`)
        // debugger        
        return list.status===200?list.data.apartment:false;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const getApartByCodeCat = async (codeCat) => {
    try {
        let list = await axios.get(`${basicUrl}/apartment/byCat/${codeCat}`)
        return list.status===200? list.data:false;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const getApartByCodeCity = async (codeCity) => {
    try {
        let list = await axios.get(`${basicUrl}/apartment/byCity/${codeCity}`)
        return list.status===200? list.data:false;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const getApartByCodeAdvertiser = async (codeAdver) => {
    try {
        debugger
        let list = await axios.get(`${basicUrl}/apartment/byAdver/${codeAdver}`,{ headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        return list.status===200? list.data:false;
    } catch (error) {
        console.log(error);

        return false;
    }
}
export const getApartByBed = async (small, big) => {
    try {
        let list = await axios.get(`${basicUrl}/apartment/bybed?big=${big}&small=${small}`)
        return list.data;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
export const getApartByPrice = async (small, big) => {
    try {
        let list = await axios.get(`${basicUrl}/apartment/byprice?big=${big}&small=${small}`)
        return list.data;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
export const getApartByEqualPrice = async (val) => {
    try {
        let list = await axios.get(`${basicUrl}/apartment/byprice/equal/${val}`)
        return list.data;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
export const getApartByEqualBeds = async (val) => {
    try {
        let list = await axios.get(`${basicUrl}/apartment/bybed/equal/${val}`)
        return list.data;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
//category
export const addCategory = async (category) => {
    debugger
    try {
        let res = await axios.post(`${basicUrl}/category/add`, category,{ headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        return res.status === 200;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
export const getAllCats = async () => {
    try {
        let res = await axios.get(`${basicUrl}/category/all`)
        return res.status === 200 ? res.data : false
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
//city
export const addCity = async (city) => {
    try {
        let res = await axios.post(`${basicUrl}/city/add`, city,{ headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        return res.status ===200
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
export const getAllCities = async () => {
    try {
        let res = await axios.get(`${basicUrl}/city/all`)
        return res.status === 200 ? res.data : false
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
export const getWeatherCity = async (id) => {
    try {
        debugger
        let res = await axios.get(`${basicUrl}/city/weather/${id}`)
        return res.status === 200 ? res.data.weather[0].description : false
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
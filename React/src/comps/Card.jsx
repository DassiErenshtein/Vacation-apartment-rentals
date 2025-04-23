import { useNavigate, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import './Card.css'
import { useEffect, useRef, useState } from "react";
import { RedoTwoTone } from "@mui/icons-material";
import swal from "sweetalert";
import { getAllCats, getAllCities, getByIdApartment, getWeatherCity, updateApartment } from "../redux/api";
export const Card = () => {
  const params = useParams();
  const navigate = useNavigate();
  const thisUser = useSelector(store => store.currentUser)
  //  debugger
  let data = params;
  let apartCode = data.id;
  const [categories, setCategories] = useState([])
  const [cities, setCities] = useState([])
  let category="";
  let city="";
  // let store = useSelector(x => x.currentUser);
  const [weather,setWeather]=useState()
  const [apart, setApart] = useState({})
  const refInput = [useRef([]), useRef([]), useRef([]), useRef([]), useRef([]), useRef([]), useRef([]), useRef([]), useRef([])]
  // let car = store.cars.find(x => x.CarCode == carCode);
  useEffect(() => {
    let a = async () => {
      try {
        debugger
        if (thisUser == null)
          await navigate(`/apartments`);
        let apart = await getByIdApartment(apartCode)
        let weather=await getWeather(apart.codeCity._id)
        setWeather(weather)
        if (apart != false)
          setApart(apart)
        let c1, c2, b;
        c1 = await getAllCats();
        if (c1 != false)
          c1 = c1.categorys
        c2 = await getAllCities();
        if (c2 != false)
          c2 = c2.cities
        setCities(c2)
        setCategories(c1)
      }
      catch (error) {
        console.log(error);
      }

    }
    a()
  }, []);

  const delekRef = useRef(null);
  const priceRef = useRef(null);
  const cityRef = useRef(null);
  const streetRef = useRef(null);
  const [flag, setFlag] = useState(false);
  const getCarType = (code) => {

    // return store.carType.find(x => x.code == code);
  }
  const getCarModel = (codeModel) => {

    // return store.carModels.find(x => x.code == codeModel);
  }
  const setSetFlag = () => {
    setFlag(false);
  }
  const saveChanges = () => {
    // let delek = parseFloat(delekRef.current.value);
    // let price = parseInt(priceRef.current.value);
    // let city = cityRef.current.value;
    // let street = streetRef.current.value;
    // debugger
    // delek&&dispatch(setCar(car, 'TakesDelekPerKamash', delek));
    // price&&dispatch(setCar(car, 'PricePerHour', price));
    // city!=""&&dispatch(setCar(car, 'City', city));
    // street!=""&&dispatch(setCar(car, 'Street', street))  ;  
    swal('good!', 'השינויים נשמרו בהצלחה!', 'success')
  }
  const getWeather = async (id) => {
    try {
      let a = await getWeatherCity(id)
      console.log(a);
      debugger
      if(a)
        return a
      console.log("error!!!");
      
    }
    catch (error) {
      console.log(error);

    }
  }
  const save = async () => {
    if (refInput[0].current.value != "")
      apart.name = refInput[0].current.value;
    if (refInput[1].current.value != "")
      apart.description = refInput[1].current.value;
    if (refInput[2].current.value != "")
      apart.pic = refInput[2].current.value;
    apart.codeAdvertiser = apart.codeAdvertiser._id
    if (city != "")
      apart.codeCity =city
    if (category != "")
    apart.codeCategory = category;
    if (refInput[5].current.value != "")
      apart.address = refInput[5].current.value;
    if (refInput[6].current.value != "")
      apart.numOfBeds = refInput[6].current.value;
    if (refInput[7].current.value != "")
      apart.price = refInput[7].current.value;
    if (refInput[8].current.value != "")
      apart.adds = refInput[9].current.value;
    let a = await updateApartment(apart)
    debugger
    if (a)
      {
        swal('good', "the apartment updated succesfully", "success")
        navigate('/apartments')
      }
    else
      swal('error!!', "", "error")
  }
  return (
    <div id="bigCard">
      <div className="divDitails">
        <h1>{apart?.codeCategory?.name} {apart?.codeCity?.name} </h1><br></br><br></br>
        <h4>{apart?.description}  ,{apart?.adds}</h4>
        רק- <br></br>
        <h2>{apart?.price}₪ ללילה </h2>
        <div id="details">
          <p className="details">שם:<p>{thisUser?._id == apart?.codeAdvertiser?._id ? <input placeholder={apart?.name} type="text" ref={refInput[0]}></input> : <p>{apart?.name}</p>}</p></p>
          <p className="details">תיאור:<p>{thisUser?._id == apart?.codeAdvertiser?._id ? <input placeholder={apart?.description} type="text" ref={refInput[1]}></input> : <p>{apart?.description}</p>}</p></p>
          <p className="details">ניתוב לתמונה:<p>{thisUser?._id == apart?.codeAdvertiser?._id ? <input placeholder={apart?.pic} type="text" ref={refInput[2]}></input> : <p>{apart?.pic}</p>}</p></p>
          <p className="details">עיר:<p>{thisUser?._id == apart?.codeAdvertiser?._id ? <select placeholder={apart?.codeCategory?.name} type="text" ref={refInput[3]} onChange={()=>city=refInput[3].current.value}>
            {cities.map((city) => (
              <option key={city._id} value={city._id} name={city.name}>
                {city.name}
              </option>
            ))}
          </select> : <p>{apart?.codeCategory?.name}</p>}</p></p>
          <p className="details">קטגוריה:<p>{thisUser?._id == apart?.codeAdvertiser?._id ? <select placeholder={apart?.codeCity?.name} type="text" ref={refInput[4]} onChange={()=>category=refInput[4].current.value}>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id} name={cat.name}>
                {cat.name}
              </option>
            ))}
          </select> : <p>{apart?.codeCity?.name}</p>}</p></p>
          <p className="details">מזג אוויר לעיר:<p>{weather}</p></p>
          <p className="details">כתובת:<p>{thisUser?._id == apart?.codeAdvertiser?._id ? <input placeholder={apart?.address} type="text" ref={refInput[5]}></input> : <p>{apart?.address}</p>}</p></p>
          <p className="details">מספר מיטות:<p>{thisUser?._id == apart?.codeAdvertiser?._id ? <input placeholder={apart?.numOfBeds} type="number" ref={refInput[6]}></input> : <p>{apart?.numOfBeds}</p>}</p></p>
          <p className="details">מחיר:<p>{thisUser?._id == apart?.codeAdvertiser?._id ? <input placeholder={apart?.price} type="number" ref={refInput[7]}></input> : <p>{apart?.price}</p>}</p></p>
          <p className="details">תוספות:<p>{thisUser?._id == apart?.codeAdvertiser?._id ? <input placeholder={apart?.adds} type="text" ref={refInput[8]}></input> : <p>{apart?.adds}</p>}</p></p>
          {/* <p className="details">שם המפרסם:<p>{thisUser?._id == apart?.codeAdvertiser?._id ? <input placeholder={thisUser?.name} type="text" ref={delekRef}></input> : <p>{thisUser?.name}</p>}</p></p> */}
          <p className="details">פלאפון המפרסם :<p>  <p>{apart?.codeAdvertiser?.phone}</p></p></p>
          {apart?.codeAdvertiser?.anotherPhone != "" && <p className="details">פלאפון נוסף :<p><p>{apart?.codeAdvertiser?.anotherPhone}</p></p></p>}

        </div>
        {thisUser?._id == apart?.codeAdvertiser?._id && <button onClick={save}>לשינוי</button>}
      </div>
      <img src={apart?.pic} id="bigImgCard"></img>
      {/* {flag && <Rent car={car} setFlag={setSetFlag}></Rent>} */}
    </div>
  )
}
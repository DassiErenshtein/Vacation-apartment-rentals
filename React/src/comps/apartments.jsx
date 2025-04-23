import { useState, useEffect, useRef } from "react"
import { getAllAparts, getAllCats, getAllCities, getApartByCodeCat, deleteApart, getApartByCodeCity, getApartByEqualBeds, getApartByBed, getApartByEqualPrice, getApartByPrice, getApartByCodeAdvertiser } from "../redux/api.js";
import { Card } from "./Card.jsx";
import { useSelector } from "react-redux";
import PopUp from "./pop.jsx";
import './apartments.css'
import './style.css'
import swal from "sweetalert";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
export const Apartments = () => {debugger
    const params = useParams();
    let data = params;
    if(data.id!=undefined)
    {
        changeCity(data.id)
    }
    const [apartments, setApartments] = useState([])
    const [categories, setCategories] = useState([])
    const [cities, setCities] = useState([])
    const [flagCity, setFlagCity] = useState(false)
    const [flagCategory, setFlagCategory] = useState(false)
    const [flagApartment, setFlagApartment] = useState(false)
    const navigate = useNavigate()
    const fleetCarsRef = useRef({})
    const thisUser = useSelector(store => store.currentUser)
    const bedMinRef = useRef({})
    const bedEqualsRef = useRef({})
    const bedMaxRef = useRef({})
    const priceMinRef = useRef({})
    const priceEqualsRef = useRef({})
    const priceMaxRef = useRef({})
    const [cityModel, setCityModel] = useState([])
    const [categoryModel, setCategoryModel] = useState([])
    const [apartmentModel, setApartmentModel] = useState([])
    useEffect(() => {
        // debugger
       initial();
    }, []);
    const initial = async () => {
        try {
            let c1, c2, b;
            c1 = await getAllCats();
            if (c1 != false)
                c1 = c1.categorys
            c2 = await getAllCities();
            if (c2 != false)
                c2 = c2.cities
            b = await getAllAparts()
            if (b != false)
                b = b.apartments
            setCategories(c1)
            setCities(c2)
            setApartments(b)
            //lists of models
            setCityModel(["עיר", { type: "text", value: "name" }])
            setCategoryModel(["קטגוריה", { type: "text", value: "name" }])
            setApartmentModel(["דירה", { type: "text", value: "name" },
                { type: "text", value: "description" }, { type: "text", value: "pic" }, { type: "select", value: c1 }, { type: "select", value: c2 },
                { type: "text", value: "address" }, { type: "number", value: "numOfBeds" }, { type: "text", value: "adds" }, { type: "number", value: "price" }])
        }
        catch (error) {
            console.log(error);
        }

    }
    const deleteApartm = async (id) => {
        Swal.fire({
            title: "בטוח?",
            text: "ברצונך למחוק דירה זו?",
            showCancelButton: true,
            confirmButtonText: "כן",
            cancelButtonText: `לא`
        }).then(async (result) => {
            if (result.isConfirmed) {
                debugger
                try {
                    let a = await deleteApart(id)
                    if (a == true)
                        swal('deleted', 'the apartment deleted succefully!!', 'success');
                    else
                        swal('error!!', 'didnot delete, try again', 'error')
                }
                catch (error) {
                    swal('error!!', 'didnot delete, try again', 'error')
                }
            }
        })
    }
    const changeSelect = async (e, change) => {
        // debugger

        change(e);
        if (fleetCarsRef.current) {
            fleetCarsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const toResetSelect = async () => {
        try {
            let a = await getAllAparts()
            setApartments(a.apartments)
        }
        catch (error) {
            console.log(error);
        }
    }
    const changeCategory = async (item) => {
        // debugger
        try {
            let a;
            if (item.currentTarget.value == "add") {
                setFlagCategory(true)
            }
            else {
                a = await getApartByCodeCat(item.target.value)
                setApartments(a)

            }

        }
        catch (error) {
            console.log(error);
        }
    }
    const changeCity = async (item) => {
        debugger
        try {
            let a;
            if (item?.currentTarget.value == "add") {
                setFlagCity(true)
            }
            else {
                a = await getApartByCodeCity(item.target.value)
                setApartments(a)
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const changeBed = async (item) => {
        // debugger
        try {
            let a;
            if (bedEqualsRef.current.value != "") {
                a = await getApartByEqualBeds(+bedEqualsRef.current.value)
                setApartments(a)
            }
            else {
                let min = 0, max = 999999990000000000000
                if (bedMaxRef.current.value != "")
                    max = +bedMaxRef.current.value;
                if (bedMinRef.current.value != "")
                    min = +bedMinRef.current.value;
                if (min != 0 || max != Number.MAX_VALUE) {
                    a = await getApartByBed(min, max)
                    setApartments(a)
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const changePrice = async (item) => {
        // debugger
        try {
            let a;
            if (priceEqualsRef.current.value != "") {
                a = await getApartByEqualPrice(+priceEqualsRef.current.value)
                setApartments(a)
            }
            else {
                let min = 0, max = 999999990000000000000
                if (priceMaxRef.current.value != "")
                    max = +priceMaxRef.current.value;
                if (priceMinRef.current.value != "")
                    min = +priceMinRef.current.value;
                if (min != 0 || max != Number.MAX_VALUE) {
                    a = await getApartByPrice(min, max)
                    setApartments(a)
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const removeBedPrice = (which) => {
        which.current.value = "";
    }
    const advertiserAparts = async (item) => {
        try {
            debugger
            let a = await getApartByCodeAdvertiser(thisUser._id)
            if (a != false)
                setApartments(a)
            else
                setApartments([])
        }
        catch (error) {
            console.log(error);
            setApartments([])
        }
    }
    debugger
    return (<>
        <div id="carDiv">
            <div className="image-container">
                <img className='imgf' src={'/pics/n9.jpg'} alt="vacation" />
                <div className="filtert">
                    <select
                        className="select"
                        onChange={(e) => changeSelect(e, changeCategory)}>
                        <option value="all">בחר קטגוריה</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id} name={cat.value}>
                                {cat.name}
                            </option>
                        ))}
                        {/* <option value="all" name="choose">איפוס</option> */}
                        {thisUser &&
                            <option value="add" >הוספת קטגוריה</option>
                        }
                    </select>
                    <select
                        className="select"
                        // value={"בחר קטגוריה"}
                        onChange={(e) => changeSelect(e, changeCity)}>
                        <option value="all">בחר עיר</option>
                        {cities.map((city) => (
                            <option key={city._id} value={city._id} name={city.name}>
                                {city.name}
                            </option>
                        ))}
                        {thisUser &&
                            <option value="add" >הוספת עיר</option>
                        }
                        {/* <option value="all" name="choose">איפוס</option> */}
                    </select>
                    <div className="input-container" id="date-picker-container">
                        <label htmlFor="date-checkout">מספר מיטות</label>
                        <div className="inputDivS">
                            <input
                                ref={bedMinRef}
                                type="number"
                                id="date-checkout"
                                className="date-field"
                                placeholder="מינימום"
                                onChange={() => { removeBedPrice(bedEqualsRef) }}
                            />
                            <input
                                ref={bedEqualsRef}
                                type="number"
                                id="date-checkout"
                                className="date-field"
                                placeholder="בדיוק"
                                onChange={() => {
                                    removeBedPrice(bedMaxRef);
                                    removeBedPrice(bedMinRef)
                                }}
                            />
                            <input
                                ref={bedMaxRef}
                                type="number"
                                id="date-checkout"
                                className="date-field"
                                placeholder="מקסימום"
                                onChange={() => { removeBedPrice(bedEqualsRef) }}
                            />
                            <div className="button-container"
                                onClick={() => changeSelect(1, changeBed)}
                            >
                                <span className="button ok"
                                >אישור</span>
                            </div>

                        </div>
                    </div>
                    <div className="input-container" id="date-picker-container">
                        <label htmlFor="date-checkout">מחיר</label>
                        <div className="inputDivS">
                            <input
                                ref={priceMinRef}
                                type="number"
                                id="date-checkout"
                                className="date-field"
                                placeholder="מינימום"
                                onChange={() => { removeBedPrice(priceEqualsRef) }}
                            />
                            <input
                                ref={priceEqualsRef}
                                type="number"
                                id="date-checkout"
                                className="date-field"
                                placeholder="בדיוק"
                                onChange={() => {
                                    removeBedPrice(priceMaxRef);
                                    removeBedPrice(priceMinRef)
                                }}
                            />
                            <input
                                ref={priceMaxRef}
                                type="number"
                                id="date-checkout"
                                className="date-field"
                                placeholder="מקסימום"
                                onChange={() => { removeBedPrice(priceEqualsRef) }}
                            />
                            <div className="button-container" onClick={() => changeSelect(1, changePrice)}>
                                <span className="button ok">אישור</span>
                            </div>
                        </div>
                    </div>
                    {thisUser && <div className="button-container" id="buttonMine" onClick={() => changeSelect(1, advertiserAparts)}>
                        <span className="button ok">רק דירות שלי</span>
                    </div>}
                    <div className="selectReset" onClick={toResetSelect}>
                        לאיפוס
                        <img src='/pics/reset3.png' ></img>
                    </div>
                </div>
            </div>
            <div id='fleetCars' ref={fleetCarsRef}>
                {thisUser &&
                    <img src='/pics/plus.png' id='plus' onClick={() => setFlagApartment(true)}></img>
                }
                {apartments.length > 0 ? apartments.map(element => (
                    <div className='cardDiv1' key={element._id}
                    // onClick={()=>() => {
                    //     debugger
                    //     if (thisUser) {
                    //         navigate(`/card/${element._id}`);
                    //     }
                    //     else {
                    //         navigate('/Login/');
                    //     }
                    // }}

                    >
                        <div id='divImgCar'>
                            <img src={element.pic} alt={`${element?.codeCategory.name} ${element?.codeCity.name}`} id='imgcar' />
                        </div>
                        <div id='cardDesc'>
                            <h2 id="descApart">{element.codeCategory.name} {element.codeCity.name}</h2><br />
                            <div id='picAndDesc'>
                                {/* <img className='icon' src={element.pic} /> */}
                                <div>{element.description}  ,{element.adds}<br />
                                    {element.price}  ש"ח ללילה  |
                                    {element.address} {element.codeCity.name} <br />
                                    {element.numOfBeds} מיטות
                                </div>
                                {thisUser && thisUser._id == element.codeAdvertiser._id && (
                                    <img className='pach' src={'/delete3.png'} onClick={() => deleteApartm(element._id)}></img>
                                )}
                            </div>
                        </div>
                        <button id='rentCar' onClick={() => {
                            if (thisUser) {
                                navigate(`/card/${element._id}`);
                            }
                            else {
                                navigate('/Login/');
                            }
                        }}>{thisUser && thisUser._id == element.codeAdvertiser._id ? "לעדכון ופרטים נוספים" : "לפרטים"}</button>
                    </div>
                )
                ) : <p style={{ textAlign: "center", width: "100%", marginBottom: "1%" }}>לא נמצאו דירות תואמות לקריטריונים</p>}
            </div>
            {flagCategory && <PopUp thisUser={null} list={categoryModel} type={"category"}> </PopUp>}
            {flagCity && <PopUp thisUser={null} list={cityModel} type={"city"}></PopUp>}
            {flagApartment && <PopUp thisUser={null} list={apartmentModel} type={"apartment"}></PopUp>}
        </div>

    </>

    )
}


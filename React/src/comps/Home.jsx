import { useEffect, useState } from "react"
import './home.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getAllCats, getAllCities, getWeatherCity } from "../redux/api.js";
export const Home = () => {
    const [listCities, setListCities] = useState([])
    const [listW, setListW] = useState([])
    const [listCat, setListCat] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const a = async () => {
            debugger
            try {
                const listCities = await getAllCities()
                const listCat = await getAllCats()
                setListCat(listCat)
                setListCities(listCities)
            }
            catch (error) {
                console.log(error);
            }

        }
        a()
    }, []);
    return <div id="bodyHome">
        <header>

            <div class="hero">
                <h1>ברוכים הבאים לנופש המושלם!</h1>
                <p>השכרת דירות, יחידות וצימרים לנופש חוויתי ובלתי נשכח</p>
                {/* <a href="#cities" class="btn">גלה עוד</a> */}
            </div>
        </header >

        <main>
            <div id="about1234">
                <h2>מי אנחנו?</h2>
                <p>אנו מציעים חוויית נופש ייחודית, עם מגוון דירות, יחידות וצימרים מפוארים ברחבי הארץ. כל יחידה מציעה נוחות, יוקרה ומיקום מושלם כדי להבטיח חופשה מושלמת.</p>
            </div>

            <div id="cities">
                <h2>ערים נבחרות</h2>
                <div class="cities-grid">
                    <button class="city-btn">תל אביב</button>
                    <button class="city-btn">ירושלים</button>
                    <button class="city-btn">חיפה</button>
                    <button class="city-btn">אילת</button>
                </div>
            </div>

            <div id="categories">
                <h2>סוגי אירוח</h2>
                <div class="categories-grid">
                    <button class="category-btn">צימרים</button>
                    <button class="category-btn">דירות יוקרה</button>
                    <button class="category-btn">יחידות נופש</button>
                </div>
            </div>
        </main>

        <footer>
            <p>כל הזכויות שמורות © 2024 | נופש חלומי</p>
        </footer>

    </div >
}
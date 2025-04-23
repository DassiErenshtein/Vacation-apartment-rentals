import { Route, Routes } from "react-router-dom"
import { Login } from "./Login"
import { Register } from "./Register"
import { Home } from "./Home"
import { Card } from './Card'
import { Apartments } from "./apartments"
export const Routing = () => {
    return <>
        <Routes>
            <Route path="register" element={<Register></Register>}></Route>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="home" element={<Home></Home>}></Route>
            <Route path="card/:id" element={<Card></Card>}></Route>
            <Route path="apartments" element={<Apartments></Apartments>} 
            ></Route>

        </Routes>
    </>
}
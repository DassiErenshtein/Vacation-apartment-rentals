import City from "../models/City.js"
export const addCity = async(req, res) => {
    const { name } = req.body;
    if (name) {
        try {
            let c = await City.find({ name: { $eq: name } })
            if (c.length>0) {
                return res.status(405).send("the city had been exists")
            }
            let newCity = new City({
                name,
                apartments: []
            })
            newCity.save().then(() => {
                res.status(200).send("the city adds succesfully")
            })
                .catch((err) => {
                    eror: err
                })
        }
        catch (error) {
            return res.status(500).send("erorr, please try again")
        }
    }
}
export const getAll = (req, res) => {
    City.find()
        .then(list => {
            res.status(200).send({ cities: list })
        })
        .catch(err => {
            res.status(404).send("the connection is not good, try again later")
        })
}
export const getWeather = async (req, res) => {
    let id = req.params.id
    if (id) {
        try {
            let city = await City.findById(id)
            return res.status(200).redirect(`http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=47c36f4f74ec7d9aa14055e593cac548`);
        }
        catch {
            res.status(500).send("error")
        }
    }
    else
        res.status(500).send("id is invalid")
}

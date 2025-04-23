import Category from "../models/Category.js"
export const addCategory = async (req, res) => {
    const { name } = req.body;
    if (name) {
        try {
            let c = await Category.find({ name: { $eq: name } })
            if (c.length > 0) {
                return res.status(405).send("the city had been exists")
            }

            let newCat = new Category({
                name,
                apartments: []
            })
            newCat.save().then(() => {
                return res.status(200).send("the city adds succesfully")
            })
                .catch((err) => {
                    console.log(err);
                    return res.status(500).send("erorr, please try again1")
                })
        }
        catch (error) {
            return res.status(500).send("erorr, please try again")
        }
    }
}
export const getAll = (req, res) => {
    Category.find()
        .then(list => {
            res.status(200).send({ categorys: list })
        })
        .catch(err => {
            res.status(404).send("the connection is not OK, try again later")
        })
}

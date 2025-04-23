import Advertiser from "../models/Advertiser.js";
import Apartment from "../models/Apartment.js"
import Category from "../models/Category.js";
import City from "../models/City.js";
// export const addApartment = async (req, res) => {
//     let { name, description, pic, codeCategory, codeCity, address, numOfBeds, adds, price, codeAdvertiser } = req.body;
//     let newAp;
//     if (description && pic && codeCategory && codeCity && address && numOfBeds && adds && price && codeAdvertiser) {
//         let category = await Category.findById(codeCategory)
//         if (!category)
//             return res.status(400).send("You didnot fill all the fields")
//         let city = await City.findById(codeCity)
//         if (!city)
//             return res.status(400).send("You didnot fill all the fields")
//         let advertiser = await Advertiser.findById(codeAdvertiser)
//         if (!advertiser)
//             return res.status(400).send("You didnot fill all the fields")
//         newAp = new Apartment({ name, description, pic, codeCategory, codeCity, address, numOfBeds, adds, price, codeAdvertiser })
//         await newAp.save()
//             .then(async (x) => {
//                 // category.apartments.push(newAp);             
//                 category.apartments.push(newAp._id);
//                 await Category.updateOne({ _id: codeCategory }, { $set: { apartments: category.apartments } })
//                     .catch(err => {
//                         return res.status(500).send(err)
//                     })
//                 city.apartments.push(newAp._id);
//                 await City.updateOne({ _id: codeCity }, { $set: { apartments: city.apartments } })
//                     .catch(err => {
//                         return res.status(500).send(err)
//                     })
//                 advertiser.apartments.push(newAp._id);
//                 await Advertiser.updateOne({ _id: codeAdvertiser }, { $set: { apartments: advertiser.apartments } })
//                     .catch(err => {
//                         return res.status(500).send(err)
//                     })
//                 return res.status(200).send(`${name}, your apartment adds succesfully`)
//             })
//             .catch(b => { return res.status(500).send({ error: b.errmsg }) })
//     }
//     else
//         res.status(400).send("you didnot fill all the fields")
// }

// export const update = async (req, res) => {
//     const { id, name, description, pic, codeCategory, codeCity, address, numOfBeds, adds, price, codeAdvertiser } = req.body
//     if (id && description && pic && codeCategory && codeCity && address && numOfBeds && adds && price && codeAdvertiser) {
//         try {
//             let advertiser = await Advertiser.findOne({ email: { $eq: req.email } })
//             let thisApartment = await Apartment.findById(id)

//             if (!advertiser || thisApartment.codeAdvertiser != advertiser._id)
//                 return res.status(403).send("you dont have permission")
//             if (thisApartment) {
//                 let adv, oldAdv, city, oldCity, cat, oldCat
//                 if (thisApartment.codeAdvertiser != codeAdvertiser) {
//                     await Advertiser.findById(codeAdvertiser).then(x => {
//                         adv = x
//                     })
//                         .catch(x => {
//                             return res.status(500).send("Server error:" + x)
//                         })
//                 }
//                 if (thisApartment.codeCategory != codeCategory) {
//                     await Category.findById(codeCategory).then(
//                         x => {
//                             cat = x
//                         }
//                     ).catch(err => {
//                         return res.status(500).send("Server error:" + x)
//                     })
//                 }
//                 if (thisApartment.codeCity != codeCity) {
//                     await City.findById(codeCity)
//                         .then(x => {
//                             city = x
//                         }).catch(err => {
//                             return res.status(500).send("Server error:" + x)
//                         })
//                 }

//                 await Apartment.updateOne({ _id: id }, { $set: { name: name, description: description, pic: pic, codeCategory: codeCategory, codeCity: codeCity, address: address, numOfBeds: numOfBeds, adds: adds, price, codeAdvertiser } })
//                     .then(async x => {
//                         if (thisApartment.codeAdvertiser != codeAdvertiser) {
//                             //מציאת המפרסם הישן
//                             await Advertiser.findOne({ _id: thisApartment.codeAdvertiser }).then(
//                                 async x => {
//                                     oldAdv = x
//                                     // אם קיים, מחיקת הקוד של הדירה 
//                                     if (oldAdv && oldAdv.apartments) {
//                                         oldAdv.apartments.remove(id)
//                                         //עדכון המפרסם הישן
//                                         try {
//                                             await Advertiser.findByIdAndUpdate(thisApartment.codeAdvertiser, oldAdv)
//                                         }
//                                         catch (error) {
//                                             return res.status(500).send("error")
//                                         }
//                                     }
//                                     else
//                                         return res.status(500).send("error")
//                                 }
//                             ).catch(x => {
//                                 return res.status(500).send("error1:" + x)
//                             }
//                             )
//                             //הוספת הקוד למערך של החדש
//                             adv.apartments.push(id)
//                             //עדכון המפרסם החדש
//                             await Advertiser.findByIdAndUpdate(codeAdvertiser, adv)
//                         }
//                         if (thisApartment.codeCategory != codeCategory) {
//                             //מציאת המפרסם הישן
//                             await Category.findOne({ _id: thisApartment.codeCategory }).then(
//                                 async x => {
//                                     oldCat = x
//                                     // אם קיים, מחיקת הקוד של הדירה 
//                                     if (oldCat && oldCat.apartments) {
//                                         oldCat.apartments.remove(id)
//                                         //עדכון המפרסם הישן
//                                         try {
//                                             await Category.findByIdAndUpdate(thisApartment.codeCategory, oldCat)
//                                         }
//                                         catch (error) {
//                                             return res.status(500).send("error")
//                                         }
//                                     }
//                                     else
//                                         return res.status(500).send("error")
//                                 }
//                             ).catch(x => {
//                                 return res.status(500).send("error1:" + x)
//                             }
//                             )
//                             //הוספת הקוד למערך של החדש
//                             cat.apartments.push(id)
//                             //עדכון המפרסם החדש
//                             await Category.findByIdAndUpdate(codeCategory, cat)
//                         }
//                         if (thisApartment.codeCity != codeCity) {
//                             //מציאת המפרסם הישן
//                             await City.findOne({ _id: thisApartment.codeCity }).then(
//                                 async x => {
//                                     oldCity = x
//                                     // אם קיים, מחיקת הקוד של הדירה 
//                                     if (oldCity && oldCity.apartments) {
//                                         oldCity.apartments.remove(id)
//                                         //עדכון המפרסם הישן
//                                         try {
//                                             await City.findByIdAndUpdate(thisApartment.codeCity, oldCity)
//                                         }
//                                         catch (error) {
//                                             return res.status(500).send("error")
//                                         }
//                                     }
//                                     else
//                                         return res.status(500).send("error")
//                                 }
//                             ).catch(x => {
//                                 return res.status(500).send("error1:" + x)
//                             }
//                             )
//                             //הוספת הקוד למערך של החדש
//                             city.apartments.push(id)
//                             //עדכון המפרסם החדש
//                             await City.findByIdAndUpdate(codeCity, city)
//                         }

//                         return res.status(200).send({ message: "update succesfully!", x })
//                     }).catch(err => { return res.status(500).send(err) })
//             }
//         }
//         catch (error) {
//             return res.status(500).send("error")
//         }
//     }
//     else
//         return res.status(500).send('error')
// }
export const addApartment = async (req, res) => {
    // מקבלת את האובייקט החדש בגוף הבקשה
    let { name, description, pic, codeCategory, codeCity, address, numOfBeds, adds, price, codeAdvertiser } = req.body;
    let newAp;
    if (description && pic && codeCategory && codeCity && address && numOfBeds && adds && price && codeAdvertiser) {
        newAp = new Apartment({ name, description, pic, codeCategory, codeCity, address, numOfBeds, adds, price, codeAdvertiser })
        await newAp.save()
            // פונקציית הוספה - מופעלת על האובייקט
            .then(async apart => {
                // הוספת קוד הכתבה החדשה למערך של הקטגוריה
                let x = await Category.findByIdAndUpdate(codeCategory, { $push: { apartments: apart._id } })
                if (!x) {
                    return res.status(200).send({ message: `create apartment ${apart._id} succeed! update category failed!` })
                }
                let y = await Advertiser.findByIdAndUpdate(codeAdvertiser, { $push: { apartments: apart._id } })
                if (!y) {
                    return res.status(200).send({ message: `create apartment ${apart._id} succeed! update category failed!` })
                }
                let z = await City.findByIdAndUpdate(codeCity, { $push: { apartments: apart._id } })
                if (!z) {
                    return res.status(200).send({ message: `create apartment ${apart._id} succeed! update category failed!` })
                }
                return res.status(200).send({ message: `create article ${apart._id} succeed!` })
            })
            .catch(err => {
                res.status(500).send({ error: err.message })
            })
    }
}
export const update = async (req, res) => {
    const id = req.body._id
    await Apartment.findByIdAndUpdate(id, req.body
        // , { new: true }
    )
        // בברירת מחדל - מחזיר את האובייקט לפני השינוי
        // בשביל לשנות את ברירת המחדל - מוסיפה אובייקט אפשרויות
        // שמכיל את ההגדרה: { new: true }
        .then(async apart => {
            let apart1=await apart
            // עדכון
            if (req.body.codeCategory) {
                let y = await Category.findByIdAndUpdate(apart1.codeCategory, { $pull: { apartments: apart._id } })
                let x = await Category.findByIdAndUpdate(req.body.codeCategory, { $push: { apartments: apart._id } })
                if (!x || !y) {
                    return res.status(400).send({ message: `update apartment ${apart._id} succeed! update categories failed!` })
                }
            }
            if (req.body.codeCity) {
                let y = await City.findByIdAndUpdate(apart.codeCity, { $pull: { apartments: apart._id } })
                let x = await City.findByIdAndUpdate(req.body.codeCity, { $push: { apartments: apart._id } })
                if (!x || !y) {
                    return res.status(400).send({ message: `update apartment ${apart._id} succeed! update cities failed!` })
                }
            }
            if (req.body.codeAdvertiser) {
                let y = await Advertiser.findByIdAndUpdate(apart.codeAdvertiser, { $pull: { apartments: apart._id } })
                let x = await Advertiser.findByIdAndUpdate(req.body.codeAdvertiser, { $push: { apartments: apart._id } })
                if (!x || !y) {
                    return res.status(400).send({ message: `update apartment ${apart._id} succeed! update cities failed!` })
                }
            }
            return res.status(200).send({ message: `update apartment ${apart._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const deleteApart = async (req, res) => {
    const { id } = req.params

    Apartment.findByIdAndDelete(id)
        .then(async apart => {
            let x = await Category.findByIdAndUpdate(apart.codeCategory, { $pull: { apartments: apart._id } })
            if (!x) {
                return res.status(200).send({ message: `delete apartment ${apart.name} succeed! update category failed!` })
            }
            let y = await City.findByIdAndUpdate(apart.codeCity, { $pull: { apartments: apart._id } })
            if (!y) {
                return res.status(200).send({ message: `delete apartment ${apart.name} succeed! update category failed!` })
            }
            let z = await Advertiser.findByIdAndUpdate(apart.codeAdvertiser, { $pull: { apartments: apart._id } })
            if (!z) {
                return res.status(200).send({ message: `delete apartment ${apart.name} succeed! update category failed!` })
            }
            return res.status(200).send({ message: `delete apartment ${apart._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//     export const deleteApart = async (req, res) => {
//     let id = req.params.id
//     try {
//         let advertiser = await Advertiser.findOne({ email: { $eq: req.email } })
//         let apart = await Apartment.findById(id).populate({path:'codeAdvertiser'})
//         if (!advertiser || apart.codeAdvertiser.id != advertiser.id)
//             return res.status(403).send("you dont have permission")
//         await Apartment.findByIdAndDelete(id)
//         //delete from advertisers
//         let adv
//         await Advertiser.findById(apart.codeAdvertiser).then(x => {
//             adv = x
//         }).catch(x => {
//             return res.status(500).send("error")
//         }
//         )
//         try {
//             await adv.apartments.remove(id)
//             await Advertiser.findByIdAndUpdate(apart.codeAdvertiser, adv)
//         }
//         catch (error) {
//             return res.status(500).send("error")
//         }
//         //delte from citiess
//         let city
//         await City.findById(apart.codeCity).then(x => {
//             city = x
//         }).catch(x => {
//             return res.status(500).send("error")
//         }
//         )
//         try {
//             await city.apartments.remove(id)
//             await City.findByIdAndUpdate(apart.codeCity, city)
//         }
//         catch (error) {
//             return res.status(500).send("error")
//         }
//         //category delete
//         let cat
//         await Category.findById(apart.codeCategory).then(x => {
//             cat = x
//         }).catch(x => {
//             return res.status(500).send("error")
//         }
//         )
//         try {
//             await cat.apartments.remove(id)
//             await Category.findByIdAndUpdate(apart.codeCategory, cat)
//         }
//         catch (error) {
//             return res.status(500).send("error")
//         }
//         res.status(200).send("deleted")
//     }
//     catch (error) {
//         return res.status(500).send("this id is undefined")
//     }
// }
export const getAll = (req, res) => {
    Apartment.find()
    .populate({path:'codeCategory'}).populate({path:'codeCity'}).populate({path:'codeAdvertiser'})
        .then(list => {
            res.status(200).send({ apartments: list })
        })
        .catch(err => {
            res.status(404).send("the connection is not OK, please try again later")
        })
}
export const getById = async (req, res) => {
    Apartment.findById(req.params.id)
        .populate({path:'codeAdvertiser'}).populate({path:'codeCity'}).populate({path:'codeCategory'})
        // בעת הצלחה
        // הפונקציה הפנימית מקבלת פרמטר שמכיל את המערך שחזר מהשליפה - כל המאמרים
        .then(apart => {
            if (!apart) {
                return res.status(404).send({ error: `apartment not found!` })
            }
            //res.render(`http://api.openweathermap.org/data/2.5/weather?q=${apart.codeCity.name}&appid=47c36f4f74ec7d9aa14055e593cac548`, function (err, html) {
            // if(error)
            //     return console.log(error);

            res.status(200).send({ apartment: apart })
            // })
            //let weather=res.redirect(`http://api.openweathermap.org/data/2.5/weather?q=${apart.codeCity.name}&appid=47c36f4f74ec7d9aa14055e593cac548`);
            //res.status(200).send({apartment:apart,weather})
        })
        // בעת כשלון
        // הפונקציה הפנימית מקבלת פרמטר שמכיל את הנתונים על השגיאה
        .catch(err => {
            res.status(500).send({ error: "didnot render" + err.message })
        })

    // if (id) {
    //     try {
    //         let apart = await Apartment.findById(id)
    //         let weather=redirect(`http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=47c36f4f74ec7d9aa14055e593cac548`);
    //         res.status(200).send({apartment:apart,weather})
    //     }
    //     catch (error) {
    //         res.status(500).send('the id is invalid')
    //     }
    // }
}
export const getByCodeCat = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            let aparts = await Apartment.find({ codeCategory: { $eq: id } })
            .populate({path:'codeCategory'}).populate({path:'codeCity'}).populate({path:'codeAdvertiser'})
            res.status(200).send(aparts)
        }
        catch (error) {
            res.status(500).send('the id is invalid')
        }
    }
}
export const getByCodeCity = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            let aparts = await Apartment.find({ codeCity: { $eq: id } })
            .populate({path:'codeCategory'}).populate({path:'codeCity'}).populate({path:'codeAdvertiser'})
            res.status(200).send(aparts)
        }
        catch (error) {
            res.status(500).send('the id is invalid')
        }
    }
}
export const getByBed = async (req, res) => {
    let small = +req.query.small
    let big = +req.query.big
    //if (typeof small == "number" && typeof big == "number") {
        try {
            let aparts = await Apartment.find({
                $and: [
                             { numOfBeds: { $gt: small } },
                             { numOfBeds: { $lt: big } }
                         ]
                // numOfBeds: $and[
                //     { $gt: small },
                //     { $lt: big }
                // ]
            })
             .populate({path:'codeCategory'}).populate({path:'codeCity'}).populate({path:'codeAdvertiser'})
            res.status(200).send(aparts)
        }
        catch (error) {
            res.status(500).send("error, try again please!")
        }
    //}
}
export const equalBed = async (req, res) => {
    let val = req.params.val
    try {
        let aparts = await Apartment.find({ numOfBeds: { $eq: val } })
        .populate({path:'codeCategory'}).populate({path:'codeCity'}).populate({path:'codeAdvertiser'})
        res.status(200).send(aparts)
    }
    catch (error) {
        res.status(500).send("error")
    }
}
export const getByPrice = async (req, res) => {
    let small = req.query.small
    let big = req.query.big
    //if (typeof small == "number" && typeof big == "number") {
        try {
            let aparts = await Apartment.find({
                $and: [
                    { price: { $gt: small } },
                    { price: { $lt: big } }
                ]
            })
            .populate({path:'codeCategory'}).populate({path:'codeCity'}).populate({path:'codeAdvertiser'})
            res.status(200).send(aparts)
        }
        catch (error) {
            res.status(500).send("error, try again please!")
        }
    //}
}
export const equalPrice = async (req, res) => {
    let val = req.params.val
    try {
        let aparts = await Apartment.find({ price: { $eq: val } })
        .populate({path:'codeCategory'}).populate({path:'codeCity'}).populate({path:'codeAdvertiser'})
        res.status(200).send(aparts)
    }
    catch (error) {
        res.status(500).send("error")
    }
}
export const getByAdvertiser = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            let aparts = await Apartment.find({ codeAdvertiser: { $eq: id } })
            .populate({path:'codeCategory'}).populate({path:'codeCity'}).populate({path:'codeAdvertiser'})
            res.status(200).send(aparts)
        }
        catch (error) {
            res.status(500).send('the id is invalid')
        }
    }
}
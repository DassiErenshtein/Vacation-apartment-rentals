import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert';
import { useEffect } from 'react';
import { addCategory, addCity, addApartment } from '../redux/api';
export const AddModel = (props) => {
  let { setFlag, flag, list, type } = props;
  let title = list.length > 0 ? list[0] : "";
  list = list.slice(1)
  let list1;
  const thisUser = useSelector(store => store.currentUser)
  if (list.length > 6) {
    list1 = list.slice(list.length / 2)
    list = list.slice(0, list.length / 2)
  }
  const send = async (e) => {
    debugger
    e.preventDefault();
    if (type == "city") {
      if (e.target[0].value != "") {

        try {
          let city = { name: e.target[0].value }
          let s = await addCity(city)
          if (s == true) {
            swal('good!', 'העיר נוספה בהצלחה!', 'success');
            setFlag(false);
          }
          else {
            swal('oops', 'העיר כבר קיימת במערכת', 'error');
          }
        }
        catch (error) {
          console.log(error);
          swal('oops', 'העיר כבר קיימת במערכת', 'error');
        }
      }
    }
    else if (type == "category") {
      if (e.target[0].value != "") {
        try {
          let category = { name: e.target[0].value }
          let s = await addCategory(category)
          if (s == true) {
            swal('good!', 'הקטגוריה נוספה בהצלחה!', 'success');
            setFlag(false);
          }
          else {
            swal('oops', 'הקטגוריה כבר קיימת במערכת', 'error');
          }
        }
        catch (error) {
          console.log(error);
          swal('oops', 'הקטגוריה כבר קיימת במערכת', 'error');
        }
      }
    }
    else if (type == "apartment") {
      debugger
      if (e.target[1].value != "" && e.target[2].value != ""
        && e.target[3].value != "" && e.target[4].value != "" &&
        e.target[5].value != "" && e.target[6].value != "" &&
        e.target[7].value != "" && e.target[8].value != "") {
        try {
          let newApart = {
            name: e.target[0].value,
            description: e.target[1].value,
            pic: e.target[2].value,
            codeCategory: e.target[3].value,
            codeCity: e.target[4].value,
            address: e.target[5].value,
            numOfBeds: e.target[6].value,
            adds: e.target[7].value,
            price: e.target[8].value,
            codeAdvertiser: thisUser._id
          }
          let s = await addApartment(newApart)
          if (s == true) {
            swal('good!', 'הדירה נוספה בהצלחה!', 'success');
            setFlag(false);
          }
          else {
            swal('oops', 'הדירה כבר קיימת במערכת', 'error');
          }
        }
        catch (error) {
          console.log(error);
          swal('oops', 'משהו השתבש, נסה שוב', 'error');
        }
      }
      else {
        swal('oops', ' לא מלאת את כל השדות😏🤔🤔', 'error');
      }
    }
    
  }
  debugger
  return (<><div id='divAddCar1'>
    <header>הוספת {title}</header>
    <form className="topBefore" id="form" onSubmit={(e) => { send(e) }}>
      <div className='formAddCar'>
        <div className='formAddCarDiv'>
          {list.length > 0 && list.map(x => (
            x.type != "select" ?
              <input className="inputAddCar" id={x.value} type={x.type} placeholder={x.value} /> :
              <select className="inputAddCar">
                {x.value.length > 0 && x.value.map(c => (
                  <option value={c._id}>{c.name}</option>
                ))}
              </select>)
          )} </div>
        {list1 && <div className='formAddCarDiv'>{list1.length > 0 && list1.map(x => (
          x.type != "select" ?
            <input className="inputAddCar" id={x.value} type={x.type} placeholder={x.value} /> :
            <select className="inputAddCar">
              {x.value.length > 0 && x.value.map(c => (
                <option value={c._id}>{c.name}</option>
              ))}
            </select>)
        )}</div>}
      </div>
      <div className="aaa">
        <button className='button bbb' type='submit'>להוספה</button>
      </div>
    </form></div>
  </>)
}
export default AddModel;
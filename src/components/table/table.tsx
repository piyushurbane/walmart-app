import React, { useState, useEffect } from 'react';
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client';
import { isTemplateExpression } from 'typescript';

const GET_TABLE_DATA: any = gql`
  query getData {
    Data {
      id
      Dessert
      isDelete
      nutritionInfo {
        calories
        fat
        carb
        protein
      }
    }
  }
`;

const TableComponent = () => {

 // const { data }: any = useQuery(GET_TABLE_DATA);

  const [isNewAdd, setisNewAdd] = useState(false);
  const [desert, setdesert] = useState('');
  const [Protein, setProtein] = useState('');
  const [carb, setcarb] = useState('');
  const [fat, setfat] = useState('');
  const [calories, setcalories] = useState('');

  let ListItems: any = [{
    id: 1,
    Dessert: "Oreo",
    isDelete: false,
    nutritionInfo: {
      calories: 437,
      fat: 18,
      carb: 63,
      protein: 4,
    }
  },
  {
    id: 2,
    Dessert: "Nougat",
    isDelete: false,
    nutritionInfo: {
      calories: 360,
      fat: 19,
      carb: 9,
      protein: 37,
    }
  }] || [];

  console.log(ListItems)

  const [nutritionList, setNutritionList] = useState(ListItems);

  const addItemhandler = () => {
    console.log('add');
  }

  const removeItemhandler = () => {
    console.log('remove');
  }

  const addhandler = () => {
    const items: any = {
      isDelete: false,
      Dessert: desert,
      nutritionInfo: {
        'protein': Protein,
        'carb': carb,
        'fat': fat,
        'calories': calories
      },
    }
    console.log('ListItems:', ListItems)
    ListItems = [...nutritionList, items];
    // ListItems.push(items);
    console.log('ListItems:', ListItems)
    setNutritionList(ListItems);
    console.log(ListItems);
    setdesert('');
    setProtein('');
    setcarb('')
    setfat('');
    setcalories('');
    setisNewAdd(false);

    console.log(nutritionList);
  }

  const closeForm = () => {
    setdesert('');
    setProtein('');
    setcarb('')
    setfat('');
    setcalories('');
    setisNewAdd(false);
  }

  const resetData = () => {
    setisNewAdd(false);
  }

  const addNewItem = () => {
    setisNewAdd(true);
  }

  const deleteHandler = () => {
    console.log('nutritionList:', nutritionList)
    let ListItems = [...nutritionList];
    const originalList = ListItems.filter(x => !x.isDelete);
    console.log('originalList:', originalList)
    setNutritionList(originalList);
  }

  const checkboxChanges = (event: any, item: any, i: any) => {
    item.isDelete = event.target.checked;
    let ListItems = [...nutritionList];
    ListItems[i] = item;
    setNutritionList(ListItems);
    console.log('nutritionList:', nutritionList)
  }

  const selectAll = (e: any) => {
    let isChecked = e.target.checked;
    let data = [...nutritionList];
    data.forEach(x => x.isDelete = isChecked);
    setNutritionList(data);
    console.log('nutritionList:', nutritionList)
  }

  useEffect(() => {
    setNutritionList(ListItems);
  }, []);

  const updateInputValue = (event: any, type: any) => {
    const value = event.target.value;
    switch (type) {
      case 'Desert':
        setdesert(value);
        break;
      case 'calories':
        setcalories(value);
        break;
      case 'fat':
        setfat(value);
        break;
      case 'carb':
        setcarb(value);
        break;
      case 'Protein':
        setProtein(value);
        break;
    }
  }
  return (
    <section className="fl w-100-ns w-100 bg-light-gray">
      <h1>Nutrition List</h1>
      {/* <div className="info">
      <p>0 Selected</p>
      <button onClick={addItemhandler}>Add Item</button>
      <button onClick={removeItemhandler}>Remove Item</button>
    </div> */}
      {isNewAdd &&

        <div className="w-30 center br2 bg-white pa2 mh3 mv4">
          <h3 className="f4 lh-copy-ns bg-yellow">
            Please fill all details before you submit
            </h3>
          <div className="mt3">
            <label className="db fw4 lh-copy f6 black-100 tracked ttc">Desert Name <span className="normal black-60">*</span></label>
            <input id="desert" className="db pa2 input-reset ba b--light-silver br2 bg-white-20 w-100 measure" type="text" aria-describedby="name-desc"
              placeholder="Desert (100g serving)" value={desert} onChange={(event) => updateInputValue(event, 'Desert')} />
          </div>

          <div className="mt3">
            <label className="db fw4 lh-copy f6 black-100 tracked ttc">Calories <span className="normal black-60">*</span></label>
            <input id="calories" className="db pa2 input-reset ba b--light-silver br2 bg-white-20 w-100 measure" type="text" aria-describedby="name-desc"
              placeholder="Calories" value={calories} onChange={(event) => updateInputValue(event, 'calories')} />
          </div>

          <div className="mt3">
            <label className="db fw4 lh-copy f6 black-100 tracked ttc">Fat <span className="normal black-60">*</span></label>
            <input id="fat" className="db pa2 input-reset ba b--light-silver br2 bg-white-20 w-100 measure" type="text" aria-describedby="name-desc"
              placeholder="Fat (g)" value={fat} onChange={(event) => updateInputValue(event, 'fat')} />
          </div>

          <div className="mt3">
            <label className="db fw4 lh-copy f6 black-100 tracked ttc">Carbs <span className="normal black-60">*</span></label>
            <input id="carb" className="db pa2 input-reset ba b--light-silver br2 bg-white-20 w-100 measure" type="text" aria-describedby="name-desc"
              placeholder="Carbs (g)" value={carb} onChange={(event) => updateInputValue(event, 'carb')} />
          </div>

          <div className="mt3">
            <label className="db fw4 lh-copy f6 black-100 tracked ttc">Protein <span className="normal black-60">*</span></label>
            <input id="protein" className="db pa2 input-reset ba b--light-silver br2 bg-white-20 w-100 measure" type="text" aria-describedby="name-desc"
              placeholder="Protein (g) " value={Protein} onChange={(event) => updateInputValue(event, 'Protein')} />
          </div>

          <div className="mt3 content-center">
            <button className="f6 link dim br2 ph3 pv2 ma2 db white  ttc tc bg-dark-green" onClick={addhandler}>Save</button>
            <button className="f6 link dim br2 ph3 pv2 ma2 white bg-dark-gray" onClick={closeForm}>Close</button>
          </div>
        </div>

      }

      <div className="btn-group">
      <div className="ml2">
        {/* <span className="dark-pink">{nutritionList.map((a:any) => !a.isDelete).length} Selected</span> */}
      </div>
        <div className="mr2">
          <button className="f6 link dim ba ph3 pv2 mr2 mb2 mt2 dib bg-light dark-green" onClick={addNewItem}>Add Item</button>
          <button className="f6 link dim ph3 pv2 mb2 mt2 dib white bg-light dark-red" onClick={deleteHandler}>Delete</button>
        </div>
        {/* <button className="f6 link dim ph3 pv2 mb2 dib white bg-dark-gray" onClick={resetData}>Reset Data</button> */}
      </div>
      <table border-spacing="collapse" className="w-100 table">
        <thead>
          <tr>
            <th className="fw6 bb b--black-20 tl pb3 pt3 bg-white">
              <input type="checkbox" onChange={(e) => selectAll(e)} />
            </th>
            <th className="fw6 bb b--black-20 tl pb3 pt3 pr3 bg-white">Desert (100g serving)</th>
            <th className="fw6 bb b--black-20 tl pb3 pt3 pr3 bg-white">Calories</th>
            <th className="fw6 bb b--black-20 tl pb3 pt3 pr3 bg-white">Fat (g)</th>
            <th className="fw6 bb b--black-20 tl pb3 pt3 pr3 bg-white">Carbs (g)</th>
            <th className="fw6 bb b--black-20 tl pb3 pt3 pr3 bg-white">Protein (g)</th>
          </tr>
        </thead>
        <tbody className="lh-copy">
          {nutritionList.map((ListItem: any, i: any) => (
            <tr key={i} className="striped--light-gray ">
              <td className="pv2 ph3 tl f6 fw6 ttu"><input type="checkbox" checked={ListItem.isDelete} onChange={(e) => checkboxChanges(e, ListItem, i)} /></td>
              <td className="pv2 ph3 tl f6 fw6 ttu">{ListItem.Dessert}</td>
              <td className="pv2 ph3 tl f6 fw6 ttu">{ListItem.nutritionInfo.calories}</td>
              <td className="pv2 ph3 tl f6 fw6 ttu">{ListItem.nutritionInfo.fat}</td>
              <td className="pv2 ph3 tl f6 fw6 ttu">{ListItem.nutritionInfo.carb}</td>
              <td className="pv2 ph3 tl f6 fw6 ttu">{ListItem.nutritionInfo.protein}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TableComponent;

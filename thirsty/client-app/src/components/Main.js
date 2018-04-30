import DrinkList from "./DrinkList";
import React from "react";

function Main(props) {
  return (
    //this will have all of the display components

    <DrinkList component={DrinkList} />
  );
}

export default Main;

// let componentToShow = null;
//   switch(props.show){//have a variable that watches the state of the components
//     case "recipelist":
//       tabShow = (
//         <RecipeList
//           recipeToList={props.recipeToList}
//           recipes={props.apiData}
//           getSingleRecipe={props.getSingleRecipe}
//         />
//       )
//       break;
//     case "single":
//       tabShow = (
//         <RecipeSingle
//           userid={props.userid}
//           apiSingle={props.apiSingle}
//           getSingleRecipe={props.getSingleRecipe}
//         />
//       )
//       break;
//     default:
//       tabShow=(
//         <p>This is the default in switch: please seek help</p>
//       )
//   }
//
//   return(
//     <div className="main-display">
//       <Nav auth={props.auth} loginUser={props.loginUser} logout={props.logout}
//         getAllRecipes={props.getAllRecipes} getUserLists={props.getUserLists} showRecipeForm={props.showRecipeForm}
//       />
//
//       {props.apiLoaded  && (
//         tabShow
//       )}
//
//     </div>

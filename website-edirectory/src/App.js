import logo from './logo.svg';
import './App.css';
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";
import Home from './Pages/Home';
import RestaurantList from './Pages/RestaurantList';
import MenusList from './Pages/MenusList';
import RecipesList from './Pages/RecipesList';
import RestaurantDetail from './Pages/RestaurantDetail';
import RecipeDetail from './Pages/RecipeDetail';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Role from './Pages/Role';
import AuthPage from './Pages/AuthPage';
import ProfileC from './Pages/ProfileC';
import ProfileR from './Pages/ProfileR';
import AddMenu from './Pages/AddMenu';
import MenuDetail from './Pages/MenuDetail';
import AddRecipe from './Pages/AddRecipe';
import ModifyMenu from './Pages/ModifyMenu';
import ModifyRecipe from './Pages/ModifyRecipe';

function App() {

  return (

   <div className= "App">
    
        <BrowserRouter  basename={document.baseURI.substring(document.baseURI.indexOf(window.location.origin) + window.location.origin.length, document.baseURI.lastIndexOf('/'))} >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rlist" element={<RestaurantList />} />
                <Route path="/menulist" element= { <MenusList/> } />
                <Route path="/recipelist" element= { <RecipesList/> } />
                <Route path="/restaurant/:id" element= { <RestaurantDetail/> } />
                <Route path="/getMenu/:id" element= { <MenuDetail/> } />
                <Route path="/recipedetail/:id" element= { <RecipeDetail/> } />
                <Route path="/signin" element= { <SignIn/> } />
                <Route path="/signup" element= { <SignUp/> } />
                <Route path="/profileC" element= { <ProfileC/> } />
                <Route path="/profileR" element= { <ProfileR/> } />
                <Route path="/authpage" element= { <AuthPage/> } />
                <Route path="/role" element= { <Role/> } />
                <Route path="/addmenu" element= { <AddMenu/> } />
                <Route path="/addrecipe" element= { <AddRecipe/> } />
                <Route path="/modifyMenu/:id" element= { <ModifyMenu/> } />
                <Route path="/modifyRecipe/:id" element= { <ModifyRecipe/> } />


                
            </Routes>
        </BrowserRouter>


   </div>   
  );
}

export default App;

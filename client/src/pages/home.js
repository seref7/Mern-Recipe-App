import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = () => {
    // State for storing recipes and saved recipes
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    
    // Get user's access_token cookie
    // eslint-disable-next-line
    const [cookies, _] = useCookies(["access_token"]);

    // Get the user's ID using a custom hook
    const userID = useGetUserID();

    useEffect(() => {
        // Function to fetch recipes from the server
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        // Function to fetch saved recipes for the user
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
                );
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.error(err);
            }
        };

        // Fetch recipes when the component mounts
        fetchRecipe();

        // Fetch saved recipes if the user is authenticated (has access_token cookie)
        if (cookies.access_token) fetchSavedRecipe();
    }, [userID, cookies.access_token]);

    // Function to save a recipe for the user
    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", {
                recipeID,
                userID,
            }, 
            { headers: { authorization: cookies.access_token }}
            );
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.error(err);
        }
    };

    // Function to check if a recipe is saved by the user
    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div>
          <h1>Recipes</h1>
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe._id}>
                {savedRecipes.includes(recipe._id) && <h1> ALREADY SAVED</h1>}
                <div>
                  <h2>{recipe.name}</h2>
                  <button onClick={() => saveRecipe(recipe._id)} 
                  disabled={isRecipeSaved(recipe._id)} 
                  >
                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                  </button>
                </div>
                <div className="instructions">
                  <p>{recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>Cooking Time: {recipe.cookingTime} minutes</p>
              </li>
            ))}
          </ul>
        </div>
    );
};

import express from "express"
import { RecipeController } from "../RecipeController";



export const recipeRouter = express.Router();

const recipeController = new RecipeController();

recipeRouter.post("/create", (req,res) => recipeController.createRecipe(req,res));
recipeRouter.get("/find/:id", (req,res) => recipeController.getRecipeById(req,res));
recipeRouter.get("/all-recipe", (req,res) => recipeController.getAllRecipe(req,res));
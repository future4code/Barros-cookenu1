import { app } from "./controller/app";
import { recipeRouter } from "./controller/routes/recipeRouter";
import { userRouter } from "./controller/routes/userRouter";

app.use("/user", userRouter);
app.use("/recipe", recipeRouter)
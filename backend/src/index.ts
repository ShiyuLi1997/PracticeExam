require("dotenv").config();
import app from "./app";
import "./db";
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server is up and running on port ${port}`);
});

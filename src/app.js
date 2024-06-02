import express from "express";
import cookieParser from "cookie-parser"; //cookie parser is a middleware which parses the cookies from the request headers and populates the req.cookies object with the cookie name-value pairs
import cors from "cors";

const app = express();

app.use(cors(   //cors is a middleware which allows the server to accept requests from the client
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
));

//express.json() is a middleware that parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json({ 
    limit: "16kb" 
}));

app.use(express.urlencoded({extended: true, limit: "16kb"})); //express.urlencoded() is a middleware that parses incoming requests with urlencoded payloads and is based on body-parser 
app.use(express.static("public")); //express.static() is a middleware that serves static files like images,favicon

app.use(express.static("public")) //express.static() is a middleware that serves static files like images,favicon

app.use(cookieParser()); //cookie parser is a middleware which parses the cookies from the request headers and populates the req.cookies object with the cookie name-value pairs
export default app;
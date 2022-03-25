// import { OpenApi, Types, OpenApiSchema } from "ts-openapi";
// import { initOpenApi, openApiInstance } from "../openapi";

// const openApi: OpenApi = openApiInstance as OpenApi
// // declare our API

// const filmSchema = {
//     id: Types.Uuid({ description: "Film ID" }),
//     name: Types.String({
//         description: "Customer name",
//         maxLength: 100,
//         required: true,
//     }),
//     birthdate: Types.Date({ description: "Birthdate" }),
// };

// openApi.addPath(
//     "/films", // this is API path
//     {
//         // API method
//         get: {
//             description: "Get all films", // Method description
//             summary: "Demo get request to show how to declare APIs", // Method summary
//             operationId: "get-all-films", // an unique operation id
//             responses: {
//                 200: {

//                 }
//                 tags: ["Dummy Apis"], // these tags group your methods in UI
//             },
//         },
//     }
//     true // make method visible
// );


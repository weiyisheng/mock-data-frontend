export default function startApp(app) {
  app.listen(4000, () => {
    console.log("GraphQL Server is now running on http://localhost:4000");
  });
}

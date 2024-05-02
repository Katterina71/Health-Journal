const express =  require ('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello!')
})

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
  });
  
  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

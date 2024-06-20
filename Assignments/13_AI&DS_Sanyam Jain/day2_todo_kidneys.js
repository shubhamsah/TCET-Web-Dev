const express = require('express');
const app = express();
app.use(express.json())

// This in memory object
var users = [{
    name: "sanyam",
    kidneys: [{
        healthy: false,
    },
    {
        healthy: true,
    }]
}]

app.get('/', (req, res) => {
    const num_kidneys = users[0].kidneys.length
    let healthy_kidneys = 0
    for (let i = 0; i < num_kidneys; i++) {
        if (users[0].kidneys[i].healthy == false) {
            healthy_kidneys += 1
        }
    }
    let unhealthy_kidneys = num_kidneys - healthy_kidneys
    res.send({
        "Total Kidneys": num_kidneys, 
        "Healthy Kidneys": healthy_kidneys, 
        "Unhealthy Kidneys": unhealthy_kidneys})
})

app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy
    users[0].kidneys.push({ healthy: isHealthy })
    res.json({
        "msg": "Done",
    })
})

app.put("/", (req, res) => {
    for (let i=0; i<users[0].kidneys.length; i++) {
        if(!(users[0].kidneys[i].healthy)){
            users[0].kidneys[i].healthy = true
        }
    }
    res.json({
        "msg": "You can buy new phones",
    })
})

app.delete("/", (req, res) => {
    const new_kidneys = []
    for (let i = 0; i<users[0].kidneys.length; i++) {
        if (!(users[0].kidneys[i].healthy)) {
            new_kidneys.push(users[0].kidneys[i])
        }
    }
    users[0].kidneys = new_kidneys
    res.json({
        "msg": "Deleted unhealthy kidneys",
    })
})

app.listen(8000)
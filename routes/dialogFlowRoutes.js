module.exports= app=>{

    app.get('/', (req, res) =>{
        res.send("Hello World");
    })

    app.post('/api/df_text_query', (req, res) =>{
        res.send("Hello World");
    })

    app.post('/api/df_event_query', (req, res) =>{
        res.send("Hello World");
    });



}

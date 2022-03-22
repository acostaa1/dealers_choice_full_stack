const { syncDB, models:{Menu, Item} } = require( "./db");
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000

const startUp =  async () => {
    try {
        await syncDB();
        console.log('connected to DB!');
        app.listen(port, ()=> {
            console.log(`listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

startUp(); 

app.get('/api/menus', async (req,res,next)=> {
    try {
        const menus = await Menu.findAll({
            include: [Item]
        });
        res.send(menus)
    } catch (error) {
       next(error) 
    }
})
app.get('/api/breakfast', async (req,res,next)=> {
    try {
        
        const dishes = await Item.findAll({
            include: [Menu],
            where: {
              menuId: 1
            }
        });
        res.send(dishes)
    } catch (error) {
       next(error) 
    }
})

app.get('/api/breakfast/:id', async (req, res, next)=> {
    try {
        const item = await Item.findByPk(req.params.id, {include: [Menu]});
        res.send(item);
    } catch (error) {
        next (error)
    }
})
// app.get('/api/lunch', async (req,res,next)=> {
//     try {
        
//         const dishes = await Item.findAll({
//             include: [Menu],
//             where: {
//               menuId: 2
//             }
//         });
//         res.send(dishes)
//     } catch (error) {
//        next(error) 
//     }
// })

// app.get('/api/dinner', async (req,res,next)=> {
//     try {
        
//         const dishes = await Item.findAll({
//             include: [Menu],
//             where: {
//               menuId: 3
//             }
//         });
//         res.send(dishes)
//     } catch (error) {
//        next(error) 
//     }
// })


//to add your own breakfast items using input
app.post('/api/breakfast/:name/:price/:calories', async (req, res, next) => {
    try {
        const item = await Item.create(req.params);
        res.status(201).send(item);
    } catch (error) {
        next(error)
    }
})

// //to add your own lunch items using input
// app.post('/api/lunch', async (req, res, next) => {
//     try {
//         const item = await Menu.create(req.params);
//         res.status(201).send(item);
//     } catch (error) {
//         next(error)
//     }
// })

// //to add your own dinner items using input
// app.post('/api/dinner', async (req, res, next) => {
//     try {
//         const item = await Menu.create(req.params);
//         res.status(201).send(item);
//     } catch (error) {
//         next(error)
//     }
// })

app.delete('/api/breakfast/:id', async(req, res, next) => {
    try {
        const item = await Item.findByPk(req.params.id);
        await item.destroy();
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
})
// app.delete('/api/lunch/:id', async(req, res, next) => {
//     try {
//         const item = await Menu.findByPk(req.params.id);
//         await item.destroy();
//         res.sendStatus(204);
//     } catch (error) {
//         next(error)
//     }
// })
// app.delete('/api/dinner/:id', async(req, res, next) => {
//     try {
//         const item = await Menu.findByPk(req.params.id);
//         await item.destroy();
//         res.sendStatus(204);
//     } catch (error) {
//         next(error)
//     }
// })

app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'index.html')));

//connect to dist folder
app.use('/dist', express.static(path.join(__dirname, 'dist')))

//connect to styles folder (css)
app.use('/assets', express.static(path.join(__dirname, 'assets')))


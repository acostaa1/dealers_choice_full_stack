const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_full_stack');

//models
const Menu = sequelize.define('menu', {
    name: {
        type: Sequelize.STRING,

    }
})

const Item = sequelize.define('item', {
    name: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    },
    calories: {
        type: Sequelize.INTEGER
    }
})

//associations
Item.belongsTo(Menu);
Menu.hasMany(Item);



const syncDB = async () => {
    await sequelize.sync() // resyncs db

    //menus
    const [breakfast, lunch, dinner] = await Promise.all([
        Menu.create({name: 'breakfast'}),
        Menu.create({name: 'lunch'}),
        Menu.create({name: 'dinner'})
    ])

    //items / breakfast
    await Item.create({name:'Pancakes', price: 13.99, calories:1020, menuId: breakfast.Id})
    await Item.create({name:'Hashbrown', price: 4.99, calories: 300, menuId: breakfast.id})
    await Item.create({name:'Scrambled Eggs', price: 7.99, calories: 740, menuId: breakfast.id})
    await Item.create({name:'Turkey Sausage', price: 6.99, calories: 1025, menuId: breakfast.id})

    //items / lunch
    await Item.create({name:'Peanut Butter & Jelly', price: 4.99, calories: 400, menuId: lunch.id})
    await Item.create({name:'Ham & Cheese', price: 4.99, calories: 600, menuId: lunch.id})
    await Item.create({name:'Rice & Beans', price:9.99, calories:1030, menuId: lunch.id})
    await Item.create({name:'Philly Cheese Steak', price: 11.99, calories:1220, menuId: lunch.id})

    //ditems / dinner
    await Item.create({name:'Lasagna', price: 14.99, calories: 1550, menuId: dinner.id})
    await Item.create({name:'Skirt Steak', price: 19.99, calories:2010, menuId: dinner.id})
    await Item.create({name:'Gnocci', price: 12.99, calories: 1040, menuId: dinner.id})
    await Item.create({name:'Salmon', price:18.99, calories: 1330, menuId: dinner.id})
}

module.exports = {
    syncDB, 
    models: {
        Menu, Item
    }
}
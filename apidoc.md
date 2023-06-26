
//page one
>shop>List of type of item eg,1.Hardware and Discs,
                              2.Digital Games,
                              3.Official Merchandise
                              4.Services
http://localhost:3245/category



//page 2
>list of item wrt type of item have selected (1.hardware is selected)
http://localhost:3245/categoryitem?categoryId=1

(hardware have 3 different option,PS5,PS VR2,PS4  available so wrt to  that one)
>list of item wrt type of item have selected + PS5 or PS VR2 or PS4
http://localhost:3245/categoryItem?categoryId=1&subCategoryId=1

>http://localhost:3245/categoryItem?categoryId=1&subCategoryId=2

>http://localhost:3245/categoryItem?categoryId=1&subCategoryId=3



>If have selected "Digital Games"
>list of games
http://localhost:3245/gameIdProduct

>game section have sorting option 1.genre wise and 2.Playable device wise 
>list of game + genre
http://localhost:3245/gameIdproduct?gerneId=1&3

>list of games + playable device
http://localhost:3245/gameIdproduct?playableDeviceId=1

list of game + genre + playable device
http://localhost:3245/gameIdproduct?playableDeviceId=1&genreId=3



//page 3
>details of item (of hardware item)
http://localhost:3245/details/6488248fbf0bdbf67e9da2f7

>other products of selected item
>http://localhost:3245/menuitem/1



//page 4
>detail of product added to cart
http://localhost:3245/productDetails

>place orders
http://localhost:3245/placeOrder
eg.
[
    {
        "_id": "648af4fcf409be684cbd38e2",
        "name": "Arjun gupta",
        "email": "arjung@gmail.com",
        "address": "Hno 25,Sector 2",
        "phone": 97645673,
        "cost": 12451,
        "menuItem": [
            3,
            6
        ]
    }
]


//page 5
>list of orders 
http://localhost:3245/orders

>update orders details
http://localhost:3245/updateOrder

>delete orders
http://localhost:3245/deleteOrder
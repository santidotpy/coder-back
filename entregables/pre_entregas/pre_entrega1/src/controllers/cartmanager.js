import { promises as fs } from "fs";

export class CartManager {

    constructor() {
   
        this.carts = [];
        this.path = "src/models/carts.txt";
        this.pid = 0
   
    }
   
   
    static id = 0;
   
   
    writeCarts = async products => {
   
        await fs.writeFile(this.path, JSON.stringify(products), error => {
   
        if (error) throw error;
   
    });
   
    };
    
   
    readCarts = async () => {
   
        let allCarts = await fs.readFile(this.path, "utf-8");
   
        return JSON.parse(allCarts);
   
    };
   
   
    addProduct = async (products) => {
   

        // status = status === undefined ? true : status
        // thumbnail = thumbnail === undefined ? [] : thumbnail
        
        let newProduct = {
                        id: CartManager.id,
                        products
                    };
   
   
        CartManager.id++;
   
        this.carts.push({
   
        ...newProduct,
   
        ///id: CartManager.id,
   
    });
   
   
        await this.writeCarts(this.carts);
   
    };
   
   
    exist = async id => {
   
        let productsAll = await this.readCarts();
        return productsAll.find(cart => cart.id === id);
   
    };
   
    
    getCartById = async id => {
   
        if (await this.exist(id)) {
            return await this.exist(id)
        } else {
            return `Cart with id ${id} not found`
        }
   
    };




    addProductToCartById = async (obj, cid, pid) => {
        // tomo el id de la url
        /*  enviando esto por la request
        {
		    "id": 0,
		    "quantity": 1
        }
        */ 
   
        let cartbyid = await this.getCartById(cid)
        let products = cartbyid.products
        const found = products.find(el => el.id === pid);
        
        if (!found) products.push({ id: pid, quantity: obj.quantity });
        else {
            let objIndex = cartbyid.products.findIndex((ob => ob.id == pid));
            cartbyid.products[objIndex].quantity += obj.quantity

        }

        return cartbyid
    };



   }
     
   
   const productos = new CartManager();
   
   
   /* Tests */
   
   
   
   // Add products

    // productos.addProduct(   'titulo1',              // title
    //                         'description1',         // description
    //                         2000,                   // price
    //                         'thumbnail1',           // thumbnail
    //                         2550,                   // code
    //                         200);                   // stock
     
   // Consult all existing products
   
   //productos.getProducts();
   
   
   
   // Query a product by id
   
   // productos.getProductsById(1);
   
   
   
   // update existing products
   
//    productos.updateProduct({
   
//     title: "title updated",
   
//     description: "description updated",
   
//     price: 1500,
   
//     thumbnail: "thumbnail updated",
   
//     code: "2550",
   
//     stock: 10,
   
//     id: 1,
   
//    }); 
   
   
   
   // Delete product by id
   
   //productos.deleteProducts(1);
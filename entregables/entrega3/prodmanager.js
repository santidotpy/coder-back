import { promises as fs } from "fs";


export class ProductManager {

    constructor() {
   
        this.products = [];
        this.path = "./products.txt";
   
    }
   
   
    static id = 0;
   
   
    writeProducts = async products => {
   
        await fs.writeFile(this.path, JSON.stringify(products), error => {
   
        if (error) throw error;
   
    });
   
    };
    
   
    readProducts = async () => {
   
        let allProducts = await fs.readFile(this.path, "utf-8");
   
        return JSON.parse(allProducts);
   
    };
   
   
    addProduct = async (title, description, price, thumbnail, code, stock) => {
   
        let newProduct = {
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock,
                    };
   
   
        ProductManager.id++;
   
        this.products.push({
   
        ...newProduct,
   
        id: ProductManager.id,
   
    });
   
   
        await this.writeProducts(this.products);
   
    };
   
    
    getProducts = async () => {
   
        let productsAll = await this.readProducts();
        //console.log(productsAll);
        return productsAll
   
    };
    
   
    exist = async id => {
   
        let productsAll = await this.readProducts();
        return productsAll.find(product => product.id === id);
   
    };
   
    
    getProductsById = async id => {
   
        if (await this.exist(id)) {
            return await this.exist(id)
        } else {
            return `Product with id ${id} not found`
        }
   
    };
   
   
    updateProduct = async ({ id, ...produt }) => {
   
        if ((await this.deleteProducts(id)) === false) {
   
        console.log("The product you are trying to modify does not exist");
   
    } else {
   
        let prod = await this.readProducts();
        let modifiedProducts = [
   
       {
   
        id: id,
   
        ...produt,
   
       },
   
       ...prod,
   
      ];
   
        await this.writeProducts(modifiedProducts);
   
        console.log("Product successfully modified");
   
     }
   
    };
   
   
    deleteProducts = async id => {
   
        if (await this.exist(id)) {
   
            let products = await this.readProducts();
            let filterProducts = products.filter(prod => prod.id != id);
   
            await this.writeProducts(filterProducts);
   
        } else {
   
            console.log("Product Not Found");
   
            return false;
   
        }
   
    };
   
   }
     
   
   const productos = new ProductManager();
   
   
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
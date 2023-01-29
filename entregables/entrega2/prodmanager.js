


class ProductManager{
    constructor(path) {
        this.products = []
        this.path = path

    }

    addProduct(title, description, price, thumbnail, stock, code = this.products.length + 1){
        if(title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined){
            console.log('Missing parameters')
            return false
        }
        let product = {
            "title": title,
            "description": description,
            "price": price,
            "thumbnail": thumbnail,
            "code": code,
            "stock": stock
        }


        if(!this.isInProducts(code)){
            this.products.push(product)
            const fs = require('fs');

            fs.writeFile(this.path, JSON.stringify(this.products), 'utf-8', err => {
                if (err) {
                    console.error(err);
                };
                });

            console.log('Product added correctly');
        } else {
            console.log('Product not added as it already exists');
        }


    }

    isInProducts(code){
        return this.products.some(prod => prod.code === code);
    }

    get getProducts(){
        // //return this.products
        const fs = require('fs');
        // //data = fs.readFile(this.path, 'utf-8')

        // fs.readFileSync(this.path, 'utf-8', function(err, data){
      
        //     return JSON.parse(data)
        // });

        let text = fs.readFileSync(this.path, "utf-8");
        console.log(text)
    }


    deleteProduct(code) {
        const fs = require('fs');

        if (this.products.find(item => item.code === code) != undefined) {
            this.products = this.products.find(item => item.code != code)
            console.log('Deleted')
            fs.writeFile(this.path, JSON.stringify(this.products), 'utf-8', err => {
                if (err) {
                    console.error(err);
                };
                });
        } else {
            return 'Not Found'
        }
    }

    // getProductById(code){
    //     if (this.products.find(item => item.code === code) != undefined) {
    //         return this.products.find(item => item.code === code)
    //     } else {
    //         return 'Not Found'
    //     }
    // }

    // updateProduct(code, title, description, price, thumbnail, stock){
    //     if (this.products.find(item => item.code === code) != undefined) {
    //         let prod =  this.products.find(item => item.code === code)
    //         console.log(prod)
    //     } else {
    //         return 'Not Found'
    //     }
    // }

  }


    const testingThings = new ProductManager('./prods.txt')

    //testingThings.addProduct('coso', 'blabla', 100, 'blabla', 10)
    //testingThings.addProduct('coso', 'blabla', 100, 'blabla', 20)
    testingThings.getProducts
    //testingThings.deleteProduct(1)
    //testingThings.updateProduct(2)


  //console.log(testingThings.getProductById(2))
  //console.log(testingThings.getProducts)

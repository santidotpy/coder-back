


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
        const fs = require('fs');
        let text = fs.readFileSync(this.path, "utf-8");
        console.log(text.split("{}"))
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

    getProductById(code){
        const fs = require('fs');
        let text = fs.readFileSync(this.path, "utf-8");
        text = JSON.parse(text)
        if (text.find(item => item.code === code) != undefined) {
            return text.find(item => item.code === code)
        } else {
            return 'Not Found'
        }
    }

    updateProduct(code, data){
        const fs = require('fs');
        let text = fs.readFileSync(this.path, "utf-8");
        text = JSON.parse(text)
        const objIndex = text.findIndex((obj => obj.id === code));

        if (text.find(item => item.code === code) != undefined) {
            let ex = text.find(item => item.code === code)
            //ex.title = title
            ex.title = data ? data.title : ex.title;
            ex.description = data == undefined ? data.description : ex.description;
            ex.price = data == undefined ? data.price : ex.price;
            ex.thumbnail = data == undefined ? data.thumbnail : ex.thumbnail;
            ex.stock = data == undefined ? data.stock : ex.stock;


            //console.log(ex)
            //text[objIndex] = ex
            console.log(text)
            fs.writeFile(this.path, JSON.stringify(text), 'utf-8', err => {
                if (err) {
                    console.error(err);
                };
                });


        } else {
            return 'Not Found'
        }
        // if (this.products.find(item => item.code === code) != undefined) {
        //     let prod =  this.products.find(item => item.code === code)
        //     console.log('caquerman')
        // } else {
        //     return 'Not Found'
        // }
    }

  }


    const testingThings = new ProductManager('./prods.txt')

    //testingThings.addProduct('coso', 'blabla', 100, 'blabla', 10)
    //testingThings.addProduct('coso', 'blabla', 100, 'blabla', 20)
    //testingThings.getProducts
    //testingThings.deleteProduct(1)
    testingThings.updateProduct(2, {title: "Lechuga"})


    //console.log(testingThings.getProductById(2))
  //console.log(testingThings.getProducts)

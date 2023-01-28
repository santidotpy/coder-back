


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
        //console.log(code)
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
                // file written successfully
                });

            // fs.appendFile(this.path, this.products, err => {
            // if (err) {
            //     console.error(err);
            // }
            // // file written successfully
            // });
            console.log('Product added correctly');
        } else {
            console.log('Product not added as it already exists');
        }


    }

    isInProducts(code){
        return this.products.some(prod => prod.code === code);
    }

    get getProducts(){
        //return this.products
        const fs = require('fs');
        //data = fs.readFile(this.path, 'utf-8')

        fs.readFileSync(this.path, 'utf-8', function(err, data){
      
            // Display the file content
            return JSON.parse(data)
        });

        
        
    }

    getProductById(code){
        if (this.products.find(item => item.code === code) != undefined) {
            return this.products.find(item => item.code === code)
        } else {
            return 'Not Found'
        }

    }

  }


  const testingThings = new ProductManager('./prods.txt')

  testingThings.addProduct('coso', 'blabla', 100, 'blabla', 10)
//   testingThings.addProduct('coso', 'blabla', 100, 'blabla', 20)
//   console.log(testingThings.getProductById(2000))
  console.log(testingThings.getProducts)

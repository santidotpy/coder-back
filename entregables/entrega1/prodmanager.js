


class ProductManager{
    constructor() {
        this.products = []

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
            console.log('Product added correctly');
        } else {
            console.log('Product not added as it already exists');
        }


    }

    isInProducts(code){
        return this.products.some(prod => prod.code === code);
    }

    get getProducts(){
        return this.products
    }

    getProductById(code){
        if (this.products.find(item => item.code === code) != undefined) {
            return this.products.find(item => item.code === code)
        } else {
            return 'Not Found'
        }

    }

  }


  const testeo = new ProductManager()

  testeo.addProduct('coso', 'blabla', 100, 'blabla', 10)
  testeo.addProduct('coso', 'blabla', 100, 'blabla', 20)
  console.log(testeo.getProductById(2000))
  console.log(testeo.getProducts)

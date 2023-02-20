
const socket = io()

const form = document.querySelector("#form");
const titleInput = document.querySelector("#title");
const priceInput = document.querySelector("#price");
const thumbnailInput = document.querySelector("#thumbnail");
const codeInput = document.querySelector('#code')
const stockInput = document.querySelector('#stock')
const statusInput = document.querySelector('#trueOrFalse')
const categoryInput = document.querySelector('#category')
const descriptionInput = document.querySelector('#description')

const form2 = document.querySelector("#form2");
const deleteprod = document.querySelector('#iden')


console.log(titleInput.value)

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const product = {
        title: titleInput.value,
        description: descriptionInput.value,
        price: priceInput.value,
        code: codeInput.value,
        stock: stockInput.value,
        status: statusInput.value,
        category: categoryInput.value,
        thumbnail: thumbnailInput.value
    }
    console.log(product)
    socket.emit('add-product', product)
    newprod(product)

    titleInput.value = ''
    descriptionInput.value = ''
    priceInput.value = ''
    codeInput.value = ''
    stockInput.value = ''
    categoryInput.value = ''
    thumbnailInput.value = ''

})

form2.addEventListener('submit', (e) => {
    e.preventDefault()
    const product = {
        id: parseInt(deleteprod.value)
    }

    socket.emit('delete-product', product)
})


const newprod = (product) => {
    let display = `
    <div>
    <h4>${product.title}</h4>
    <p>${product.description}</p>
    <p>Price: $ ${product.price}</p>
    </div>`
    document.getElementById('prods').innerHTML = display
}
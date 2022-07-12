import { cartExercise } from "./pom"
const classObj = new cartExercise()

describe('Scenario 1 - home page access', () => {

  it('User can access a home page', () => {

    classObj.navigate('https://www.amazon.ca') //navigating to URL

    cy.wait(2000)

    classObj.navigateHome() //navigating to home page

    classObj.urlLookup('_ref', 'nav_cs_home') //confirm user is viewing home page
  })

});

describe('View product list', () => {
  it('User can search and view the product', () => {

    classObj.searchProduct('iPad') //searching product

    classObj.viewingProductList('results') //confirm user is viewing searched product list
  })
});

describe('Product Details', () => {
  it('User can view product details', () => {

    classObj.selectProduct() // selecting product from the list retrieved

    classObj.viewingDescription('About this item') //confirm user is on description page by looking a keyword

    // second way to confirm user is on description page
    if (cy.contains('Buy now')) {
      cy.log('passed: user can view product details')
    }

    classObj.getquantity() //getting quatity on description page

    classObj.getprice() //getting price on description page

  });
});
describe('Add to cart', () => {

  it('User can add product(s) to cart/checkout flow', () => {
    cy.wait(3000);
    classObj.addToCartButton() // adding selected product to cart

    cy.wait(2000)

    //checking for apple care
    if (cy.contains('AppleCare+')) {
      classObj.noCoverageButton()
    }

    // checking add to cart confirmation (if needed)
    if (cy.get('h5').should('contain', 'Please confirm')) {

      classObj.confirmAddToCartButton() //confirming add to cart

      classObj.checkItemCount('1 item') //checking successfully added

    }
    else {
      classObj.addToCartConfirmationContainer('Added to Cart') // looking for Added to cart message

      classObj.goToCart() // clicking add to cart button
    }

  });
});

describe('cart and checkout test cases', () => {

  it('The price and item count in the cart/checkout matches the description', () => {

    classObj.confirmPrice()  // confirming quantity and price
    classObj.confirmQty()

  });

  it('Able to continue to checkout page', () => {

    classObj.proceedToCheckout()// clicking proceed to checkout button

    classObj.urlLookup('pageID', 'checkout') //confirming user is on checkout page
  });

  it('Entering invalid/bad data results in displaying error message', () => {

    classObj.emailTextBox('test.ca') // entering invalid Email

    classObj.continueSignInButton() //continue button

    classObj.cookiesButton() // previous button

    classObj.continueSignInButton() //continue button

    classObj.errMsg() //locating and confirming error message

  });

});
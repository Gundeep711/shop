  import { cartExercise } from "./pom"
  const classObj = new cartExercise()

  describe('Scenario 1', () => {

    it('Case 1 - User can access a home page', () => {

      classObj.navigate('/') //navigating to URL

      cy.wait(2000)

      classObj.navigateHome() //navigating to home page

      classObj.urlLookup('_ref', 'nav_cs_home') //confirm user is viewing home page
    });

    it('Case 2 - User can search and view the product', () => {

      classObj.searchProduct('iPad') //searching product

      classObj.viewingProductList('results') //confirm user is viewing searched product list
    });

    it('Case 3 -  User can view product details', () => {

      classObj.selectProduct() // selecting product from the list retrieved

      classObj.viewingDescription('About this item') //confirm user is on description page by looking a keyword

      // second way to confirm user is on description page
      cy.contains('Buy now')
        cy.log('passed: user can view product details')

      classObj.getquantity() //getting quatity on description page

      classObj.getprice() //getting price on description page

    });


    it('Case 4 - User can add product(s) to cart/checkout flow', () => {
      cy.wait(3000);
      classObj.addToCartButton() // adding selected product to cart

      cy.wait(2000)

      //checking for apple care
      cy.contains('AppleCare+') 
      classObj.noCoverageButton()
      cy.wait(3000)
      

      // checking add to cart confirmation (if needed)
      cy.get('body').then(($bod) => {
        if($bod.find('h5').length > 0 ){
          cy.get('h5').should('contain', 'Please confirm')
          
          classObj.confirmAddToCartButton() //confirming add to cart

          classObj.checkItemCount('1 item') //checking successfully added
        }
        else{
          classObj.addToCartConfirmationContainer('Added to Cart') // looking for Added to cart message

          classObj.goToCart() // clicking add to cart button
        }
      });       

    });

    it('Case 5 - The price and item count in the cart/checkout matches the description', () => {

      classObj.confirmPrice()  // confirming quantity and price
      classObj.confirmQty()

    });

    it('Case 6 - Able to continue to checkout page', () => {

      classObj.proceedToCheckout()// clicking proceed to checkout button

      classObj.urlLookup('pageID', 'checkout') //confirming user is on checkout page
    });

    it('Case 7 - Entering invalid/bad data results in displaying error message', () => {

      classObj.emailTextBox('test.ca') // entering invalid Email

      classObj.continueSignInButton() //continue button

      classObj.cookiesButton() // previous button

      classObj.continueSignInButton() //continue button

      classObj.errMsg() //locating and confirming error message

    });

  });
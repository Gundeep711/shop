import { cartExercise } from "./pom"
  const classObj = new cartExercise()
  var data1 ;
  describe('Scenario 1', () => {
    
    before(function(){
      //access fixture data
      cy.fixture('example.json').then(function(data){
         data1 = data
      })
   })

    it('Case 1 - User can access a home page', () => {

      classObj.navigate('/') //navigating to URL

      cy.wait(2000)

      classObj.navigateHome() //navigating to home page

      classObj.urlLookup('_ref', data1.urlKeyword) //confirm user is viewing home page
    });

    it('Case 2 - User can search and view the product', () => {

      classObj.searchProduct(data1.searchString) //searching product

      classObj.viewingProductList(data1.resultsString) //confirm user is viewing searched product list
    });

    it('Case 3 -  User can view product details', () => {

      classObj.selectProduct() // selecting product from the list retrieved

      classObj.viewingDescription(data1.descString) //confirm user is on description page by looking a keyword

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
      cy.contains(data1.AppleCare) 
      classObj.noCoverageButton()
      cy.wait(3000)
      

      // checking add to cart confirmation (if needed)
      cy.get('body').then(($bod) => {
        if($bod.find('h5').length > 0 ){
          cy.get('h5').should('contain', data1.confirmString)
          
          classObj.confirmAddToCartButton() //confirming add to cart

          classObj.checkItemCount(data1.itemConfirmation) //checking successfully added
        }
        else{
          classObj.addToCartConfirmationContainer(data1.cartConfirmation) // looking for Added to cart message

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

      classObj.urlLookup('pageID', data1.checkoutUrl) //confirming user is on checkout page
    });

    it('Case 7 - Entering invalid/bad data results in displaying error message', () => {

      classObj.emailTextBox(data1.emailcheck) // entering invalid Email

      classObj.continueSignInButton() //continue button

      classObj.cookiesButton() // previous button

      classObj.continueSignInButton() //continue button

      classObj.errMsg() //locating and confirming error message

    });

  });
export class cartExercise{
qty = '';
price = '';
cartPrice = '';
errorMessage = 'There was a problem';
homelocator = '[href="/gp/browse.html?node=2206275011&ref_=nav_cs_home"]' ;
searchLocator = '#twotabsearchtextbox';
resultSectionLocator = '.sg-col-14-of-20 > .sg-col-inner > .a-section';
selectedProductLocator = '[data-index="2"] > .sg-col-inner > .s-widget-container > [data-component-type="s-impression-logger"] > .s-featured-result-item > .s-card-container > .a-spacing-base > .a-spacing-small > .s-title-instructions-style > .a-size-mini > .a-link-normal > .a-size-base-plus';
descriptionSectionLocator = '.a-size-base-plus';
addToCartLocator = '#add-to-cart-button' ;
noCoverageLocator = '#attachSiNoCoverage';
confirmCartLocator = '#a-autoid-0';
cartConfirmationLocator = '#sw-atc-details-single-container' ;
goToCartButtonLocator = '#sw-gtc > .a-button-inner > .a-button-text';
proceedtoCheckoutLocator = '#sc-buy-box-ptc-button';
emailLocator = '#ap_email';
continueLocator = '.a-button-inner > #continue';
cookieBtnLocator = '.amzn-btn';
errMsgLocator = '#auth-error-message-box > .a-box-inner';
qtyLocator = '#quantity' ;
priceLocator = '.a-spacing-none > .a-price > [aria-hidden="true"]';
cartPriceLocator = '.a-span2 > .a-spacing-mini > .a-size-medium';
cartQtyLocator = '#a-autoid-0-announce';
itemCountLocator = '.sc-buy-box-inner-box > .a-spacing-mini';

  navigate(url){
    cy.visit(url)
  }
  navigateHome(){
    cy.get(this.homelocator).click()
  }
  urlLookup(urlLocator,urlKeyword){
    cy.url(urlLocator).should('contain',urlKeyword)
  }
  searchProduct(searchKeyword){
    cy.get(this.searchLocator).type(searchKeyword).type('{enter}')
  }
  viewingProductList(resultKeyword){
    cy.get(this.resultSectionLocator).should('contain', resultKeyword)
  }
  selectProduct(){
    cy.get(this.selectedProductLocator).click()
  }
  viewingDescription(descKeyword){
    cy.get(this.descriptionSectionLocator).should('contain', descKeyword)
  }
  addToCartButton(){
    cy.get(this.addToCartLocator).click()
  }
  noCoverageButton(){
    cy.get(this.noCoverageLocator).click()
  }
  confirmAddToCartButton(){
    cy.get(this.confirmCartLocator).click()
  }
  addToCartConfirmationContainer(confirmMsg){
    cy.get(this.cartConfirmationLocator).should('contain', confirmMsg )
  }
  goToCart(){
    cy.get(this.goToCartButtonLocator).click()
  }
  proceedToCheckout(){
    cy.get(this.proceedtoCheckoutLocator).click()
  }
  emailTextBox(email){
    cy.get(this.emailLocator).type(email)
  }
  continueSignInButton(){
    cy.get(this.continueLocator).click()
  }
  cookiesButton(){
    cy.get(this.cookieBtnLocator).click()
  }
  errMsg(){
    cy.get(this.errMsgLocator).invoke('text').should((err) => {
      assert.include(err, this.errorMessage, 'Error message displayed')
    });
  }
  getquantity(){
    cy.get(this.qtyLocator).invoke('val').should((value) => {
      this.qty = value;
    });
  }
  getprice(){
    cy.get(this.priceLocator).should('be.visible').then(($span) => {
      this.price = $span.text()
      cy.log("Price " + this.price + " itemprice: " + $span.text())
    });
  }
  confirmPrice(){
    cy.get(this.cartPriceLocator).invoke('text').should((value1) => {
      this.cartPrice = value1;
      assert.equal(this.cartPrice, this.price, 'price matched')
    });
  }
  confirmQty(){
    cy.get(this.cartQtyLocator).invoke('text').should((qtyCart) => {
      assert.include(qtyCart, this.qty, 'Quantity matched')
    });
  }
  checkItemCount(stringinlcuded){
    cy.get(this.itemCountLocator).invoke('text').should((itemcheck) => {
      assert.include(itemcheck, stringinlcuded, 'Successfully added to cart')
    })
  }

}
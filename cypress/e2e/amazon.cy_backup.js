import { cartExercise } from "./pom.cy"
const classObj = new cartExercise()
var qty = '';
var price = '';
var cartPrice = '';
var errorMessage = 'There was a problem';
describe('Scenario 1 - home page access', () => {

  it('User can access a home page', () => {
    classObj.navigate('https://www.amazon.ca')
    cy.wait(3000)
    classObj.navigateHome('[href="/gp/browse.html?node=2206275011&ref_=nav_cs_home"]')
    classObj.viewingHome('ref_','nav_cs_home')
    //cy.url('ref_').should('contains', 'nav_cs_home')
    cy.log('Passed: User can access home page')
  })

});

describe('Product list', () => {
  it('User can search and view the product', () => {
    cy.get('#twotabsearchtextbox').type('iPad {enter}')
    cy.get('.sg-col-14-of-20 > .sg-col-inner > .a-section').should('contain', 'results')
    cy.log('User is on product page')
  })
});

describe('Product Details', () => {
  it('User can view product details', () => {
    cy.get('[data-index="2"] > .sg-col-inner > .s-widget-container > [data-component-type="s-impression-logger"] > .s-featured-result-item > .s-card-container > .a-spacing-base > .a-spacing-small > .s-title-instructions-style > .a-size-mini > .a-link-normal > .a-size-base-plus').click()
    cy.get('.a-size-base-plus').should('contain', 'About this item')
    cy.contains('Buy now')
    cy.log('passed: user can view product details')
    cy.get('#quantity').invoke('val').should((value) => {
      qty = value;
    })
    cy.get('.a-spacing-none > .a-price > [aria-hidden="true"]').should('be.visible').then(($span) => {
      price = $span.text()
      cy.log("Price " + price + " itemprice: " + $span.text())
    })
    
  });
});
describe('Add to cart', () => {

  it('User can add product(s) to cart/checkout flow', () => {
    cy.get('#add-to-cart-button').click()
    cy.wait(2000)
    if (cy.contains('AppleCare+')) {
      cy.get('#attachSiNoCoverage').click()
    }
    if(cy.get('h5').should('contain', 'Please confirm')){
      cy.get('#a-autoid-0').click()
    }
    
    cy.get('.sc-buy-box-inner-box > .a-spacing-mini').invoke('text').should((itemcheck) => {
      assert.include(itemcheck, '1 item', 'Successfully added to cart')
    })
    //cy.get('#sw-atc-details-single-container').should('contain', 'Added to Cart')
    //cy.log('Test Case Passed: Added to cart successfully')
    //cy.get('#sw-gtc > .a-button-inner > .a-button-text').click() //Go to cart button
  });
});

describe('cart and checkout test cases', () => {

  it('The price and item count in the cart/checkout matches the description', () => {
    cy.get('.a-span2 > .a-spacing-mini > .a-size-medium').invoke('text').should((value1) => {
      cartPrice = value1;
      assert.equal(cartPrice, price, 'price matched')
    });
    cy.get('#a-autoid-0-announce').invoke('text').should((qtyCart) => {
      assert.include(qtyCart, qty, 'Quantity matched')
    });
  });

  it('Able to continue to checkout page', () => {
    cy.get('#sc-buy-box-ptc-button').click()
    cy.url('pageID').should('contain', 'checkout')
  });

  it('Entering invalid/bad data results in displaying error message', () => {
    cy.get('#ap_email').type('test.ca')
    cy.get('.a-button-inner > #continue').click()
    cy.get('.amzn-btn').click() // additional step because of cookies
    cy.get('.a-button-inner > #continue').click()
    cy.get('#auth-error-message-box > .a-box-inner').invoke('text').should((err) => {
      assert.include(err, errorMessage, 'Error message displayed')
    });

  });

 });
# ATC_automation Exercise
Tool used for automation : Cypress(can be installed as a node dependency), IDE: VS Code.
This exercise checks if user is able to add products to the cart and verify the product and price of the product added.
,also checks if error message is displayed for invalid data.
run npm install to install all the module.
Then open cypress using npx cypress open or and run the spec file.

https://user-images.githubusercontent.com/50634523/178560619-cdfbc4ea-2307-4989-baf4-310e22a23e9b.mp4

![image](https://user-images.githubusercontent.com/50634523/178560961-3160a572-3a29-4331-84dc-c5f4bb65e4a8.png)


You can also generate a report by installing mochawesome report generator
Below are the commands:
npm i mochawesome-report-generator '\n'
npm i mochawesome-merge 
npm i mochawesome
npx cypress run --reporter mochawesome 
It by default generates json report, you can also convert it to HTML
first merge all your json reports using: npx mochawesome-merge cypress/reports/json/*.json | out-file -encoding ascii ./merged.json
to create HTML report run: npx marge ./merged.json --reportDir ./ --inline
This how an HTML report will look like
![image](https://user-images.githubusercontent.com/50634523/178578707-d24ed17a-3e77-4d3c-86d1-3b8f7f3a9742.png)

# ATC_automation Exercise
Tool used for automation : Cypress(can be installed as a node dependency), IDE: VS Code.<br />
This exercise checks if user is able to add products to the cart and verify the product and price of the product added.<br />
,also checks if error message is displayed for invalid data.<br />
run npm install to install all the module.<br />
Then open cypress using npx cypress open or and run the spec file.<br />

https://user-images.githubusercontent.com/50634523/178560619-cdfbc4ea-2307-4989-baf4-310e22a23e9b.mp4

![image](https://user-images.githubusercontent.com/50634523/178560961-3160a572-3a29-4331-84dc-c5f4bb65e4a8.png)


You can also generate a report by installing mochawesome report generator<br />
Below are the commands:<br />
npm i mochawesome-report-generator<br />
npm i mochawesome-merge <br />
npm i mochawesome<br />
npx cypress run --reporter mochawesome <br />
It by default generates json report, you can also convert it to HTML<br />
first merge all your json reports using: npx mochawesome-merge cypress/reports/json/*.json | out-file -encoding ascii ./merged.json<br />
to create HTML report run: npx marge ./merged.json --reportDir ./ --inline<br />
This how an HTML report will look like<br />
![image](https://user-images.githubusercontent.com/50634523/178578707-d24ed17a-3e77-4d3c-86d1-3b8f7f3a9742.png)

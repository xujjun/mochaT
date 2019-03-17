# mochaT
About Mocha API Testing
	•	How to use
			Install the dependencies locally and Mocha globally
			```bash
			$ cd mochaT
			$ npm install
			$ npm install --global mocha
			```
	
			If you want to run the test cases in preview, you can do this as below
			```bash
			$ cd mochaT
			$ npm run envp
			$ npm run test
			```

			If you want to run the test cases in demo, you can do this as below
			```bash
			$ cd mochaT
			$ npm run envd
			$ npm run test
			```
			If you want to setup new environment in the testing, you should go to 			library/setEnvInfo.js, refer to the existing script to add
const testPostBank = require('../library/postFunction');

// testcases for POST http://preview.airwallex.com:30001/bank
describe('check payment_method', function() {
   
    it('ENT_001_payment_method is SWIFT success-Bank details saved',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "SWIFT",
            "bank_country_code": "CN",
            "account_name": "中文",
            "account_number": "12345678",
            "swift_code": "ICBCCNBJ",
            "aba": "",
            "bsb": ""
            };
        var expectBody = {"success": "Bank details saved"};
        var expectStatus = 200;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_002_payment_method is LOCAL success-Bank details saved',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "US",
            "account_name": "John'Smith",
            "account_number": "12345678901234567",
            "swift_code": "",
            "aba": "123456789",
            "bsb": ""
            };
        var expectBody = {"success": "Bank details saved"};
        var expectStatus = 200;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_003_payment_method is required"',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "",
            "bank_country_code": "AU",
            "account_name": "John Smith",
            "account_number": "1234567",
            "swift_code": "",
            "aba": "",
            "bsb": "123456"
            };
        var expectBody = {"error": "'payment_method' field required, the value should be either 'LOCAL' or 'SWIFT'"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_004_payment_method should not be either LOCAL or SWIFT',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "test",
            "bank_country_code": "US",
            "account_name": "John Smith",
            "account_number": "123",
            "swift_code": "",
            "aba": "",
            "bsb": ""
            };
        var expectBody = {"error": "'payment_method' field required, the value should be either 'LOCAL' or 'SWIFT'"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });
});

describe('check bank_country_code', function() {
   
    it('ENT_001_bank_country_code should be AU success-Bank details saved',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "AU",
            "account_name": "John_Smith",
            "account_number": "卡号3456789",
            "swift_code": "",
            "aba": "",
            "bsb": "123456"
            };
        var expectBody = {"success": "Bank details saved"};
        var expectStatus = 200;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_002_bank_country_code is required',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "",
            "account_name": "John Smith",
            "account_number": "123",
            "swift_code": "",
            "aba": ""
            };
        var expectBody = {"error": "'bank_country_code' is required, and should be one of 'US', 'AU', or 'CN'"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_003_bank_country_code should be one of US, AU, or CN',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "us",
            "account_name": "John Smith",
            "account_number": "123",
            "swift_code": "ICBCUSBJ",
            "aba": "11122233A"
            };
        var expectBody = {"error": "'bank_country_code' is required, and should be one of 'US', 'AU', or 'CN'"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });
});

describe('check account_name', function() {
   
    it('ENT_001_account_name should be avaliable success-Bank details saved',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "AU",
            "account_name": "J~!12.",
            "account_number": "卡~!a。6.",
            "swift_code": "",
            "aba": "",
            "bsb": "123456"
            };
        var expectBody = {"success": "Bank details saved"};
        var expectStatus = 200;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_002_account_name is required',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "US",
            "account_name": "",
            "account_number": "123",
            "swift_code": "ICBCUSBJ",
            "aba": "11122233A"
            };
        var expectBody = {"error": "'account_name' is required"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_003_Length of account_name < 2',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "US",
            "account_name": "a",
            "account_number": "123",
            "swift_code": "",
            "aba": ""
            };
        var expectBody = {"error": "Length of account_name should be between 2 and 10"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_004_Length of account_name > 10',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "US",
            "account_name": "12345678901",
            "account_number": "123",
            "swift_code": "",
            "aba": "11122233A"
            };
        var expectBody = {"error": "Length of account_name should be between 2 and 10"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });
});

describe('check account_number', function() {
   
    it('ENT_001_account_number should be avaliable success-Bank details saved',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "US",
            "account_name": "J~!12.",
            "account_number": "1",
            "swift_code": "",
            "aba": "123456789",
            "bsb": ""
            };
        var expectBody = {"success": "Bank details saved"};
        var expectStatus = 200;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_002_account_number is required',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "SWIFT",
            "bank_country_code": "US",
            "account_name": "John Smith",
            "account_number": "",
            "swift_code": "ICBCUSBJ",
            "aba": "11122233A"
            };
        var expectBody = {"error": "'account_number' is required"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });
    
    it('ENT_003_Length of account_number > 17 when bank_country_code is US ',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "SWIFT",
            "bank_country_code": "US",
            "account_name": "John Smith",
            "account_number": "123456789012345678",
            "swift_code": "ICBCUSBJ",
            "aba": "11122233A"
            };
        var expectBody = {"error": "Length of account_number should be between 1 and 17 when bank_country_code is 'US'"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_004_Length of account_number > 9 when bank_country_code is AU ',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "SWIFT",
            "bank_country_code": "AU",
            "account_name": "John Smith",
            "account_number": "1234567890",
            "swift_code": "ICBCAUBJ",
            "aba": "",
            "bsb": "123456"
            };
        var expectBody = {"error": "Length of account_number should be between 6 and 9 when bank_country_code is 'AU'"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_005_Length of account_number < 6 when bank_country_code is AU ',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "AU",
            "account_name": "John Smith",
            "account_number": "12345",
            "swift_code": "",
            "aba": "",
            "bsb": "123456"
            };
        var expectBody = {"error": "Length of account_number should be between 6 and 9 when bank_country_code is 'AU'"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_006_Length of account_number < 8 when bank_country_code is CN ',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "CN",
            "account_name": "John Smith",
            "account_number": "12345",
            "swift_code": "",
            "aba": "",
            "bsb": ""
            };
        var expectBody = {"error": "Length of account_number should be between 8 and 20 when bank_country_code is 'CN'"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_007_Length of account_number > 20 when bank_country_code is CN ',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "CN",
            "account_name": "John Smith",
            "account_number": "123456789012345678901",
            "swift_code": "",
            "aba": "",
            "bsb": ""
            };
        var expectBody = {"error": "Length of account_number should be between 8 and 20 when bank_country_code is 'CN'"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });
});

describe('check swift_code', function() {
   
    it('ENT_001_swift_code is required when payment method is SWIFT',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "SWIFT",
            "bank_country_code": "US",
            "account_name": "John Smith",
            "account_number": "1234567890",
            "swift_code": "",
            "aba": "",
            "bsb": ""
            };
        var expectBody = {"error": "'swift_code' is required when payment method is 'SWIFT'"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_002_swift_code is not valid for the given bank country code: US',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "SWIFT",
            "bank_country_code": "US",
            "account_name": "John Smith",
            "account_number": "1234567890",
            "swift_code": "ICBCusBJ",
            "aba": "",
            "bsb": ""
            };
        var expectBody = {"error": "The swift code is not valid for the given bank country code: US"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_003_swift_code is not required when payment method is LOCAL success-Bank details saved',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "AU",
            "account_name": "John Smith",
            "account_number": "123456",
            "swift_code": "",
            "aba": "",
            "bsb": "11@aA中"
            };
        var expectBody = {"success": "Bank details saved"};
        var expectStatus = 200;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_004_swift_code is not valid for the given bank country code: AU',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "SWIFT",
            "bank_country_code": "AU",
            "account_name": "John Smith",
            "account_number": "123456",
            "swift_code": "ICBCaaBJ",
            "aba": "",
            "bsb": "1@aA中。"
            };
        var expectBody = {"error": "The swift code is not valid for the given bank country code: AU"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_005_swift_code is not valid for the given bank country code: CN',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "SWIFT",
            "bank_country_code": "CN",
            "account_name": "John Smith",
            "account_number": "123456789",
            "swift_code": "ICBCcnBJ",
            "aba": "",
            "bsb": ""
            };
        var expectBody = {"error": "The swift code is not valid for the given bank country code: CN"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_006_Length of swift_code < 8',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "SWIFT",
            "bank_country_code": "CN",
            "account_name": "John Smith",
            "account_number": "123456789",
            "swift_code": "ICBCCN",
            "aba": "",
            "bsb": ""
            };
        var expectBody = {"error": "Length of 'swift_code' should be either 8 or 11"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_007_Length of swift_code > 8 and < 11',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "SWIFT",
            "bank_country_code": "CN",
            "account_name": "John Smith",
            "account_number": "123456789",
            "swift_code": "ICBKCNBJa",
            "aba": "",
            "bsb": ""
            };
        var expectBody = {"error": "Length of 'swift_code' should be either 8 or 11"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_008_Length of swift_code > 11',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "SWIFT",
            "bank_country_code": "CN",
            "account_name": "John Smith",
            "account_number": "123456",
            "swift_code": "ICBKCNBJaaaa",
            "aba": "",
            "bsb": ""
            };
        var expectBody = {"error": "Length of 'swift_code' should be either 8 or 11"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_009_Length of swift_code = 11 success-Bank details saved',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "SWIFT",
            "bank_country_code": "US",
            "account_name": "John Smith",
            "account_number": "123456",
            "swift_code": "ICBKUSBJaaa",
            "aba": "11122233A",
            "bsb": ""
            };
        var expectBody = {"success": "Bank details saved"};
        var expectStatus = 200;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_010_Length of swift_code = 8 success-Bank details saved',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "SWIFT",
            "bank_country_code": "CN",
            "account_name": "John",
            "account_number": "1234567890123456789",
            "swift_code": "ICB&CNB1",
            "aba": "",
            "bsb": "1。@aA中"
            };
        var expectBody = {"success": "Bank details saved"};
        var expectStatus = 200;

        testPostBank(postBody, expectBody, expectStatus, done);
    });
});

describe('check bsb', function() {
   
    it('ENT_001_bsb is required when bank country code is AU',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "AU",
            "account_name": "John Smith",
            "account_number": "123456",
            "swift_code": "",
            "aba": "",
            "bsb": ""
            };
        var expectBody = {"error": "'bsb' is required when bank country code is 'AU'"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_002_Length of bsb < 6',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "AU",
            "account_name": "John Smith",
            "account_number": "123456",
            "swift_code": "",
            "aba": "",
            "bsb": "12345"
            };
        var expectBody = {"error": "Length of 'bsb' should be 6"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_003_Length of bsb > 6',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "AU",
            "account_name": "John Smith",
            "account_number": "123456",
            "swift_code": "",
            "aba": "",
            "bsb": "1234567"
            };
        var expectBody = {"error": "Length of 'bsb' should be 6"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_004_Length of bsb = 6 success-Bank details saved',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "AU",
            "account_name": "John Smith",
            "account_number": "123456",
            "swift_code": "",
            "aba": "11122233A",
            "bsb": "123456"
            };
        var expectBody = {"success": "Bank details saved"};
        var expectStatus = 200;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

});

describe('check aba', function() {
   
    it('ENT_001_aba is required when bank country code is US',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "US",
            "account_name": "John Smith",
            "account_number": "123456",
            "swift_code": "",
            "aba": "",
            "bsb": ""
            };
        var expectBody = {"error": "'aba' is required when bank country code is 'US'"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_002_Length of aba > 9',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "US",
            "account_name": "John Smith",
            "account_number": "123456",
            "swift_code": "",
            "aba": "1234567890",
            "bsb": ""
            };
        var expectBody = {"error": "Length of 'aba' should be 9"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_003_Length of aba < 9',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "US",
            "account_name": "John Smith",
            "account_number": "123456",
            "swift_code": "",
            "aba": "12345678",
            "bsb": ""
            };
        var expectBody = {"error": "Length of 'aba' should be 9"};
        var expectStatus = 400;

        testPostBank(postBody, expectBody, expectStatus, done);
    });

    it('ENT_004_Length of aba = 9 success-Bank details saved',function(done) {         this.retries(1);
        var postBody = {
            "payment_method": "LOCAL",
            "bank_country_code": "US",
            "account_name": "John Smith",
            "account_number": "123456",
            "swift_code": "",
            "aba": "123456789",
            "bsb": "1。@aA中"
            };
        var expectBody = {"success": "Bank details saved"};
        var expectStatus = 200;

        testPostBank(postBody, expectBody, expectStatus, done);
    });
});
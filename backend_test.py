#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class YourAllyProAPITester:
    def __init__(self, base_url="https://9c8c7967-d1d6-4e4c-9766-e535898a3f2c.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        self.passed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"Status Code: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                self.passed_tests.append(f"{name} - Status {response.status_code}")
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                    return True, response_data
                except:
                    return True, {}
            else:
                self.failed_tests.append({
                    "test_name": name,
                    "endpoint": endpoint,
                    "expected_status": expected_status,
                    "actual_status": response.status_code,
                    "response_text": response.text[:500] if response.text else "No response"
                })
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:500]}")
                return False, {}

        except Exception as e:
            self.failed_tests.append({
                "test_name": name,
                "endpoint": endpoint,
                "error": str(e)
            })
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_endpoint(self):
        """Test health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )

    def test_contact_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "John Test",
            "email": "john.test@example.com",
            "company": "Test Agency",
            "message": "This is a test message for API testing"
        }
        
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=test_data
        )

    def test_get_contacts(self):
        """Test getting contacts list"""
        return self.run_test(
            "Get Contacts List",
            "GET",
            "api/contacts",
            200
        )

    def test_contact_validation(self):
        """Test contact form with invalid data"""
        invalid_data = {
            "name": "",
            "email": "invalid-email",
            "company": "",
            "message": ""
        }
        
        # This should fail validation (422 or 400)
        success, _ = self.run_test(
            "Contact Form Validation",
            "POST",
            "api/contact",
            422,  # Expecting validation error
            data=invalid_data
        )
        
        # If it returns 200, it means validation is not working properly
        if not success:
            # Try again expecting 400
            success, _ = self.run_test(
                "Contact Form Validation (400)",
                "POST",
                "api/contact",
                400,
                data=invalid_data
            )
        
        return success

def main():
    print("🚀 Starting YourAllyPro API Tests")
    print("="*50)
    
    # Setup
    tester = YourAllyProAPITester()
    
    # Run all tests
    print("\n📡 Testing Backend API Endpoints...")
    
    # Test health endpoint
    tester.test_health_endpoint()
    
    # Test contact form submission
    tester.test_contact_submission()
    
    # Test getting contacts
    tester.test_get_contacts()
    
    # Test validation
    tester.test_contact_validation()
    
    # Print summary
    print("\n" + "="*50)
    print("📊 TEST SUMMARY")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {len(tester.failed_tests)}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    if tester.passed_tests:
        print("\n✅ PASSED TESTS:")
        for test in tester.passed_tests:
            print(f"  • {test}")
    
    if tester.failed_tests:
        print("\n❌ FAILED TESTS:")
        for test in tester.failed_tests:
            error_msg = test.get('error', f'Status {test.get("actual_status", "unknown")}')
            print(f"  • {test['test_name']}: {error_msg}")
    
    return 0 if len(tester.failed_tests) == 0 else 1

if __name__ == "__main__":
    sys.exit(main())
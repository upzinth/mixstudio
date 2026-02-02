#!/bin/bash

BASE_URL="http://localhost:3000/api"
EMAIL="system_test_$(date +%s)@example.com"
PASSWORD="password123"

echo "1. Testing Registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\", \"fullName\": \"System Test User\", \"avatarUrl\": \"\"}")

echo "Response: $REGISTER_RESPONSE"
TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Registration Failed"
  exit 1
else
  echo "✅ Registration Success. Token received."
fi

echo -e "\n2. Testing Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")

echo "Response: $LOGIN_RESPONSE"
LOGIN_TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$LOGIN_TOKEN" ]; then
  echo "❌ Login Failed"
  exit 1
else
  echo "✅ Login Success."
fi

echo -e "\n3. Testing Get Profile (Me)..."
ME_RESPONSE=$(curl -s -X GET "$BASE_URL/auth/me" \
  -H "Authorization: Bearer $TOKEN")

echo "Response: $ME_RESPONSE"
USER_ID=$(echo $ME_RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

if [ -z "$USER_ID" ]; then
  echo "❌ Get Profile Failed"
  exit 1
else
  echo "✅ Get Profile Success. User ID: $USER_ID"
fi

echo -e "\n4. Testing Update Profile..."
UPDATE_RESPONSE=$(curl -s -X PUT "$BASE_URL/profiles/$USER_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"website\": \"https://updated-website.com\"}")

echo "Response: $UPDATE_RESPONSE"
WEBSITE_CHECK=$(echo $UPDATE_RESPONSE | grep "https://updated-website.com")

if [ -z "$WEBSITE_CHECK" ]; then
  echo "❌ Update Profile Failed"
  exit 1
else
  echo "✅ Update Profile Success."
fi

echo -e "\n🎉 All Systems Functional!"

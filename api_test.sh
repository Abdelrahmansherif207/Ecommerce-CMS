#!/bin/bash

# Login
echo "=== LOGIN ==="
TOKEN_RESPONSE=$(curl -s -X POST "https://mohammedtareq.me/api/v1/token" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"admin@demo.com","password":"password"}')

echo "$TOKEN_RESPONSE"

# Extract token
TOKEN=$(echo "$TOKEN_RESPONSE" | grep -o '"token":"[^"]*"' | head -1 | cut -d'"' -f4)
echo ""
echo "TOKEN: $TOKEN"
echo ""

# Get sections
echo "=== GET SECTIONS ==="
curl -s -X GET "https://mohammedtareq.me/api/v1/sections" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool 2>/dev/null || curl -s -X GET "https://mohammedtareq.me/api/v1/sections" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo "=== GET SECTION TYPES ==="
curl -s -X GET "https://mohammedtareq.me/api/v1/section-types" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo "=== GET SECTION 1 ==="
curl -s -X GET "https://mohammedtareq.me/api/v1/sections/1" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo "=== GET PRODUCT TYPES ==="
curl -s -X GET "https://mohammedtareq.me/api/v1/product-type" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo "=== GET TYPE SETTINGS (products) ==="
curl -s -X GET "https://mohammedtareq.me/api/v1/section-types/products/settings" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo "=== GET TYPE SETTINGS (banners) ==="
curl -s -X GET "https://mohammedtareq.me/api/v1/section-types/banners/settings" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo "=== GET TYPE SETTINGS (promotions) ==="
curl -s -X GET "https://mohammedtareq.me/api/v1/section-types/promotions/settings" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo "=== GET TYPE SETTINGS (flash-sales) ==="
curl -s -X GET "https://mohammedtareq.me/api/v1/section-types/flash-sales/settings" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo "=== GET TYPE SETTINGS (coupons) ==="
curl -s -X GET "https://mohammedtareq.me/api/v1/section-types/coupons/settings" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo "=== GET TYPE SETTINGS (brand) ==="
curl -s -X GET "https://mohammedtareq.me/api/v1/section-types/brand/settings" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo "=== DONE ==="

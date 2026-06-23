#!/bin/bash

TOKEN_RESPONSE=$(curl -s -X POST "https://mohammedtareq.me/api/v1/token" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"admin@demo.com","password":"password"}')

TOKEN=$(echo "$TOKEN_RESPONSE" | grep -o '"token":"[^"]*"' | head -1 | cut -d'"' -f4)

echo "=== GET TYPE SETTINGS (brands) ==="
curl -s -X GET "https://mohammedtareq.me/api/v1/section-types/brands/settings" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo "=== GET TYPE SETTINGS (sliders) ==="
curl -s -X GET "https://mohammedtareq.me/api/v1/section-types/sliders/settings" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo "=== GET TYPE SETTINGS (categories) ==="
curl -s -X GET "https://mohammedtareq.me/api/v1/section-types/categories/settings" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo "=== DONE ==="

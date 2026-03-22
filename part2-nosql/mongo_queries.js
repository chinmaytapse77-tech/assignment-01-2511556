// ============================================================
// Part 2 Task 2.2 — MongoDB Operations
// Collection: products
// ============================================================


// OP1: insertMany() — insert all 3 documents from sample_documents.json
db.products.insertMany([
  {
    "_id": "PROD_E001",
    "product_name": "Samsung 4K Smart TV",
    "category": "Electronics",
    "brand": "Samsung",
    "price": 75000,
    "stock": 20,
    "specs": {
      "screen_size_inch": 55,
      "resolution": "4K UHD",
      "voltage": "220V",
      "warranty_years": 2,
      "connectivity": ["WiFi", "Bluetooth", "HDMI", "USB"]
    },
    "ratings": { "average": 4.5, "total_reviews": 320 },
    "tags": ["television", "smart tv", "4K", "samsung"]
  },
  {
    "_id": "PROD_C001",
    "product_name": "Men's Cotton Kurta",
    "category": "Clothing",
    "brand": "FabIndia",
    "price": 1299,
    "stock": 150,
    "specs": {
      "material": "100% Cotton",
      "sizes_available": ["S", "M", "L", "XL", "XXL"],
      "colors": ["White", "Blue", "Beige"],
      "care_instructions": "Hand wash cold, do not bleach",
      "fit_type": "Regular"
    },
    "ratings": { "average": 4.2, "total_reviews": 85 },
    "tags": ["kurta", "ethnic wear", "cotton", "men"]
  },
  {
    "_id": "PROD_G001",
    "product_name": "Organic Rolled Oats",
    "category": "Groceries",
    "brand": "Quaker",
    "price": 299,
    "stock": 500,
    "specs": {
      "weight_grams": 1000,
      "expiry_date": "2025-06-30",
      "storage_instructions": "Store in a cool, dry place",
      "is_organic": true,
      "nutritional_info": {
        "calories_per_100g": 379,
        "protein_g": 13.5,
        "carbohydrates_g": 67.7,
        "fat_g": 6.9,
        "fiber_g": 10.6
      },
      "allergens": ["Gluten", "Oats"]
    },
    "ratings": { "average": 4.7, "total_reviews": 210 },
    "tags": ["oats", "breakfast", "organic", "healthy"]
  }
]);


// OP2: find() — retrieve all Electronics products with price > 20000
db.products.find(
  {
    category: "Electronics",
    price: { $gt: 20000 }
  },
  {
    product_name: 1,
    brand: 1,
    price: 1,
    category: 1
  }
);


// OP3: find() — retrieve all Groceries expiring before 2025-01-01
db.products.find(
  {
    category: "Groceries",
    "specs.expiry_date": { $lt: "2025-01-01" }
  },
  {
    product_name: 1,
    brand: 1,
    "specs.expiry_date": 1
  }
);


// OP4: updateOne() — add a "discount_percent" field to a specific product
db.products.updateOne(
  { _id: "PROD_E001" },
  {
    $set: { discount_percent: 10 }
  }
);


// OP5: createIndex() — create an index on the category field
// Reason: category is the most commonly used filter field (see OP2, OP3).
// Without an index, MongoDB scans every document in the collection
// (full collection scan). With an index on category, MongoDB jumps
// directly to matching documents — making queries significantly faster
// as the collection grows to thousands or millions of products.
db.products.createIndex(
  { category: 1 },
  { name: "idx_category" }
);

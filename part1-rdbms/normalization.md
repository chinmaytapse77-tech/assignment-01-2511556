Normalisation — Part 1
## Anomaly Analysis

# Insert Anomaly
An insert anomaly occurs when a new record cannot be added to the database without including unrelated or unavailable data.
e.g., from the Datasets:
Suppose a new customer, say "Riya Patel" (C009, riya@gmail.com, Pune), signs up on the platform but has not placed any orders yet. In "orders_flat.csv", it isnt possible to record this entry because every row requires an "order_id", "product_id", "unit_price", "quantity", "order_date", and other order-specific fields. 
"If no order exists, the customer cannot be recorded. This is a classic **insert anomaly**".
---

# Update Anomaly
***An update anomaly occurs when the same real-world fact is stored in multiple rows, meaning a single change requires updating many rows — and if even one row is missed, the data becomes inconsistent.***
e.g., from the Datasets:
Sales representative "SR01 (Deepak Joshi)" has his "office_address" repeated across dozens of rows. However, the address is stored inconsistently:
Rows 3, 4, 10, 11, 16, 20...store: "Mumbai HQ, Nariman Point, Mumbai - 400021"
Rows 39, 58, 91, 94, 98, 100...store: "Mumbai HQ, Nariman Pt, Mumbai - 400021"
These two values refer to the same office but are recorded differently (abbreviated "Nariman Pt" vs full "Nariman Point"). If SR01's office address needed to be officially updated (e.g., a new pin code), every one of SR01's order rows would need to be updated individually. Missing even one row would leave the database in an inconsistent state.
 ---

# Delete Anomaly
A delete anomaly occurs when deleting a record unintentionally destroys other useful, unrelated information.
e.g., from the Datasets:
Product "P008" (Webcam, Electronics, ₹2100) appears in only one row — Row 13 (order "ORD1185", customer C003, Amit Verma).
If this order is deleted — for example, because it was cancelled or returned — all knowledge of the Webcam product (P008) is permanently lost from the database. There is no separate product table, so the product name, category, and unit price exist only within that single order row.
This means a legitimate business operation (cancelling an order) causes unintended data loss (losing a product record). The same risk applies to customer data: if all orders by a customer were deleted, that customer's name, email, and city would also be wiped from the system entirely.
---

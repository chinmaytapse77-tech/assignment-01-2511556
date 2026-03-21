-- ============================================================
-- Part 5 Task 5.1 — Cross-Format Queries using DuckDB
-- Files read directly (no pre-loading into tables):
--   customers  → customers.csv
--   orders     → orders.json
--   products   → products.parquet
-- ============================================================
-- NOTE: Run these in a DuckDB environment (e.g. Google Colab
-- with duckdb installed, or duckdb CLI).
-- Replace file paths with the actual path on your machine.
-- ============================================================


-- Q1: List all customers along with the total number of orders they have placed
SELECT
    c.customer_id,
    c.name                       AS customer_name,
    c.city,
    COUNT(o.order_id)            AS total_orders
FROM read_csv_auto('customers.csv')  AS c
LEFT JOIN read_json_auto('orders.json') AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name, c.city
ORDER BY total_orders DESC;


-- Q2: Find the top 3 customers by total order value
SELECT
    c.customer_id,
    c.name                        AS customer_name,
    c.city,
    SUM(o.total_amount)           AS total_order_value
FROM read_csv_auto('customers.csv')     AS c
JOIN read_json_auto('orders.json')      AS o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name, c.city
ORDER BY total_order_value DESC
LIMIT 3;


-- Q3: List all products purchased by customers from Bangalore
-- Note: orders.json links customers to orders via customer_id.
-- Products are matched via num_items > 0 and cross-referenced
-- with products.parquet on order value range as orders do not
-- carry an explicit product_id field.
SELECT DISTINCT
    c.customer_id,
    c.name                         AS customer_name,
    c.city,
    o.order_id,
    o.total_amount,
    o.num_items,
    p.product_name,
    p.category
FROM read_csv_auto('customers.csv')      AS c
JOIN read_json_auto('orders.json')       AS o
    ON c.customer_id = o.customer_id
JOIN read_parquet('products.parquet')    AS p
    ON p.price <= o.total_amount
WHERE c.city = 'Bangalore'
ORDER BY c.customer_id, o.order_id;


-- Q4: Join all three files to show: customer name, order date, product name, and quantity
SELECT
    c.name                          AS customer_name,
    o.order_date,
    p.product_name,
    o.num_items                     AS quantity,
    o.total_amount,
    o.status
FROM read_csv_auto('customers.csv')      AS c
JOIN read_json_auto('orders.json')       AS o
    ON c.customer_id = o.customer_id
JOIN read_parquet('products.parquet')    AS p
    ON p.price <= o.total_amount
ORDER BY o.order_date, c.name;

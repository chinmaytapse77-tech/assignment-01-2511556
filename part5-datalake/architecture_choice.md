# Data Lake — Part 5

## Architecture Recommendation

For a fast-growing food delivery startup collecting GPS location logs, customer text reviews, payment transactions, and restaurant menu images, I would recommend a **Data Lakehouse** architecture.

A Data Lakehouse combines the best features of both a Data Lake and a Data Warehouse, and it is the most appropriate choice for this startup for the following three reasons.

**1. The data is highly varied in format and structure.**
The startup collects four fundamentally different types of data: structured data (payment transactions), semi-structured data (GPS logs and text reviews), and unstructured data (menu images). A traditional Data Warehouse only handles structured, schema-defined data well — it cannot store raw GPS streams or images without significant pre-processing. A pure Data Lake can store all formats but lacks the query performance and ACID transaction support needed for payment data. A Data Lakehouse handles all four data types natively in a single architecture, storing raw files in a data lake layer while supporting SQL queries and transactions on the structured layer.

**2. The startup needs both real-time operations and historical analytics.**
Payment transactions require ACID compliance and fast lookups (OLTP behaviour), while business intelligence reports — such as peak delivery hours or most popular cuisines by region — require analytical queries over historical data (OLAP behaviour). A Data Lakehouse supports both through its unified storage and query engine (e.g. Apache Spark or Databricks), eliminating the need to maintain two separate systems.

**3. It is cost-effective and scalable for a growing startup.**
A Data Warehouse is expensive to scale and rigid in schema. A pure Data Lake is cheap but hard to query and govern. A Data Lakehouse (e.g. Delta Lake, Apache Iceberg) stores data cheaply in cloud object storage (like AWS S3) while adding a metadata and indexing layer that enables fast SQL queries. As the startup grows from thousands to millions of daily orders, the architecture scales horizontally without a major redesign.

In summary, the variety of data types, the need for both transactional and analytical workloads, and the cost-scalability requirements all point to a **Data Lakehouse** as the optimal architecture for this food delivery startup.

---
title: DocumentDB Range Queries for Pagination
published_at: 2024-11-12T0:00:00.000Z
snippet: Don't use skip and limit on large collections
---

Working with AWS DocumentDB recently and I came across the need to implement pagination. A quick google search will quickly up with results suggesting this approach 

## Skip and limit pagination 

```
db.collection.find()
  .skip((pageNumber - 1) * pageSize)
  .limit(pageSize)
e.g
// Page 1 with 20 items per page
db.users.find().skip(0).limit(20)
// Page 2 with 20 items per page
db.users.find().skip(20).limit(20)
``` 

The idea being that you leverage skip and limit functions to create a narrowed result set. Sounds good right? Well hang on, this is still executing this query across the entire collection and then scanning over to implement the skip. This is probably fine in most instances and the performance impacts would be small. But what about if you have 100k documents in your collection? This approach will rapidly breakdown and you will run into some performance issues really quick. 

## Range query pagination 

Another approach to pagination which doesn't require a scan of a collection is the range query. Using an id or any indexed value that has an increasing value ( timestamp for example, incrementing id etc. ), the last id/value from the last query is then used for subsequent queries. 

```
/ First query
db.collection.find().sort({ _id: 1 }).limit(pageSize)
// Subsequent query
db.collection.find({ _id: { $gt: lastId } })
  .sort({ _id: 1 })
  .limit(pageSize)
```

So this works by searching for an _id that is greater than a lastId. So if this was a incremental value such as a timestamp or integer we can query beyond the previous value, sort in ascending order and limit to a set. 


We can also create partial indexes with range queries to improve performance 

```
/ Create index
db.users.createIndex(
  { lastLogin: 1 },
  { partialFilterExpression: { isActive: true } }
)
// Query
db.users.find({ isActive: true, lastLogin: { $gt: ISODate("2023-01-01") } })
  .sort({ lastLogin: 1 })
  .limit(20)
```


## How to measure performance 

We can use the .explain("executionStats") function to extract the the query plan for the query. 

```
db.users.find().skip(20).limit(20).explain("executionStats")
```

```
db.users.find({ isActive: true, lastLogin: { $gt: ISODate("2023-01-01") } })
  .sort({ lastLogin: 1 })
  .limit(20).explain("executionStats")
```

What you will see is DocumentDB creating a plan for the executing of the query. Skip and Limit querys will trigger the COLSCAN vs IXSCAN, COLSCAN being the method of iteration over a collection vs a index scan. 
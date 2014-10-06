Version 0.0.2
=============
Development of viable and more efficient extractor.

###Observations:

- Extracts:
    - All the information of the earlier version  in an unsorted way.
    - Metadata formats available.
    - Repository identity and characteristics.

- Stores:
    - List Wise, which means all information packaged and unsorted.
    
- Performance:
	- It is seriously faster (circa 20 to 30 times) in our use case. Having scored 1m 5s in the last test.
	- Has lesser redundacy and occupies much less space.
    - Causes:
        - Less intensive, by concentrating in getting less and larger files.
        - Ignores the concept of empty community, because it gets identifiers and records all packaged in many unsorted files.
        - Stores uniquely a record, due to prior cause.
        
- New Features:
    - Added the selective folder parameter ( as you can see in tests)

- Motivated:
    - Higher focus on local processing needs.
    - Hope of a viable extractor.

###Use case: 

- RUN(Repositório da Universidade Nova) at run.unl.pt

###Test: 
- node oaiextractor.js http://run.unl.pt/oai/request? results

####Developed by : Carlos Pinto Machado(AAMaster)



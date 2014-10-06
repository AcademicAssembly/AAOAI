Version 0.0.3
=============
Development of viable and more efficient extractor, as well as storage arquitecture.

###Observations:

- Extracts:
    - Same as v0.0.2

- Stores:
    - List Wise, which means all information packaged and unsorted.
    
- Performance:
	- Two times faster as v0.0.2 (Last timed test circa 38s)
    - Causes:
        - Assynchronous requests
        
- New Features:
    - Assynchronous requests

- Motivated:
    - Assynchronous perspective

###Use case: 

- RUN(Repositório da Universidade Nova) at run.unl.pt

###Test: 
- node oaiextractor.js http://run.unl.pt/oai/request? results

###Status:
- Developing a new and fitting data schema, whilst the assynchrous requests were already implemented

####Developed by : Carlos Pinto Machado(AAMaster)

###Test
<img src="https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-xap1/t31.0-8/1617269_10202964165248704_2012480510780562196_o.jpg">
As you can see it took 38s


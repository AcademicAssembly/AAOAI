Version 0.0.1
=============
First development and research on OAI-PMH.

###Observations:

- Extracts:
    - ListSets(communities)
    - ListIdentifiers(Id of records)
    - Records(metadata on publications in oai_dc) of each community

- Stores:
    - Community wise
    
- Performance:
    - Rather Slow. Took circa 45 minutes to accomplish the task in the use case.
    - Has big redundacy and occupies way to much space.    
    - Causes:
        - More XHR than local processing strategy enhanced slow behaviour. (Maybe introduction of proper concurrency would be a solution)
        - Redundacy in files and organization, was caused by many phenomena. Such as:
            - It was found that records can exist in more than one community.
            - Verified huge gaps in use case,because there were 993 empty communities out of 1584.

- Motivated:
    - Statistical analysis of a repository's features and organization.
	- An approach in less xhr and more local processing.
	- Less redundacy in file keeping.

###Use case: 

- RUN(Repositório da Universidade Nova) at run.unl.pt

###Test: 
- node oaiextractor.js http://run.unl.pt/oai/request?
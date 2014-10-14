Proposal for data schema for storage
====================================

### Actual State:
- Storage of packaged xml according to verb of origin

###Proposal:
#### Aditional features:
- Store identifiers in custom way in folders of each community.(Custom schema down)
    - Can be done via local processing.
    - Json files, which contain array with identifiers and record name, with community name.
        - Advantages:
            - Easier for development of search engine and efficiency guaranteed, due to unique id.
            - Easy implementation, according to status of extractor.(Architecturally friendly)
        - Disadvantages:
            - Expansion of extracted data space and time complexity.
            - Still raw schema, which can include certain features author and others.

#### Will be deleting:
- ListIdentifiers
    - Why?
        - Time and space consumming.
        - Dependence of extraction in early stages, renders it useless for project goals
    - Why not?
        - Mode independent of extraction would give more liberty for search Engine.

###Status: On deliberation

#####Proposed by : [AAMaster](https://github.com/AAMaster)

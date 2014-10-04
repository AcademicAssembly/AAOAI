Version 0.0.1
=============
First development and research on OAI-PMH.

Observations:

	- Gets ListSets(communities), ListIdentifiers(Id of records) of each and Records(metadata on publications) of each community.

	- Is rather slow, the strategy was more xhr than local processing. Took circa 45 minutes to accomplish the task in this repo.

	- Has big redundacy, such as repetitions of files. It was found that records can exist in more than one community.

	- Verified huge gaps in use case, because there were 993 empty communities out of 1584.
	
Motivated:

	- Statistical analysis of a repository's features and organization.

	- A view in less xhr and more local processing.

	- Less redundacy in file keeping.


Use case: Run at run.unl.pt

test: node oaiextractor.js http://run.unl.pt/oai/request?

Version 0.0.2
=============
Development of viable and more efficient extractor.

Observations:

	- It Gets all the information as the early version, but it is unsorted.

	- It is seriously faster (circa 20 to 30 times) in our use case, but is less intensive. Having scored 1m 5s in the last test.

	- Has lesser redundacy and has no repetitions on a file level.

	- Ignores the concept of empty community, because it gets identifiers and records all packaged in many unsorted files.

	- Added the selective folder parameter ( as you can see in tests)

Motivated:

	- Higher focus on local processing needs.

	- Hope of a viable extractor.

Use case: Run at run.unl.pt

test: node oaiextractor.js http://run.unl.pt/oai/request? results





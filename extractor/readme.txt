Status: Projecting Version 0.0.2, 

Version 0.0.1
=============
First development and research on OAI-PMH.

Observations:
	-Gets ListSets(communities), ListIdentifiers(Id of records) of each and Records(metadata on publications) of each community.
	-Is rather slow, the strategy was more xhr than local processing. Took circa 45 minutes to accomplish the task in this repo.
	-Has big redundacy, such as repitions of files. It was found that records can exist in more than one community.
	-Verified huge gaps in use case, because there were 993 empty communities out of 1584.
	
Motivated:
	-Statistical analysis of a repository's features and organization.
	-A view in less xhr and more local processing.
	-Less redundacy in file keeping.

Version 0.0.2
=============
Under Development

Use case: Run at run.unl.pt

test: node oaiextractor.js http://run.unl.pt/oai/request?





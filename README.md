trueDapp
TrueDapp
TruthApp


The truth is out there…

Architecture

	Homepage ->

		Login
		
		Register

		See all news

	User ->

		Register
			Choose username and 5 key characteristics that you cannot change
			Publish to the smart contract 

		Login
			Username
			Public key 
				DB stores at two places username + public and public 
                + private + signature

	See all news ->
		Not registered
			View news

		Registered
			View news
            Create news 

	Note: News are not editable

	Create News->
			Goes to the smart contract
			Images -> goes to IPFS
			Choose news characteristics from the tree 
	
	See single news->
		Not registered
			Views news
			Views authors history
			Views characteristics and voting

		Registered
			Create 
			Vote about characteristics
			Create news

		Admins
			Check the trueness between the content and the request
			Bann users

	About->			


More to add:
	Registered users to choose admins
	Logged users can add new follow-up info – that way creating different news 
	Users can see only news with positive rating
	Admin can have their own rating or they can work mandatory or by key characteristics
	Authors with high rated and visited
	Donate for some interesting news
 


User
pass
privateKey
publicKey
publications
charactertistics

Express + Mongo
Holds users, roles, wallet, news, characteristics

Smart contract
Holds users, characteristics and news

IPFS
Holds images




build: 
	git add -A
	git commit -m 'changes to css'
	git push heroku master
build-long:
	git add -A
	git commit -m 'changes to css'
	git push heroku master
	git push github master
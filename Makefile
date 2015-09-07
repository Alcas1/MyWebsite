
${ARGS}='changes to css'

build: 
	git add -A
	git commit -m "${ARGS}"
	git push heroku master
build-long:
	git add -A
	git commit -m "${ARGS}"
	git push heroku master
	git push github master
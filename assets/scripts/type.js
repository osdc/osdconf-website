var app = document.getElementById('line3');

var typewriter = new Typewriter(app, {
    loop: true,
    cursor: '',
    typingSpeed: 'Fast',
    deleteSpeed: 'Fast'
});
	


typewriter.typeString(' ')
    .pauseFor(9600)
    .deleteAll()
    .typeString('A two day conference_')
    .pauseFor(700)
    .deleteChars(11)
    .typeString('festival!_')
    .pauseFor(900)
    .deleteAll()
    .typeString('on 11-12 march 2018_')
    .pauseFor(900)
    .deleteAll()
    .typeString('At Jaypee Institute of Information Technology,Sec 62_')
    .pauseFor(900)
    .start();
function init() {


	window.onload = function() {

    document.getElementById("contact").onsubmit = function() {
        var form = this;
        // document.getElementById('contained').className ='animate';
        // document.getElementById('contained2').className ='animate2';
        $('#contained').addClass('animated zoomUpOut');
        document.getElementById('success').className ='success_animate';
        setTimeout(function() {
            form.submit();
        }, 900); // 3 seconds
        return false;
    };
};
}

init();

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var g = {};
g.colors = [];
g.unused = [];
g.board = [];
g.selected = -1;
g.timeLeft = 45000;
g.disabled = true;
g.matched = 0;
g.win = false;
$(document).ready(function () {

    var list = ['#F44336', '#4CAF50', '#FFEB3B', '#2196F3', '#9C27B0'];
    g.colors = list;
    g.unused = list;
    for (var i = 0; i < 3; i++) {
        g.colors = g.colors.concat(list);
        g.unused = g.unused.concat(list);
    }

    $("#start").on("click", gameStart);

    $("#won").hide();
    $("#lost").hide();

    function gameStart() {
        var list = ['#F44336', '#4CAF50', '#FFEB3B', '#2196F3', '#9C27B0'];
        g.colors = list;
        g.unused = list;
        for (var i = 0; i < 3; i++) {
            g.colors = g.colors.concat(list);
            g.unused = g.unused.concat(list);
        }
        g.board = [];
        $("#start").hide();
        $("#won").hide();
        $("#lost").hide();
        g.matched = 0;
        g.disabled = false;
        g.win = false;
        var inter = setInterval(function () {
            g.timeLeft -= 1000;
            $("#stats-right").text("Time Left: " + g.timeLeft / 1000);
            if (g.win) {
                $("#top").css("color", "#555");
                $("#board").empty();
                $("#board").append("<div id='won'>COMPLETE<br>Seconds Left: " + (g.timeLeft / 1000) + "</div>");
                setTimeout(function () {
                    $("#board").empty();
                    $("#board").append("<div id='start'>START</div>");
                    gameTime();
                }, 5000);


                clearInterval(inter);

            }

            if (g.timeLeft === 0) {
                $("#top").css("color", "#555");
                $("#board").empty();
                $("#board").append("<div id='lost'>LOST<br>Left Matches: " + (10 - g.matched) + "</div>");
                setTimeout(function () {
                    $("#board").empty();
                    $("#board").append("<div id='start'>START</div>");
                    gameTime();
                }, 5000);


                clearInterval(inter);
            }
        }, 1000);



        for (var i = 0; i < 20; i++) {
            var index = Math.floor(Math.random() * g.unused.length);
            var color = g.unused[index];
            removeItem(g.unused, color);
            var card = {
                flipped: false,
                color: color,
                matched: false
            };
            g.board.push(card);


            $("#board").append("<div id='card-" + i + "' class='card card-front'></div>");

            $("#card-" + i).click(function () {
                if (!g.disabled) {

                    var cardID = $(this).attr("id").split("-")[1];
                    if (g.board[cardID].matched)
                        return;
                    var color = g.board[cardID].color;
                    g.board[cardID].flipped = !g.board[cardID].flipped;
                    if (g.board[cardID].flipped) {
                        $(this).css("background-color", color);
                    } else {
                        $(this).css("background-color", "#eee");
                    }


                    if (g.selected === -1) {
                        g.selected = cardID;

                    } else {
                        if (cardID !== g.selected) {


                            var cur = g.selected;
                            g.selected = -1;
                            if (color === g.board[cur].color) {
                                $("#top").css("color", color);
                                g.matched++;
                                $("#stats-left").text("Matched: " + g.matched);
                                var begin_size = 30;
                                var end_size = 36;
                                var speed = 500;

                                $("#stats-left").css("font-size", begin_size).animate({"font-size": end_size}, speed, function () {
                                    $("#stats-left").css("font-size", begin_size);
                                });

                                g.disabled = true;
                                setTimeout(function () {
                                    g.board[cardID].matched = true;
                                    g.board[cur].matched = true;
                                    $("#card-" + cur).addClass("card-gone");
                                    $("#card-" + cur).removeClass("card-front");
                                    $("#card-" + cardID).addClass("card-gone");
                                    $("#card-" + cardID).removeClass("card-front");
                                    g.disabled = false;
                                    var win = true;
                                    for (var j = 0; j < g.board.length; j++) {
                                        if (g.board[j].matched === false) {
                                            win = false;
                                        }
                                    }
                                    console.log(g.win);
                                    g.win = win;
                                }, 500);
                            }
                            g.disabled = true;
                            setTimeout(function () {
                                g.board[cardID].flipped = false;
                                $("#card-" + cardID).css("background-color", "#eee");
                                g.board[cur].flipped = false;
                                $("#card-" + cur).css("background-color", "#eee");
                                if (!g.win)
                                    g.disabled = false;
                            }, 1000);
                        }
                    }
                }
            });

        }



    }

    function gameTime() {
        g.disabled = true;
        g.timeLeft = 45000;
        $("#stats-right").text("Time Left: " + g.timeLeft / 1000);
        $("#start").on("click", gameStart);

    }

    function removeItem(array, item) {
        for (var i = array.length; i--; ) {
            if (array[i] === item) {
                array.splice(i, 1);
                return array;
            }
        }
        return array;
    }





});

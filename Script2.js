$(document).ready(function(){
    $(window).scroll(function(){
if(this.scrollER>20){
    $('.navbar').addClass("sticky");
}else{
    $('.navbar').removeClass("sticky")
}
});

$('.menu-button').click(function(){
    $('.navbar .menu').toggleClass("active");
    $('.menu-button i').toggleClass("active");
});

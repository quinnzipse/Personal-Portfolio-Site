AOS.init();

window.addEventListener("scroll", checkShowing);

function checkShowing() {
  if (this.scrollY > 250) {
    $('#main_content').fadeOut('slow');
  } else {
    $("#main_content").fadeIn('fast');
  }

  // if (this.scrollY > 400) {
  //   $("#about-panel").fadeIn('slow');
  // } else {
  //   $("#about-panel").fadeOut('fast');
  //
  // }

  if (this.scrollY > 1200) {
    $("#arrows_container").fadeOut('slow');
  } else {
    $("#arrows_container").fadeIn('slow');
  }
}

checkShowing();


/***********************
 Input mask BEGIN
 ***********************/
$(function () {
  const telInputs = $("input[type='tel']");
  if (telInputs.length) {
    String.prototype.replaceAt = function (index, replacement) {
      return (
        this.substr(0, index) +
        replacement +
        this.substr(index + replacement.length)
      );
    };

    const options = {
      onKeyPress: function (cep, event, currentField, options) {
        if (cep.charAt(1) === "8") {
          const currentValue = currentField.get(0).value;
          currentField.get(0).value = currentValue.replaceAt(1, "7");
        }
      },
    };

    telInputs.mask("+0 (000) 000-00-00", options);

    telInputs.on("focus", function () {
      if ($(this).get(0).value.length < 2) {
        $(this).get(0).value = "+";
      }
    });

    telInputs.on("blur", function () {
      if ($(this).get(0).value === "+") {
        $(this).get(0).value = "";
      }
    });
  }
});
/***********************
 Input mask END
 ***********************/

/***********************
MacOS Detection BEGIN
***********************/
$(function () {
  const is_macos = /^((?!chrome|android).)*Macintosh/i.test(
    navigator.userAgent
  );
  const is_iOS =
    !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  if (is_macos || is_iOS) {
    if ($(".class").length) {
      $(".class").addClass("is-macos");
    }
  }
});
/***********************
MacOS Detection END
***********************/

/***********************
 fancybox BEGIN
 ***********************/
$.fancybox.defaults.backFocus = false;
$.fancybox.defaults.autoFocus = false;
$.fancybox.defaults.lang = "ru";
$.fancybox.defaults.i18n = {
  ru: {
    CLOSE: "Закрыть",
    NEXT: "Дальше",
    PREV: "Назад",
    ERROR: "Не удается загрузить. <br/> Попробуйте позднее.",
    PLAY_START: "Начать слайдшоу",
    PLAY_STOP: "Остановить слайдшоу",
    FULL_SCREEN: "На весь экран",
    THUMBS: "Превью",
  },
};

function initFancy() {
  $(".fancy").fancybox({
    buttons: ["close"],
  });
  $(".fancy-modal").fancybox({
    selector: "",
    touch: false,
  });
  $(".fancy-map").fancybox({
    toolbar: false,
    smallBtn: true,
    defaultType: "iframe",
  });
  $(".fancy-video").fancybox({
    toolbar: false,
    smallBtn: true,
    youtube: {
      controls: 1,
      showinfo: 0,
      autoplay: 1,
    },
  });
}

$(function () {
  initFancy();
});
/***********************
 fancybox END
 ***********************/

/***********************
 Прокрутка к секциям BEGIN
 ***********************/
$(function () {
  if ($(".scrollto").length) {
    $(".scrollto").on("click", function () {
      const elementClick = $(this).attr("href");
      const destination = $(elementClick).offset().top;
      $("html,body").stop().animate({ scrollTop: destination }, 1000);
      return false;
    });
  }
});
/***********************
 Прокрутка к секциям END
 ***********************/

/***********************
 Waypoints BEGIN
 ***********************/
$(function () {
  if ($(".anim").length) {
    $(".anim").waypoint(
      function () {
        $(this.element).toggleClass("animated");
      },
      {
        offset: "85%",
      }
    );
  }
});
/***********************
 Waypoints END
 ***********************/

/***********************
 Header Menu BEGIN
 ***********************/
$(function () {
  const headerMenuCatalogLink = document.querySelector("[data-menu-open]");
  const body = document.body;
  const scrollUp = "scroll-up";
  const scrollDown = "scroll-down";
  let lastScroll = 0;

  const toggleBodyScroll = () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      body.classList.remove(scrollUp);
      return;
    }

    if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
      // down
      body.classList.remove(scrollUp);
      body.classList.add(scrollDown);
    } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
      // up
      body.classList.remove(scrollDown);
      body.classList.add(scrollUp);
    }
    lastScroll = currentScroll;
  }

  window.addEventListener("scroll", toggleBodyScroll);

  if (headerMenuCatalogLink) {
    const headerMenuCatalog = document.querySelector(
      `.${headerMenuCatalogLink.dataset.menuOpen}`
    );

    const outsideClickListener = (event) => {
      if (
        event.target.closest(`.header-page-menu`) === null &&
        event.target.closest(`[data-menu-open]`) === null
      ) {
        closeHeaderMenu();
      }
    };

    const removeClickListener = () => {
      document.removeEventListener("click", outsideClickListener);
    };

    const removeBodyScrollListener = () => {
      window.removeEventListener("scroll", toggleBodyScroll);
    }

    const toggleHeaderMenu = (e) => {
      e.preventDefault();
      if (headerMenuCatalog.classList.contains("open")) {
        headerMenuCatalogLink.classList.remove("open");
        headerMenuCatalog.classList.remove("open");
        removeClickListener();
        window.addEventListener("scroll", toggleBodyScroll);
      } else {
        headerMenuCatalogLink.classList.add("open");
        headerMenuCatalog.classList.add("open");
        document.addEventListener("click", outsideClickListener);
        removeBodyScrollListener();
      }
    };

    const closeHeaderMenu = (e) => {
      if (headerMenuCatalog.classList.contains("open")) {
        headerMenuCatalogLink.classList.remove("open");
        headerMenuCatalog.classList.remove("open");
        removeClickListener();
        window.addEventListener("scroll", toggleBodyScroll);
      }
    };

    headerMenuCatalogLink.addEventListener("click", toggleHeaderMenu);
  }
});
/***********************
 Header Menu END
 ***********************/

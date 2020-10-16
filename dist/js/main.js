/*! avgvst v0.0.3 | (c) 2020 Bulat | MIT License | https://github.com/BulatSa/avgvst */
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
  const mobileMenuCatalogLink = document.querySelector(
    "[data-mobile-menu-open]"
  );
  const headerMenuCatalog = document.querySelector(
    `.${headerMenuCatalogLink.dataset.menuOpen}`
  );
  const mobileMenuCatalog = document.querySelector(
    `.${mobileMenuCatalogLink.dataset.mobileMenuOpen}`
  );
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
    } else if (
      currentScroll < lastScroll &&
      body.classList.contains(scrollDown)
    ) {
      // up
      body.classList.remove(scrollDown);
      body.classList.add(scrollUp);
    }
    lastScroll = currentScroll;
  };

  window.addEventListener("scroll", toggleBodyScroll);

  const outsideClickListener = (event) => {
    if (
      event.target.closest(`.header-page-menu`) === null &&
      event.target.closest(`[data-menu-open]`) === null
    ) {
      closeHeaderMenu();
    }
  };

  const removeOutsideClickListener = () => {
    document.removeEventListener("click", outsideClickListener);
  };

  const removeBodyScrollListener = () => {
    window.removeEventListener("scroll", toggleBodyScroll);
  };

  const closeHeaderMenu = (e) => {
    if (headerMenuCatalog.classList.contains("open")) {
      headerMenuCatalogLink.classList.remove("open");
      headerMenuCatalog.classList.remove("open");
      removeOutsideClickListener();
      window.addEventListener("scroll", toggleBodyScroll);
    }
  };

  if (headerMenuCatalogLink) {
    const toggleHeaderMenu = (e) => {
      e.preventDefault();
      if (headerMenuCatalog.classList.contains("open")) {
        headerMenuCatalogLink.classList.remove("open");
        headerMenuCatalog.classList.remove("open");
        removeOutsideClickListener();
        window.addEventListener("scroll", toggleBodyScroll);
      } else {
        headerMenuCatalogLink.classList.add("open");
        headerMenuCatalog.classList.add("open");
        document.addEventListener("click", outsideClickListener);
        removeBodyScrollListener();
      }
    };

    headerMenuCatalogLink.addEventListener("click", toggleHeaderMenu);
  }

  if (mobileMenuCatalogLink) {
    const toggleMobileMenu = (e) => {
      e.preventDefault();
      if (mobileMenuCatalog.classList.contains("open")) {
        mobileMenuCatalogLink.classList.remove("open");
        mobileMenuCatalog.classList.remove("open");
        window.addEventListener("scroll", toggleBodyScroll);
      } else {
        mobileMenuCatalogLink.classList.add("open");
        mobileMenuCatalog.classList.add("open");
        removeBodyScrollListener();
      }
    };

    mobileMenuCatalogLink.addEventListener("click", toggleMobileMenu);
  }
});
/***********************
 Header Menu END
 ***********************/

/***********************
 Open Sublink Mobile BEGIN
 ***********************/
$(function () {
  const subLinkList = document.querySelectorAll(
    ".header-mobile-menu .sub-link"
  );

  const toggleMobileSubMenu = (event) => {
    const parent = event.target.parentElement;
    const target = event.target;
    const el = parent.querySelector("ul");

    el.style.height = el.scrollHeight + "px";

    target.classList.toggle("open");
    el.style.height = target.classList.contains("open")
      ? el.scrollHeight + "px"
      : 0;
  };

  subLinkList.forEach((el) => {
    el.addEventListener("click", toggleMobileSubMenu);
  });
});
/***********************
 Open Sublink Mobile END
 ***********************/

/***********************
 Select2 BEGIN
 ***********************/
$(document).ready(function () {
  const formatSelectCurrency = (currency) => {
    if (!currency.id) {
      return currency.text;
    }
    const element = currency.element;
    //console.log(currency);

    const imgSrc = element.dataset.flagsrc;
    const title = element.dataset.title;
    const descr = element.dataset.descr;
    const $currency = $(`
      <img src="${imgSrc}"/>
      <span class="title">${title}</span>
      <span class="descr">${descr}</span>
    `);
    return $currency;
  };

  $(".select2-js--currency").select2({
    //width: '100%'
    theme: "avgvst-currency",
    dropdownAutoWidth: true,
    minimumResultsForSearch: Infinity,
    templateResult: formatSelectCurrency,
    templateSelection: formatSelectCurrency,
  });
});
/***********************
 Select2 END
 ***********************/

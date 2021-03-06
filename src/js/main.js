const isMobile = () => {
  if (document.documentElement.clientWidth < 960) {
    return true;
  }
  return false;
};

const isDesktop = () => {
  if (document.documentElement.clientWidth > 960) {
    return true;
  }
  return false;
};

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

    const telOptions = {
      onKeyPress: function (cep, event, currentField, options) {
        if (cep.charAt(1) === "8") {
          const currentValue = currentField.get(0).value;
          currentField.get(0).value = currentValue.replaceAt(1, "7");
        }
      },
    };

    telInputs.mask("+0 (000) 000-00-00", telOptions);

    telInputs.on("focus", function (event) {
      stylizePlaceholder(event);
      if ($(this).get(0).value.length < 2) {
        $(this).get(0).value = "+";
      }
    });

    telInputs.on("blur", function (event) {
      stylizePlaceholder(event);
      if ($(this).get(0).value === "+") {
        $(this).get(0).value = "";
      }
    });
  }
  /***********************
 Input mask END
 ***********************/

  /***********************
 Input validate BEGIN
 ***********************/
  const formList = document.querySelectorAll(".ajax-form");
  const inputEmailList = document.querySelectorAll("input[type=email]");
  const inputTextList = document.querySelectorAll("input.input-text");

  const stylizePlaceholder = (event) => {
    const input = event.target;
    const parentLabel = input.parentElement;

    if (event.type === "focus" && event.target.value === "") {
      parentLabel.classList.add("active");
    }

    if (event.type === "blur" && event.target.value === "") {
      parentLabel.classList.remove("active");
      parentLabel.classList.remove("error");
    }
  };

  const checkingForm = (event) => {
    const reqInputList = event.target.querySelectorAll("input[data-req]");
    const email = event.target.querySelector("input[type=email]");
    const emailLabel = email.parentElement;
    const selectList = event.target.querySelectorAll(".input-label select");

    selectList.forEach((select) => {
      const inputLabel = select.parentElement;
      const select2 = inputLabel.querySelector(".select2");
      //console.log(select2);
      if (select2.classList.contains("selected")) {
        inputLabel.classList.remove("error");
      } else {
        inputLabel.classList.add("error");
      }
      $(select).on("select2:select", function (e) {
        $(this).parent().removeClass("error");
      });
    });

    if (!email.validity.valid) {
      event.preventDefault();
      emailLabel.classList.add("error");
    }

    reqInputList.forEach((input) => {
      if (input.value === "") {
        event.preventDefault();
        input.parentElement.classList.add("error");
      } else {
        input.parentElement.classList.remove("error");
      }
    });
  };

  const checkingEmail = (event) => {
    const parentLabel = event.target.parentElement;
    if (event.target.validity.valid) {
      parentLabel.classList.remove("error");
    } else {
      parentLabel.classList.add("error");
    }
  };

  const checkingInputText = (event) => {
    const parentLabel = event.target.parentElement;
    if (event.target.value === "") {
      parentLabel.classList.add("error");
    } else {
      parentLabel.classList.remove("error");
    }
  };

  inputTextList.forEach((inputText) => {
    inputText.addEventListener("focus", stylizePlaceholder);
    inputText.addEventListener("blur", stylizePlaceholder);
    inputText.addEventListener("input", checkingInputText);
  });

  inputEmailList.forEach((inputEmail) => {
    inputEmail.addEventListener("input", checkingEmail);
  });

  formList.forEach((form) => {
    form.addEventListener("submit", checkingForm);
  });
});
/***********************
 Input validate ENF
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

  const searchOpenLinkList = document.querySelectorAll("[data-search-open]");
  const searchOpenLink = document.querySelector("[data-search-open]");
  const searchCloseLink = document.querySelector("[data-search-close]");
  const searchWrap = document.querySelector(
    `.${searchOpenLink.dataset.searchOpen}`
  );
  const searchInput = document.querySelector(".search-form input");
  const searchInputClearLink = document.querySelector(".search-form span");
  const searchResultWrap = document.querySelector(
    ".header-search__result-wrap"
  );
  const searchResultList = document.querySelector(
    ".header-search__result-list"
  );
  const body = document.body;
  const scrollUp = "scroll-up";
  const scrollDown = "scroll-down";
  const fixedMenu = "fixed-menu";
  const initFixedMenu = "init-fixed-menu";
  const headerPage = document.querySelector(".header-page-wrap");
  const headerPageStyckyAdditionalPadding = document.querySelector(
    ".header-page-sticky"
  ).offsetTop;
  const headerPageHeight = headerPage.offsetHeight;

  //headerPage.style.height = `${headerPageHeight}px`;
  let lastScroll = 0;

  const initHeaderHeight = () => {
    const headerPageHeight = headerPage.clientHeight;
    document.documentElement.style.setProperty(
      "--header-page-height",
      `${headerPageHeight}px`
    );
  };
  initHeaderHeight();

  initScrollWidth = () => {
    let div = document.createElement("div");

    div.style.overflowY = "scroll";
    div.style.width = "50px";
    div.style.height = "50px";

    // мы должны вставить элемент в документ, иначе размеры будут равны 0
    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    document.documentElement.style.setProperty(
      "--body-scroll-width",
      `${scrollWidth}px`
    );
  };

  const toggleBodyScroll = () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= headerPageStyckyAdditionalPadding) {
      // top of page
      body.classList.remove(scrollUp);
      body.classList.remove(scrollDown);
      body.classList.remove(fixedMenu);
      body.classList.remove(initFixedMenu);
      return;
    }

    if (
      currentScroll > headerPageHeight &&
      currentScroll > lastScroll &&
      !body.classList.contains(scrollUp)
    ) {
      // down from top
      body.classList.remove(scrollUp);
      body.classList.add(scrollDown);
    }
    if (currentScroll > 5 * headerPageHeight && currentScroll > lastScroll) {
      // down on middle
      body.classList.remove(scrollUp);
      body.classList.add(scrollDown);
      body.classList.add(fixedMenu);
    }
    if (currentScroll < lastScroll - 5 && body.classList.contains(scrollDown)) {
      // up
      body.classList.remove(scrollDown);
      body.classList.remove(initFixedMenu);
      body.classList.add(scrollUp);
    }
    lastScroll = currentScroll;
  };

  const toggleBodyScrollLock = () => {
    if (body.classList.contains("scroll-lock")) {
      body.classList.remove("scroll-lock");
    } else {
      body.classList.add("scroll-lock");
    }
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
      toggleBodyScrollLock();
      window.addEventListener("scroll", toggleBodyScroll);
    }
  };

  if (searchOpenLink) {
    const toggleSearchWrap = (e) => {
      e.preventDefault();
      toggleBodyScrollLock();
      if (searchWrap.classList.contains("open")) {
        searchWrap.classList.remove("open");
        window.addEventListener("scroll", toggleBodyScroll);
        clearSearchResults();
      } else {
        searchWrap.classList.add("open");
        removeBodyScrollListener();
      }
    };

    const showSearchResult = () => {
      if (searchInput.value !== "") {
        searchResultWrap.classList.remove("empty");
        searchResultWrap.classList.add("finded");
        searchInput.classList.add("active");
      } else {
        searchResultWrap.classList.remove("finded");
        searchResultWrap.classList.add("empty");
        searchInput.classList.remove("active");
      }
    };

    const resetSerchResults = () => {
      searchResultWrap.classList.remove("empty");
      searchResultWrap.classList.remove("finded");
    };

    const clearSearchResultList = () => {
      searchResultList.innerHTML = "";
    };

    const clearSearchInput = () => {
      searchInput.value = "";
      searchInput.classList.remove("active");
    };

    const clearSearchResults = () => {
      resetSerchResults();
      clearSearchResultList();
      clearSearchInput();
    };

    searchOpenLinkList.forEach((searchOpenLink) => {
      searchOpenLink.addEventListener("click", toggleSearchWrap);
    });
    searchCloseLink.addEventListener("click", toggleSearchWrap);
    searchInput.addEventListener("input", showSearchResult);
    searchInputClearLink.addEventListener("click", clearSearchResults);
  }

  if (headerMenuCatalogLink) {
    const toggleHeaderMenu = (e) => {
      e.preventDefault();
      toggleBodyScrollLock();
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
      toggleBodyScrollLock();
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
    event.preventDefault();
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

  const formatSelectDefault = (select) => {
    if (!select.id) {
      return select.text;
    }
    const element = select.element;

    const title = element.dataset.title;
    const descr = element.dataset.descr;
    const $select = $(`
      <span class="title">${title}</span>
      ${descr ? `<span class="descr">${descr}</span>` : ""}
    `);

    return $select;
  };

  const formatSelectFilterSort = (select) => {
    if (!select.id) {
      return select.text;
    }
    const $select = $(`
      <span class="title">сортировка</span>
    `);
    return $select;
  };

  $(".select2-js--currency").select2({
    theme: "avgvst-currency",
    dropdownAutoWidth: true,
    minimumResultsForSearch: Infinity,
    templateResult: formatSelectCurrency,
    templateSelection: formatSelectCurrency,
  });

  $(".select2-js--default").select2({
    width: "100%",
    scrollAfterSelect: true,
    theme: "avgvst-default",
    minimumResultsForSearch: Infinity,
    templateResult: formatSelectDefault,
    templateSelection: formatSelectDefault,
  });

  $(".select2-js--filter").select2({
    width: "100%",
    scrollAfterSelect: true,
    theme: "avgvst-filter",
    minimumResultsForSearch: Infinity,
    templateResult: formatSelectDefault,
    templateSelection: formatSelectFilterSort,
  });

  $(".select2-js--card").select2({
    width: "100%",
    scrollAfterSelect: true,
    theme: "avgvst-card",
    minimumResultsForSearch: Infinity,
    templateResult: formatSelectDefault,
    templateSelection: formatSelectDefault,
  });

  // Custom Position on Product Card
  let cardOptionHeight = 0;
  $(".select2-js--card").on("select2:open", function (e) {
    cardOptionHeight = e.target.parentElement.offsetHeight;
    const $dropdownWrap = $(
      ".select2-container--avgvst-card .select2-dropdown"
    ).parent();
    const topPos = parseInt($dropdownWrap.css("top")) - cardOptionHeight + 1;
    setTimeout(() => {
      $dropdownWrap.css("top", `${topPos}px`);
    }, 0);
  });

  $(".select2-js--horoscope").select2({
    width: "100%",
    scrollAfterSelect: true,
    theme: "avgvst-default",
    minimumResultsForSearch: Infinity,
    templateResult: formatSelectDefault,
    templateSelection: formatSelectDefault,
  });

  // Fix for FancyBox to open Select2
  $(document).on("onComplete.fb", function (e, instance, current) {
    current.$slide.find("select").select2({
      dropdownParent: current.$content,
    });
  });

  $(".select2-js--horoscope").on("select2:select", function (e) {
    $(this).next(".select2").addClass("selected");
  });
});
/***********************
 Select2 END
 ***********************/

/***********************
 Filter BEGIN
 ***********************/
$(function () {
  const checkboxLinkList = document.querySelectorAll(
    "[data-checkbox-list-link]"
  );
  const outsideClickListener = (event) => {
    if (event.target.closest(`.catalog-filter__item.opened`) === null) {
      closeAllCheckboxListWrap();
    }
  };

  const removeOutsideClickListener = () => {
    document.removeEventListener("click", outsideClickListener);
  };

  const closeAllCheckboxListWrap = () => {
    const checkboxLinkList = document.querySelectorAll(
      "[data-checkbox-list-link]"
    );
    checkboxLinkList.forEach((checkboxLink) => {
      const wrapClass = checkboxLink.dataset.checkboxListLink;
      const catalogItem = checkboxLink.parentElement;
      const linkedCheckboxWrap = checkboxLink.parentElement.querySelector(
        `.${wrapClass}`
      );
      catalogItem.classList.remove("opened");
      checkboxLink.classList.remove("opened");
      linkedCheckboxWrap.classList.remove("opened");
    });
    removeOutsideClickListener();
  };

  const toggleCheckboxListWrap = (e) => {
    const checkboxLink = e.currentTarget;
    const wrapClass = checkboxLink.dataset.checkboxListLink;
    const catalogItem = checkboxLink.parentElement;
    const linkedCheckboxWrap = checkboxLink.parentElement.querySelector(
      `.${wrapClass}`
    );
    if (checkboxLink.classList.contains("opened")) {
      checkboxLink.classList.remove("opened");
      catalogItem.classList.remove("opened");
      linkedCheckboxWrap.classList.remove("opened");
      removeOutsideClickListener();
    } else {
      closeAllCheckboxListWrap();
      checkboxLink.classList.add("opened");
      catalogItem.classList.add("opened");
      linkedCheckboxWrap.classList.add("opened");
      document.addEventListener("click", outsideClickListener);
    }
  };
  checkboxLinkList.forEach((checkboxLink) => {
    checkboxLink.addEventListener("click", toggleCheckboxListWrap);
  });

  const filterCheckboxList = document.querySelectorAll(
    ".catalog-filter__checkbox-list .style-checkbox"
  );
  const recountFilterLabel = (e) => {
    const catalogFilter = document.querySelector(".catalog-filter");
    const itemTitleCounter = e.currentTarget
      .closest(".catalog-filter__item")
      .querySelector(".catalog-filter__item-title .counter");
    const catalogFilterItem = e.currentTarget.closest(".catalog-filter__item");
    const checkboxList = e.currentTarget.parentElement.querySelectorAll(
      "input[type=checkbox]"
    );
    let count = 0;

    checkboxList.forEach((checkbox) => {
      if (checkbox.checked) {
        count++;
      }
    }, 0);

    itemTitleCounter.textContent = count;

    if (count > 0) {
      catalogFilterItem.classList.add("filtered");
      catalogFilter.classList.add("filtered");
    } else {
      catalogFilterItem.classList.remove("filtered");
      catalogFilter.classList.remove("filtered");
    }
  };

  const recountMobileFilterOpener = () => {
    const countFilteredItems = document.querySelectorAll(
      ".catalog-filter__item.filtered"
    ).length;
    const mobileFilterOpener = document.querySelector(
      "[data-mobile-filter-opener]"
    );
    mobileFilterOpener.querySelector(
      ".catalog-filter__item-title span"
    ).textContent = countFilteredItems;
  };

  const recountMobileFilterLabel = (e) => {
    const catalogFilter = document.querySelector(".catalog-filter");
    const catalogFilterItem = e.currentTarget.closest(".catalog-filter__item");
    const checkboxList = e.currentTarget.parentElement.querySelectorAll(
      "input[type=checkbox]"
    );

    const choice = e.currentTarget
      .closest(".catalog-filter__item")
      .querySelector(".choice");

    let count = 0;
    let allDescr = "";

    checkboxList.forEach((checkbox) => {
      const descr = checkbox.dataset.mobileDescr;
      if (checkbox.checked) {
        count++;
        if (allDescr === "") {
          allDescr += descr;
        } else {
          allDescr = allDescr + ", " + descr;
        }
      }
    });

    if (count > 0) {
      catalogFilter.classList.add("filtered");
      catalogFilterItem.classList.add("filtered");
    } else {
      catalogFilterItem.classList.remove("filtered");
      if (
        !catalogFilter.querySelectorAll(".catalog-filter__item.filtered").length
      ) {
        catalogFilter.classList.remove("filtered");
      }

      choice.textContent = "";
    }

    choice.textContent = allDescr;
    recountMobileFilterOpener();
  };

  if (isDesktop()) {
    filterCheckboxList.forEach((filterCheckbox) => {
      filterCheckbox.addEventListener("change", recountFilterLabel);
    });
  }

  if (isMobile()) {
    filterCheckboxList.forEach((filterCheckbox) => {
      filterCheckbox.addEventListener("change", recountMobileFilterLabel);
    });
  }

  const checkAnyEnabledFilter = () => {
    if (document.querySelectorAll(".catalog-filter__item.filtered").length) {
      return true;
    }
  };
  const onChangeFilterSingleCheckboxLabel = (e) => {
    const catalogFilter = document.querySelector(".catalog-filter");
    const catalogFilterItem = e.currentTarget.closest(".catalog-filter__item");
    const checkbox = e.currentTarget.querySelector("input[type=checkbox]");
    if (checkbox.checked) {
      catalogFilter.classList.add("filtered");
      catalogFilterItem.classList.add("filtered");
    } else {
      catalogFilterItem.classList.remove("filtered");
      if (!checkAnyEnabledFilter()) {
        catalogFilter.classList.remove("filtered");
      }
    }
  };
  const singleCheckBoxLabelList = document.querySelectorAll(
    ".catalog-filter__item > .style-checkbox"
  );
  singleCheckBoxLabelList.forEach((singleCheckBoxLabel) => {
    singleCheckBoxLabel.addEventListener(
      "change",
      onChangeFilterSingleCheckboxLabel
    );
  });

  const resetAllFilterLabels = () => {
    const catalogFilter = document.querySelector(".catalog-filter");
    const catalogFilterItemList = catalogFilter.querySelectorAll(
      ".catalog-filter__item"
    );
    const catalogFilterChoiceList = catalogFilter.querySelectorAll(".choice");

    catalogFilterItemList.forEach((catalogFilterItem) => {
      const catalogFilterCheckboxList = catalogFilterItem.querySelector(
        ".catalog-filter__checkbox-list"
      );
      if (catalogFilterCheckboxList) {
        const itemTitleCounter = catalogFilterItem.querySelector(
          ".catalog-filter__item-title .counter"
        );
        itemTitleCounter.textContent = 0;
        catalogFilterItem.classList.remove("filtered");
        catalogFilter.classList.remove("filtered");
      }
    });

    catalogFilterChoiceList.forEach((catalogFilterChoice) => {
      catalogFilterChoice.textContent = "";
    });
  };

  const catalogFilterForm = document.querySelector(".catalog-filter__form");
  const resetFilterForm = () => {
    $(".catalog-filter__form .select2-js").val("").trigger("change");
    resetAllFilterLabels();
  };
  if (catalogFilterForm) {
    catalogFilterForm.addEventListener("reset", resetFilterForm);
  }
});
/***********************
 Filter END
 ***********************/

/***********************
 Fixed Modal BEGIN
 ***********************/
$(function () {
  const fixedModalLinkList = document.querySelectorAll("[data-fixed-modal]");
  const openFixedModal = (e) => {
    e.preventDefault();
    const body = document.querySelector("body");
    const modalSelector = e.currentTarget.dataset.src;
    const modal = document.querySelector(`${modalSelector}`);
    body.classList.add("scroll-lock");
    modal.classList.add("opened");
  };

  const closeAllFixedModal = (e) => {
    e.preventDefault();
    const body = document.querySelector("body");
    const modalList = document.querySelectorAll(".modal-mobile");
    modalList.forEach((modal) => {
      modal.classList.remove("opened");
    });
    body.classList.remove("scroll-lock");
  };

  const modalCloseList = document.querySelectorAll(".modal-close");
  modalCloseList.forEach((modalClose) => {
    modalClose.addEventListener("click", closeAllFixedModal);
  });

  fixedModalLinkList.forEach((fixedModalLink) => {
    fixedModalLink.addEventListener("click", openFixedModal);
  });
});
/***********************
 Fixed Modal END
 ***********************/

/***********************
 Product Preview BEGIN
 ***********************/
$(function () {
  const productPreviewFavoriteList = document.querySelectorAll(
    ".product-preview .product-preview-favorite"
  );

  if (productPreviewFavoriteList.length) {
    const toggleFavorite = (e) => {
      e.preventDefault();
      const productPreview = e.currentTarget.closest(".product-preview");
      if (productPreview.classList.contains("favorited")) {
        productPreview.classList.remove("favorited");
      } else {
        productPreview.classList.add("favorited");
      }
    };

    productPreviewFavoriteList.forEach((productPreviewFavorite) => {
      productPreviewFavorite.addEventListener("click", toggleFavorite);
    });
  }
});
/***********************
 Product Preview END
 ***********************/

/***********************
 Product Card Add BEGIN
 ***********************/
$(function () {
  const addToCartBtn = document.querySelector("[data-card-add-btn]");
  const headerCartPreviewList = document.querySelectorAll(
    ".header-cart-preview"
  );
  const headerCartPreviewCloseList = document.querySelectorAll(
    ".header-cart-preview__close"
  );
  const headerPageCartList = document.querySelectorAll(
    "[data-header-page-cart]"
  );
  const headerPageCartCounterList = document.querySelectorAll(
    "[data-header-page-cart] .counter"
  );

  const incHeaderPageCartCounter = () => {
    headerPageCartCounterList.forEach((headerPageCartCounter) => {
      const thisCount = +headerPageCartCounter.textContent;
      headerPageCartCounter.textContent = thisCount + 1;
    });
    headerPageCartList.forEach((headerPageCart) => {
      headerPageCart.classList.add("fill");
    });
  };

  const addProductToCart = (e) => {
    e.preventDefault();
    headerCartPreviewList.forEach((headerCartPreview) => {
      headerCartPreview.classList.add("show");
    });
    incHeaderPageCartCounter();
    addToCartBtn.classList.add('added');
    addToCartBtn.textContent = "Уже в корзине";
  };

  const closeCartPreview = (e) => {
    e.preventDefault();
    headerCartPreviewList.forEach((headerCartPreview) => {
      headerCartPreview.classList.remove("show");
    });
  };

  addToCartBtn.addEventListener("click", addProductToCart);
  headerCartPreviewCloseList.forEach((headerCartPreviewClose) => {
    headerCartPreviewClose.addEventListener("click", closeCartPreview);
  });
});
/***********************
 Product Card Add END
 ***********************/

/***********************
 Product Card Favorite BEGIN
 ***********************/
$(function () {
  const addToFavBtnList = document.querySelectorAll("[data-card-add-fav]");
  if (addToFavBtnList) {
    const addProductToFav = (e) => {
      e.preventDefault();
      addToFavBtnList.forEach((addToFavBtn) => {
        addToFavBtn.classList.toggle("favorited");
      });
    };
    addToFavBtnList.forEach((addToFavBtn) => {
      addToFavBtn.addEventListener("click", addProductToFav);
    });
  }
});
/***********************
 Product Card Favorite BEGIN
 ***********************/

/***********************
 Product Card More Info BEGIN
 ***********************/
$(function () {
  const productTextMoreOpener = document.querySelector(
    ".product-details__text-more-opener"
  );
  if (productTextMoreOpener) {
    const toggleProductTextMore = (e) => {
      e.preventDefault();
      const parent = e.target.parentElement;
      const el = parent.querySelector(".product-details__text-more");

      el.style.height = el.scrollHeight + "px";
      //el.scrollHeight = el.scrollHeight;

      parent.classList.toggle("open");
      el.style.height = parent.classList.contains("open")
        ? el.scrollHeight + "px"
        : 0;
    };
    productTextMoreOpener.addEventListener("click", toggleProductTextMore);
  }
});
/***********************
 Product Card More Info END
 ***********************/

/***********************
 Modal Accordion List BEGIN
 ***********************/
$(function () {
  if ($(".modal-accordion-list__item-title").length) {
    const answerSelector = ".modal-accordion-list__item-info";
    const questionItemSelector = ".modal-accordion-list__item";
    const questionTitleSelector = ".modal-accordion-list__item-title";

    $(`${answerSelector}`).slideUp();
    $(`${questionItemSelector}.open`).find(`${answerSelector}`).slideToggle();

    $(`${questionTitleSelector}`).on("click", function () {
      const $this = $(this);
      const $faqLists = $this.parents(`.modal-accordion-list`);
      const $otherItems = $faqLists
        .find(`${questionTitleSelector}`)
        .not($this)
        .closest(`${questionItemSelector}`);

      $otherItems.removeClass("open");
      $otherItems.find(`${answerSelector}`).slideUp();

      $this.next(`${answerSelector}`).slideToggle();
      $this.closest(`${questionItemSelector}`).toggleClass("open");
    });
  }
});
/***********************
 Modal Accordion List END
 ***********************/

/***********************
 Modal Tabs BEGIN
 ***********************/
$(function () {
  const modalTabs = document.querySelectorAll(".modal-tabs");
  if (modalTabs.length) {
    const changeTab = (e) => {
      const thisElement = e.target;
      const dataTabId = thisElement.dataset.tab;
      const modalTabHeadLinks = thisElement.parentElement.querySelectorAll(
        "[data-tab]"
      );
      modalTabHeadLinks.forEach((modalTabHeadLink) => {
        modalTabHeadLink.classList.remove("active");
      });

      thisElement.classList.add("active");

      const modalTabBodies = thisElement
        .closest(".modal-tabs")
        .querySelectorAll(".modal-tabs__body-item");
      modalTabBodies.forEach((modalTabBody) => {
        modalTabBody.classList.remove("active");
        if (modalTabBody.id === dataTabId) {
          modalTabBody.classList.add("active");
        }
      });
    };

    modalTabs.forEach((modalTab) => {
      const modalTabHead = modalTab.querySelector(".modal-tabs__head");
      const modalTabHeadLinks = modalTabHead.querySelectorAll("[data-tab]");
      modalTabHeadLinks.forEach((modalTabHeadLink) => {
        modalTabHead.addEventListener("click", changeTab);
      });
    });
  }
});
/***********************
 Modal Tabs END
 ***********************/

/***********************
 Flickity BEGIN
 ***********************/
$(function () {
  const productPreviewList = document.querySelector(
    ".product-preview-list--slider"
  );
  const productPreviewListFlkty = new Flickity(productPreviewList, {
    cellAlign: "left",
    pageDots: false,
    imagesLoaded: true,
    contain: true,
    arrowShape: "M62.1 89.6L23.5 50l39.6-39.6 3.4 3.4L30.2 50l36.3 36.2z",
  });

  if (isMobile()) {
    const productImagesList = document.querySelector(".product-images__list");
    const productImagesListFlkty = new Flickity(productImagesList, {
      imagesLoaded: true,
      contain: true,
      prevNextButtons: false,
    });
  }
});
/***********************
 Flickity END
 ***********************/

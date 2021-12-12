function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

// Yandex Map
function ymap() {
  let sectionMap = document.querySelector(".footer");

  function ymapInit() {
    if (typeof ymaps === "undefined") return;
    let ymap = document.getElementById("ymap");

    ymaps.ready(function () {
      let map = new ymaps.Map("ymap", {
        center: [47.14216407428549,39.746534499999946],
        zoom: 18,
        controls: ["zoomControl"],
        behaviors: ["drag"],
      });

      // Placemark
      let placemark = new ymaps.Placemark(
        [47.14216407428549,39.746534499999946],
        {
          // Hint
          hintContent: "LEVEL FITNESS",
          balloonContentHeader: "LEVEL FITNESS",
          balloonContentBody: "г. Батайск, М. Горького, д. 84",
        },
        {
          preset: "islands#icon",
          iconColor: "#E7490F"
        }
      );

      map.geoObjects.add(placemark);

    });
  }

  window.addEventListener("scroll", checkYmapInit);
  checkYmapInit();

  function checkYmapInit() {
    let sectionMapTop = sectionMap.getBoundingClientRect().top;
    let scrollTop = window.pageYOffset;
    let sectionMapOffsetTop = sectionMapTop + scrollTop;

    if (scrollTop + window.innerHeight > sectionMapOffsetTop) {
      ymapLoad();
      window.removeEventListener("scroll", checkYmapInit);
    }
  }

  function ymapLoad() {
    let script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
    document.body.appendChild(script);
    script.onload = ymapInit;
  }
}

// Phone mask
function phoneMask() {
  let phoneInputs = document.querySelectorAll("input[data-tel-input]");

  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener("keydown", onPhoneKeyDown);
    phoneInput.addEventListener("input", onPhoneInput, false);
    phoneInput.addEventListener("paste", onPhonePaste, false);
  }

  function getInputNumbersValue(input) {
    // Return stripped input value — just numbers
    return input.value.replace(/\D/g, "");
  }

  function onPhonePaste(e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input);
    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      let pastedText = pasted.getData("Text");
      if (/\D/g.test(pastedText)) {
        // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
        // formatting will be in onPhoneInput handler
        input.value = inputNumbersValue;
        return;
      }
    }
  }

  function onPhoneInput(e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = "";

    if (!inputNumbersValue) {
      return (input.value = "");
    }

    if (input.value.length != selectionStart) {
      // Editing in the middle of input, not last symbol
      if (e.data && /\D/g.test(e.data)) {
        // Attempt to input non-numeric symbol
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9")
        inputNumbersValue = "7" + inputNumbersValue;
      let firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  }

  function onPhoneKeyDown(e) {
    // Clear input after remove last symbol
    let inputValue = e.target.value.replace(/\D/g, "");
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = "";
    }
  }
}

// Sliders
function sliders() {
  if(document.querySelector('.intro__slider')){
    // Intro Slider
    let introSlider = new Swiper('.intro__slider', {
      speed: 1000, 
      loop: true,
      autoHeight: true, 
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
       delay: 4700,
     },
      navigation: {
        nextEl: '.intro__next',
        prevEl: '.intro__prev',
      },
      pagination: {
        el: '.intro__pagination',
        type: 'bullets',
        clickable: true,
      },
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
      }
    });
    // Intro Slider
  }

  if(document.querySelector('.team__slider')) {
    // Team Slider
    let
      teamSlider,
      init = false;


    initTeam();
    window.addEventListener('resize', initTeam);

    function initTeam() {

      if (mobile.matches && !init) {
        init = true;
        teamSlider = new Swiper('.team__slider', {
          slidesPerView: 1,
          loop: true, 
          speed: 800, 
          spaceBetween: 15,
          autoHeight: true,
          grabCursor: true,
          pagination: {
            el: '.team__pagination',
            type: 'bullets',
            clickable: true,
          },
          preloadImages: false,
          lazy: {
            loadPrevNext: true,
          }
        });
      } else if(desktop.matches && teamSlider) {
        teamSlider.destroy();
        init = false;
      }

    }
    // /Team Slider
  }
}

// Header
function header() {
  const  
    burger = document.querySelector('.mobile-header__burger'), 
    menu = document.querySelector('.mobile-header__info');

  burger.addEventListener('click', (e) => {
    burger.classList.toggle('_active');
    menu.classList.toggle('_active');
    document.body.classList.toggle('_lock');
  });

}

// Popup
function popup() {
  const popupLinks = document.querySelectorAll(".popup-link");
  const body = document.querySelector("body");
  const lockPadding = document.querySelectorAll(".lock-padding");
  let unlock = true;
  const timeout = 550;

  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
        const popupName = popupLink.getAttribute("href").replace("#", "");
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
        e.preventDefault();
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll(".close-popup");
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
        popupClose(el.closest(".popup"));
        e.preventDefault();
      });
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector(".popup._open");
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      currentPopup.classList.add("_open");
      currentPopup.addEventListener("click", function (e) {
        if (!e.target.closest(".popup__content")) {
          popupClose(e.target.closest(".popup"));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove("_open");
      if (doUnlock) {
        bodyUnlock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("_lock");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnlock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = "0px";
        }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("_lock");
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  document.addEventListener("keydown", function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelector(".popup._open");
      popupClose(popupActive);
    }
  });
}

// Anchors scroll
function anchorScroll() {
   const links = document.querySelectorAll('a._anchor-scroll');

   for (let index = 0; index < links.length; index++) {
      const link = links[index];
      
      link.addEventListener('click', (e) => {
         e.preventDefault();

         const href = link.getAttribute("href").replace("#", ""),
           scrollTarget = document.getElementById(href),
           topOffset = document.querySelector(".header").offsetHeight,
           elementPosition = scrollTarget.getBoundingClientRect().top,
           offsetPosition = elementPosition - topOffset;



          document.querySelector(".mobile-header__info").classList.remove('_active');
          document.querySelector('.mobile-header__burger').classList.remove('_active');
          document.body.classList.remove('_lock');

         window.scrollBy({
           top: offsetPosition,
           behavior: "smooth",
         });
         
      });
   }
};

// Form Validate
function formCheck() {
  let forms = document.querySelectorAll("form");

  if (forms) {
    for (let index = 0; index < forms.length; index++) {
      forms[index].addEventListener("submit", formSend);
    }
  }

  async function formSend(e) {
    e.preventDefault();
    let currentForm = e.currentTarget;
    let error = formValidate(currentForm);

    if (error === 0) {
     // Отправка
    }
  }

  function formValidate(form) {
    let formReq = form.querySelectorAll("._req");
    let error = 0;

    for (let index = 0; index < formReq.length; index++) {
      let input = formReq[index];
      formRemoveError(input);
      removeErrorMessage(input);

      if(input.classList.contains('_name')) {
        if(!nameTest(input) && !input.parentElement.querySelector('.error-message')) {
          formAddError(input);
          createErrorMessage(input);
          error++;
        }
      }
      if (input.value == "") {
        formAddError(input);
        error++;
      }
    }
    return error;
  }
}

function formAddError(el) {
  el.classList.add("_error");
  el.parentElement.classList.add("_error");
}

function formRemoveError(el) {
  el.classList.remove("_error");
  el.parentElement.classList.remove("_error");
}

function nameTest(input) {
  const re = /^[a-zа-яё\s]+$/iu;

  return re.test(input.value);
}

function createErrorMessage(input) {
  const message = document.createElement("div");
  message.className = 'error-message';
  message.innerHTML = `<div class="error-message__icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C14.7614 22 17.2614 20.8807 19.0711 19.0711C20.8807 17.2614 22 14.7614 22 12C22 9.2386 20.8807 6.7386 19.0711 4.92893C17.2614 3.11929 14.7614 2 12 2C9.2386 2 6.7386 3.11929 4.92893 4.92893C3.11929 6.7386 2 9.2386 2 12C2 14.7614 3.11929 17.2614 4.92893 19.0711C6.7386 20.8807 9.2386 22 12 22Z" stroke="#EE0000" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 19C12.5523 19 13 18.5523 13 18C13 17.4477 12.5523 17 12 17C11.4477 17 11 17.4477 11 18C11 18.5523 11.4477 19 12 19Z" fill="#EE0000"/>
                            <path d="M12 6V14" stroke="#EE0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                      </div> 
                      <span>Введите, пожалуйста, корректное имя</span>`;
  input.style.marginBottom = '10px';
  input.parentElement.append(message);
}

function removeErrorMessage(input) {
  const errorMessage = input.parentElement.querySelector('.error-message');
  if (input.classList.contains('_name') && errorMessage) {
    errorMessage.remove();
    input.style.marginBottom = '0px';
  }
}

// Variables
const
    mobile = window.matchMedia('(max-width: 767.98px)'),
    desktop = window.matchMedia('(min-width: 768px)');

window.onload = function(e) {

  // Inititalize map
  ymap();

  // Inititalize phone mask
  phoneMask();

  // Inititalize sliders
  sliders();

  // Inititalize header
  header();

  // Inititalize popup
  popup();

  // Inititalize scroll
  anchorScroll();

  // Form Validate
  formCheck();
}




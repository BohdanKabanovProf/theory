const inset_img = document.querySelector('.insert-logo__image');
if (inset_img != null) {
    const computedStyle = window.getComputedStyle(inset_img);
    const defaultImage = computedStyle.getPropertyValue('background-image');
}

function handleFileSelect(event) {
    const btn = event.target.parentNode.querySelector('.clear-isert-logo');
    btn.classList.add('clear-isert-logo__active');
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        const dataURL = event.target.result;
        inset_img.style.backgroundImage = `url(${dataURL})`;
    };
    reader.readAsDataURL(file);
}

function clearFileSelect(event) {
    const btn = event.target.closest('.insert-logo').querySelector('.clear-isert-logo');
    btn.classList.remove('clear-isert-logo__active');
    inset_img.style.backgroundImage = `url('./img/default-upload.jpg')`
}

function handlerForm(event) {
    event.preventDefault()
    let inputs = []
    let textInputs = event.target.querySelectorAll(`.input-wrapper__input`);
    textInputs.forEach(input => {
        inputs.push(input)
    });
    inputs.forEach(input => {
        checkInputValid(input)
    })
}

function checkInputValid(input) {
    console.log(input);
    let notEmptyInput = 0
    let value = input.value
    if (isNaN(value) && !input.classList.contains('drop-down-value') && value != 'Выберите направление') {
        notEmptyInput++
        input.closest('.input-wrapper')?.classList.remove('input-wrapper__not-valided')
    } else {
        input.closest('.input-wrapper')?.classList.add('input-wrapper__not-valided')
    }
}

function closedActivePopUp() {
    document.body.style.overflowY = 'scroll'
    const popAppAll = document.querySelectorAll('.popup_back-drop');
    popAppAll.forEach(popup => {
        popup.classList.remove('popup-visabled')
    })
}

const btnPopUpList = document?.querySelectorAll('.btn__border-purple');

btnPopUpList.forEach(btn => {
    btn.addEventListener('click', () => openPopUp(btn))
})

function openPopUp(btn) {
    document.body.style.overflowY = 'hidden'
    const popup = document.querySelector(`#${btn.getAttribute('data-popup-target')}`)
    popup.classList.add('popup-visabled')
    popup.scrollTo(0, 0);
}
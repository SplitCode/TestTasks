document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registration-form');
  const formButton = document.getElementById('form-button');

  const validateName = (input) => {
    const regex = /^[A-Za-zА-Яа-яЁё]{2,50}$/;
    return regex.test(input.value);
  };

  const validateLastName = (input) => {
    const regex = /^[A-Za-zА-Яа-яЁё]{2,50}$/;
    return regex.test(input.value);
  };

  const validateEmail = (input) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(input.value);
  };

  const validatePassword = (input) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d]).{8,}$/;
    return regex.test(input.value);
  };

  const validatePasswordConfirmation = (input, password) => {
    return input.value === password.value;
  };

  const validateAge = (birthDate) => {
    const birthDateObj = new Date(birthDate.value);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const month = today.getMonth() - birthDateObj.getMonth();
    if (
      month < 0 ||
      (month === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age >= 18;
  };

  const validateField = (event) => {
    const input = event.target;
    let isValid = false;
    let errorMessage = '';

    switch (input.id) {
      case 'first-name':
        isValid = validateName(input);
        errorMessage = isValid
          ? ''
          : 'Имя должно содержать только буквы и иметь длину от 2 до 50 символов.';
        break;
      case 'last-name':
        isValid = validateLastName(input);
        errorMessage = isValid
          ? ''
          : 'Фамилия должна содержать только буквы и иметь длину от 2 до 50 символов.';
        break;
      case 'email':
        isValid = validateEmail(input);
        errorMessage = isValid ? '' : 'Введите правильный email.';
        break;
      case 'password':
        isValid = validatePassword(input);
        errorMessage = isValid
          ? ''
          : 'Пароль должен содержать минимум 8 символов, включая одну заглавную букву, одну строчную букву, одну цифру и один специальный символ.';
        break;
      case 'password-confirm':
        const password = document.getElementById('password');
        isValid = validatePasswordConfirmation(input, password);
        errorMessage = isValid ? '' : 'Пароли не совпадают.';
        break;
      case 'birth-day':
        isValid = validateAge(input);
        errorMessage = isValid ? '' : 'Возраст должен быть не меньше 18 лет.';
        break;
    }

    if (isValid) {
      input.classList.remove('invalid');
      input.classList.add('valid');
      document.getElementById(`${input.id}-error`).textContent = '';
    } else {
      input.classList.remove('valid');
      input.classList.add('invalid');
      document.getElementById(`${input.id}-error`).textContent = errorMessage;
    }

    checkFormValidity();
  };

  const checkFormValidity = () => {
    const fields = [
      'first-name',
      'last-name',
      'email',
      'password',
      'password-confirm',
      'birth-day',
    ];

    const isFormValid = fields.every((fieldId) => {
      const field = document.getElementById(fieldId);
      return field.classList.contains('valid');
    });

    formButton.disabled = !isFormValid;
  };

  const fields = [
    'first-name',
    'last-name',
    'email',
    'password',
    'password-confirm',
    'birth-day',
  ];

  fields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    field.addEventListener('blur', validateField);
    field.addEventListener('input', validateField);
  });
});

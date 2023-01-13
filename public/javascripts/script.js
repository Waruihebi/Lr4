let quizContainer = document.getElementById("quiz");
let submitButton = document.getElementById("submit");
let resultsContainer = document.getElementById("results");

getRandomElement = function (arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  let element = arr[randomIndex];
  arr.splice(randomIndex, 1);
  return element;
};

const compareArrays = (array1, array2) => {
  return (
    array1.length === array2.length && array1.every((el) => array2.includes(el))
  );
};

let questions = [
  {
    type: "radio",
    question: "Що таке прототип об`єкта в js?",
    answersList: [
      "Це механізм, за допомогою якого об`єкти JavaScript успадковують властивості один від одного",
      "Це синонім до слова об`єкт класу;",
      "Це нащадок об`єкту",
      "Це копія об`єкту",
    ],
    answers: {
      a: null,
      b: null,
      c: null,
      d: null,
    },
    correctAnswer:
      "Це механізм, за допомогою якого об`єкти JavaScript успадковують властивості один від одного",
  },
  {
    type: "radio",
    question:
      "Незалежно від того, де метод визначений: в об’єкті чи його прототипі, ключове слово this завжди вказує на: ",
    answersList: [
      "На об’єкт нащадок",
      "Об’єкт перед крапкою",
      "Випадкови' об’єкт",
      "Останній створений об’єкт",
    ],
    answers: {
      a: null,
      b: null,
      c: null,
      d: null,
    },
    correctAnswer: "Об’єкт перед крапкою",
  },
  {
    type: "checkbox",
    question: "Яке значення по замовчуванню представляє собою 'undefined' ",
    answersList: ["Функції, яка явно нічого не повертає, наприклад, console.log(1);", "Змінної, якої присвоєно значення, тобто. оголошеної, але не ініціалізованої змінної;", "Неіснуючого властивості об'єкта.", "let a = 10"],
    answers: {
      a: null,
      b: null,
      c: null,
      d: null,
    },
    correctAnswer: ["Функції, яка явно нічого не повертає, наприклад, console.log(1);", "Змінної, якої присвоєно значення, тобто. оголошеної, але не ініціалізованої змінної;", "Неіснуючого властивості об'єкта."],
  },
  {
    type: "checkbox",
    question: "Які значення може приймати функція Prototype",
    answersList: [
      "Null",
      "Посилання на інший об’єкт",
      "Будь-які числові значення",
      "Результат методу",
    ],
    answers: {
      a: null,
      b: null,
      c: null,
      d: null,
    },
    correctAnswer: ["Null", "Посилання на інший об’єкт"],
  },
  {
    type: "text",
    question:
      "Напишіть, якою командою можна перепірити властивосіт прототипу Object",
    answers: {
      a: "",
    },
    correctAnswer: [
      "Object.prototype",
    ],
  },
  {
    type: "text",
    question:
      "Напишіть оператор, який знаходить і повертає перше справжнє значення",
    answers: {
      a: "",
    },
    correctAnswer: ["||"],
  },
  {
    type: "select",
    question:
      "Заповніть пропуски, у відповіді на питання Що таке прототип об'єкту <br>\
      Прототип - це план (схема або проект)(a). Він використовується як запасний варіант для (b) та (c), що існують у даному об'єкті.",
    answersList: [
      ["Об`єкту", "Методу", "Класу"],
      ["опису", "властивостей", "вигляду"],
      ["параметрів", "методів", "функцій"],
    ],
    answers: {
      a: null,
      b: null,
      c: null,
    },
    correctAnswer: ["Об`єкту", "властивостей", "методів"],
  },
  {
    type: "select",
    question:
      "Заповніть пропуски, щоб отримати прототип об'єкту Rabbit <br>\
      <pre>\
      let animal = {eats: true};<br>\
      function Rabbit(name) {(a)name = name; }<br>\
      Rabbit.(b) = animal;<br>\
      let rabbit = new (c)('White Rabbit');<br>\
      alert( rabbit.eats );<br>\
      </pre>",
    answersList: [
      ["this.", "-", "Class", "Rabbit"],
      ["object", "get", "prototype", "set"],
      ["Create", "Creation", "Object", "Rabbit"],
    ],
    answers: {
      a: null,
      b: null,
      c: null,

    },
    correctAnswer: ["this.", "prototype", "Rabbit"],
  },
  {
    type: "draganddrop",
    question: "Встановіть відповідність між назвою оператора, та формою його запису<br>",
    questions: {
      1: "Логічне І <br>",
      2: "Логічне АБО <br>",
      3: "Логічне НЕ <br>",
    },
    answersList: ["&&", "||", "!"],
    answers: {
      a: null,
      b: null,
      c: null,
    },
    correctAnswer: ["&&", "||", "!"],
  },
  {
    type: "draganddrop",
    question:
      "Встановіть відповідності між змінними та результатом команди typeof(i)<br>",
    questions: {
      1: "Пусте значення маж значення <br>",
      2: "Змінна не була оголошена, виклик її викликає помилку, виклик типупокаже undefined (для реалізації перевірки) <br>",
      3: "невизначене значення <br>",
    },
    answersList: ["undeclared", "null", "undefined"],
    answers: {
      a: null,
      b: null,
      c: null,
      d: null,
    },
    correctAnswer: ["null", "undeclared", "undefined"],
  },
];
// Random questions order in array
questions.sort(() => Math.random() - 0.5);

generateQuiz(questions, quizContainer, resultsContainer, submitButton);

function generateQuiz(
  questions,
  quizContainer,
  resultsContainer,
  submitButton
) {
  function showQuestions(questions, quizContainer) {
    let output = [];
    let answers;

    let selectIterator = 0;
    let dragIterator = 0;
    // Iterating over questions
    for (let i = 0; i < questions.length; i++) {
      // Used for randomizing options order in select
      let selectIterator2 = 0;

      answers = [];

      // Iterating over all answers in current question
      for (letter in questions[i].answers) {
        // Set random answers to letters
        if (
          questions[i].type == "radio" ||
          questions[i].type == "checkbox" ||
          questions[i].type == "draganddrop"
        ) {
          questions[i].answers[letter] = getRandomElement(
            questions[i].answersList
          );
        }
        // Set random answers to letters in select
        else if (questions[i].type == "select") {
          let arr = questions[i].answersList[selectIterator2];
          questions[i].answers[letter] = new Array();
          while (arr.length != 0) {
            questions[i].answers[letter].push(getRandomElement(arr));
          }
          selectIterator2++;
        }

        if (questions[i].type == "radio") {
          answers.push(
            `<p><label><input type="radio" name="question${i}" value="${questions[i].answers[letter]}">${letter}: ${questions[i].answers[letter]}</label></p>`
          );
        } else if (questions[i].type == "checkbox") {
          answers.push(
            '<p><label id="' +
              letter +
              i +
              '">' +
              '<input type="checkbox" name="question' +
              i +
              '" value="' +
              questions[i].answers[letter] +
              '">' +
              letter +
              ": " +
              questions[i].answers[letter] +
              "</label></p>"
          );
        } else if (questions[i].type == "text") {
          answers.push(
            "<p><label>" +
              '<input type="text" name="question' +
              i +
              '" id="question' +
              i +
              '">' +
              "</label></p>"
          );
        } else if (questions[i].type == "select") {
          let string =
            "<label>" +
            letter +
            ": " +
            '<select name="question' +
            i +
            '" id="question' +
            i +
            selectIterator +
            '"">';

          let opt = 0;
          let size = questions[i].answers[letter].length;
          while (opt < size) {
            string +=
              '<option value="' +
              questions[i].answers[letter][opt] +
              '">' +
              questions[i].answers[letter][opt] +
              "</option>";
            opt++;
            size = questions[i].answers[letter].length;
          }
          string += "</select></label> ";

          answers.push(string);
          selectIterator++;
        } else {
          answers.push(
            '<div class="dragtext-container dropbox"><p draggable="true" class="dragtext" id="selanswer' +
              i +
              dragIterator +
              '">' +
              questions[i].answers[letter] +
              "</p></div>"
          );
          dragIterator++;
        }
      }

      // add this question and its answers to the output

      // For the draganddrop type
      if (questions[i].type == "draganddrop") {
        let string =
          '<div class="question">' + questions[i].question + "</div>";
        for (let j = 1; j <= Object.keys(questions[i].questions).length; j++) {
          string +=
            '<div class="questions-container">' +
            '<div class="questions">' +
            j +
            ". " +
            questions[i].questions[j] +
            "</div>" +
            '<div class="dropbox" id="dropbox' +
            i +
            j +
            '"></div>' +
            "</div>";
        }

        string += '<div class="answers">' + answers.join("") + "</div>";
        output.push(string);
      }

      // For every other type
      else {
        output.push(
          '<div class="question">' +
            questions[i].question +
            "</div>" +
            '<div class="answers">' +
            answers.join("") +
            "</div>"
        );
      }
    }

    // Combine output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults(questions, quizContainer, resultsContainer) {
    let answerContainers = quizContainer.querySelectorAll(".answers");

    let userAnswer = "";
    let numCorrect = 0;

    let selectIterator = 0;
    let dragIterator = 0;

    // Iterate over questions
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].type == "radio") {
        userAnswer = (
          answerContainers[i].querySelector(
            "input[name=question" + i + "]:checked"
          ) || {}
        ).value;

        if (userAnswer === questions[i].correctAnswer) {
          numCorrect++;
          answerContainers[i].style.color = "lightgreen";
        } else {
          answerContainers[i].style.color = "red";
        }
      } else if (questions[i].type == "checkbox") {
        userAnswers = [];
        nodeList =
          answerContainers[i].querySelectorAll(
            "input[name=question" + i + "]:checked"
          ) || {};
        for (let j = 0; j < nodeList.length; j++) {
          userAnswers.push(nodeList[j].value);
        }

        // If none of checkboxes are checked than color all of them red
        if (userAnswers.length == 0) {
          let letters = Object.keys(questions[i].answers);
          for (let j = 0; j < letters.length; j++) {
            document.getElementById(letters[j] + i).style.color = "red";
          }
        }

        let letters = Object.keys(questions[i].answers);
        // If answers are correct
        if (compareArrays(userAnswers, questions[i].correctAnswer)) {
          numCorrect++;
          for (let k in questions[i].answers) {
            if (userAnswers.includes(questions[i].answers[k])) {
              document.getElementById(k + i).style.color = "lightgreen";
            }
          }
        }
        // If answers are wrong
        else {
          for (let k in questions[i].answers) {
            // Color only checked answers
            if (
              questions[i].correctAnswer.includes(questions[i].answers[k]) &&
              userAnswers.includes(questions[i].answers[k])
            ) {
              document.getElementById(k + i).style.color = "lightgreen";
            } else if (
              !questions[i].correctAnswer.includes(questions[i].answers[k]) &&
              userAnswers.includes(questions[i].answers[k])
            ) {
              document.getElementById(k + i).style.color = "red";
            }
          }
        }
      } else if (questions[i].type == "text") {
        userAnswer = document.getElementById("question" + i).value;
        if (questions[i].correctAnswer.includes(userAnswer)) {
          numCorrect++;
          document.getElementById("question" + i).style.color = "lightgreen";
        } else {
          document.getElementById("question" + i).style.color = "red";
        }
      } else if (questions[i].type == "select") {
        userAnswers = [];
        nodeList = answerContainers[i].querySelectorAll(
          "select[name=question" + i + "]"
        );
        for (let j = 0; j < nodeList.length; j++) {
          userAnswers.push(nodeList[j].value);
        }
        let score = 0;
        for (ans in userAnswers) {
          if (questions[i].correctAnswer.includes(userAnswers[ans])) {
            score++;
            document.getElementById(
              "question" + i + selectIterator
            ).style.color = "lightgreen";
          } else {
            document.getElementById(
              "question" + i + selectIterator
            ).style.color = "red";
          }
          selectIterator++;
        }
        // Add 1 to numCorrect only if all answers are correct
        if (score == questions[i].correctAnswer.length) {
          numCorrect++;
        }
      } else if (questions[i].type == "draganddrop") {
        let score = 0;
        for (let j = 1; j <= Object.keys(questions[i].answers).length; j++) {
          if (
            document.getElementById("dropbox" + i + j).dataset.value ==
            questions[i].correctAnswer[j - 1]
          ) {
            console.log(
              document.getElementById("selanswer" + i + dragIterator)
            );
            document.getElementById(
              "selanswer" + i + dragIterator
            ).style.color = "lightgreen";
            score++;
          } else {
            document.getElementById(
              "selanswer" + i + dragIterator
            ).style.color = "red";
          }
          dragIterator++;
        }
        if (score == Object.keys(questions[i].answers).length) {
          numCorrect++;
        }
      }
    }

    resultsContainer.innerHTML = numCorrect + " out of " + questions.length;
  }

  showQuestions(questions, quizContainer);

  submitButton.onclick = function () {
    showResults(questions, quizContainer, resultsContainer);
  };

  /*
   *   Drag and drop functionality
   */
  let dragItems = document.querySelectorAll('p[draggable="true"]');
  dragItems.forEach(function addListeners() {
    addEventListener("dragstart", dragStart);
  });

  function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  let dropBoxes = document.querySelectorAll(".dropbox");
  dropBoxes.forEach((box) => {
    box.addEventListener("dragenter", dragEnter);
    box.addEventListener("dragover", dragOver);
    box.addEventListener("dragleave", dragLeave);
    box.addEventListener("drop", drop);
  });

  function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add("dropbox-active");
  }

  function dragOver(e) {
    e.preventDefault();
    e.target.classList.add("dropbox-active");
  }

  function dragLeave(e) {
    e.target.classList.remove("dropbox-active");
  }

  function drop(e) {
    e.target.classList.remove("dropbox-active");

    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);
    draggable.dataset.value = draggable.innerHTML;

    if (!e.target.hasChildNodes()) {
      draggable.parentNode.dataset.value = null;
      e.target.appendChild(draggable);
      e.target.dataset.value = draggable.dataset.value;
    }

    draggable.classList.remove("hide");
  }
}

/*
 *   Objects and classes task
 */

function UserObject(surname, name) {
  this.surname = surname;
  this.name = name;
}

function StudentObject(specialty, group) {
  this.specialty = specialty;
  this.group = group;

  this.setSpecialty = function (value) {
    this.specialty = value;
  };

  this.setGroup = function (value) {
    this.group = value;
  };

  this.clearName = function () {
    this.name = "";
  };

  this.clearSurname = function () {
    this.surname = "";
  };

  this.clearSpecialty = function () {
    this.specialty = "";
  };

  this.clearGroup = function () {
    this.group = "";
  };
  showData();
  {
    return (
      "Name: " +
      this.getName +
      "\nSurname: " +
      this.getSurname +
      "\nSpecialty: " +
      this.specialty +
      "\nGroup: " +
      this.group
    );
  }
}

let user = new UserObject();

function task1() {
  let name = document.getElementById("userObjectName").value;
  let surname = document.getElementById("userObjectSurname").value;

  if (name == "" || surname == "") {
    alert("Введіть ім'я та прізвище");
    return;
  }

  user.name = name;
  user.surname = surname;

  console.log(user);

  let output = document.getElementById("task1Result");
  output.innerHTML = `<p>Ім'я користувача: ${user.name}<\p>\
                        <p>Прізвище користувача: ${user.surname}<\p>`;
}

let student = new StudentObject();

function task2() {
  let specialty = document.getElementById("studentObjectSpecialty").value;
  let group = document.getElementById("studentObjectGroup").value;

  student.setSpecialty(specialty);
  student.setGroup(group);

  console.log(student);

  if (specialty == "" || group == "") {
    alert("Введіть спеціальність та групу");
    return;
  }

  let output = document.getElementById("task2Result");
  output.innerHTML = `<p>Спеціальність студента: ${student.specialty}<\p>\
                        <p>Група студента: ${student.group}<\p>`;
}

function task2clearspecialty() {
  let specialtyInput = document.getElementById("studentObjectSpecialty");
  specialtyInput.value = "";
  student.clearSpecialty();
  let output = document.getElementById("task2Result");
  output.innerHTML = `<p>Спеціальність студента: ${student.specialty}<\p>\
                        <p>Група студента: ${student.group}<\p>`;
}

function task2cleargroup() {
  let groupInput = document.getElementById("studentObjectGroup");
  groupInput.value = "";
  student.clearGroup();
  let output = document.getElementById("task2Result");
  output.innerHTML = `<p>Спеціальність студента: ${student.specialty}<\p>\
                        <p>Група студента: ${student.group}<\p>`;
}

function task3user() {
  let user2 = Object.create(user);

  let output = document.getElementById("task3Result1");
  output.innerHTML = `<p>Ім'я користувача: ${user2.name}<\p>\
                        <p>Прізвище користувача: ${user2.surname}<\p>`;
}

function task3student() {
  let student2 = Object.create(student);

  let output = document.getElementById("task3Result2");
  output.innerHTML = `<p>Спеціальність студента: ${student2.specialty}<\p>\
                        <p>Група студента: ${student2.group}<\p>`;
}

function task4() {
  StudentObject.prototype.showData = function () {
    let output = document.getElementById("task4Result");

    output.innerHTML = `<p>Спеціальність студента: ${this.specialty}<\p>\
                            <p>Група студента: ${this.group}<\p>`;
  };
  let student2 = Object.create(student);
  student2.showData();
}

function ProgressObject(test, attempt, grades) {
  StudentObject.call(this, test, attempt, grades);
  this.averageGrade = 0;

  this.calculateAverageGrade = function () {
    if (this.grades.length == 0) {
      alert("Оцінки відсутні");
    } else {
      let sum = 0;
      for (let i = 0; i < this.grades.length; i++) {
        sum += Number(this.grades[i]);
      }
      this.averageGrade = sum / this.grades.length;
    }
  };

  this.showData = function () {
    console.log(
      "Test: " +
        this.test +
        "\nAttempt: " +
        this.attempt +
        "\nGrades: " +
        this.grades +
        "\nAverage grade: " +
        this.averageGrade
    );
  };
}

let progressObject = new ProgressObject();

function task5GetGrades() {
  let test = document.getElementById("progressTest").value;
  let attempt = document.getElementById("progressAttempt").value;

  if (test == "" || attempt == "") {
    alert("Введіть тест та спробу");
    return;
  } else if (isNaN(attempt)) {
    alert("Спроба повинна бути числом");
    return;
  }

  progressObject.test = test;
  progressObject.attempt = attempt;
  progressObject.grades = [];

  let inputsContainer = document.getElementById("inputsContainer");
  let output = "";
  for (let i = 0; i < attempt; i++) {
    output += `<input type="text" id="progressGrade${i}" placeholder="Оцінка ${
      i + 1
    }">`;
  }
  inputsContainer.innerHTML = output;

  let button = document.getElementById("task5GetAverageGrade");
  button.classList.remove("hide");
}

function task5GetAverageGrade() {
  let attempts = document.getElementById("progressAttempt").value;
  for (let i = 0; i < attempts; i++) {
    let grade = document.getElementById(`progressGrade${i}`).value;
    if (grade == "") {
      alert("Введіть оцінку");
      return;
    } else if (isNaN(grade)) {
      alert("Оцінка повинна бути числом");
      return;
    }
    progressObject.grades.push(grade);
  }

  progressObject.calculateAverageGrade();

  let output = document.getElementById("task5Result");
  output.innerHTML = `<p>Середня оцінка: ${progressObject.averageGrade}<\p>`;
}

class User {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }

  set setName(name) {
    this.name = name;
  }

  set setSurname(surname) {
    this.surname = surname;
  }

  get getName() {
    return this.name;
  }

  get getSurname() {
    return this.surname;
  }

  showData() {
    console.log("Name: " + this.name + "\nSurname: " + this.surname);
  }
}

class Student extends User {
  constructor(name, surname, specialty, group) {
    super(name, surname);
    this.specialty = specialty;
    this.group = group;
  }

  set setSpecialty(specialty) {
    this.specialty = specialty;
  }

  set setGroup(group) {
    this.group = group;
  }

  get getSpecialty() {
    return this.specialty;
  }

  get getGroup() {
    return this.group;
  }

  showData() {
    console.log(
      "Name: " +
        this.name +
        "\nSurname: " +
        this.surname +
        "\nSpecialty: " +
        this.specialty +
        "\nGroup: " +
        this.group
    );
  }
}

class Progress extends Student {
  constructor(name, surname, specialty, group, test, attempt) {
    super(name, surname, specialty, group);
    this.test = test;
    this.attempt = attempt;
    this.grades = [];
    this.averageGrade = 0;
  }

  set setTest(test) {
    this.test = test;
  }

  set setAttempt(attempt) {
    this.attempt = attempt;
  }

  set setGrades(grades) {
    this.grades = grades;
  }

  get getTest() {
    return this.test;
  }

  get getAttempt() {
    return this.attempt;
  }

  get getGrades() {
    return this.grades;
  }

  showData() {
    console.log(
      "Name: " +
        this.name +
        "\nSurname: " +
        this.surname +
        "\nSpecialty: " +
        this.specialty +
        "\nGroup: " +
        this.group +
        "\nTest: " +
        this.test +
        "\nAttempt: " +
        this.attempt +
        "\nGrades: " +
        this.grades +
        "\nAverage grade: " +
        this.averageGrade
    );
  }

  calculateAverageGrade() {
    if (this.grades.length == 0) {
      alert("Оцінки відсутні");
    } else {
      let sum = 0;
      for (let i = 0; i < this.grades.length; i++) {
        sum += Number(this.grades[i]);
      }
      this.averageGrade = sum / this.grades.length;
    }
  }
}

let progress;

function task6() {
  let name = document.getElementById("userObjectName1").value;
  let surname = document.getElementById("userObjectSurname1").value;
  let specialty = document.getElementById("studentObjectSpecialty1").value;
  let group = document.getElementById("studentObjectGroup1").value;
  let test = document.getElementById("progressTest1").value;
  let attempt = document.getElementById("progressAttempt1").value;

  if (name == "" || surname == "" || specialty == "" || group == "") {
    alert("Заповніть всі поля");
    return;
  }

  progress = new Progress(name, surname, specialty, group, test, attempt);

  let inputsContainer = document.getElementById("inputsContainer1");
  let output = "";
  for (let i = 0; i < attempt; i++) {
    output += `<input type="text" id="progressGrade1${i}" placeholder="Оцінка ${
      i + 1
    }">`;
  }
  inputsContainer.innerHTML = output;

  let button = document.getElementById("task6GetAverageGrade");
  button.classList.remove("hide");
}

function task6GetAverageGrade() {
  let attempts = document.getElementById("progressAttempt1").value;
  for (let i = 0; i < attempts; i++) {
    let grade = document.getElementById(`progressGrade1${i}`).value;
    if (grade == "") {
      alert("Введіть оцінку");
      return;
    } else if (isNaN(grade)) {
      alert("Оцінка повинна бути числом");
      return;
    }
    progress.grades.push(grade);
  }

  progress.calculateAverageGrade();

  let output = document.getElementById("task6Result");
  output.innerHTML = `<p>Середня оцінка: ${progress.averageGrade}<\p>`;
}

const formId = "quizForm";
const form = document.getElementById(formId);
function toJSONString(form) {
  let obj = {};
  let elements = form.querySelectorAll("#name, #group");
  for (let i = 0; i < elements.length; ++i) {
    let element = elements[i];
    let name = element.name;
    let value = element.value;
    if (name) {
      obj[name] = value;
    }
  }
  obj["results"] = document.getElementById("results").innerHTML;
  return JSON.stringify(obj);
}
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const json = toJSONString(form);
    const formReq = new XMLHttpRequest();
    formReq.open("POST", "/telegram", true);

    formReq.onload = function (oEvent) {
      if (formReq.status === 200) {
        swal({
          title: "Успешно отправлено!",
          icon: "success",
          timer: 2000,
        });
      }
      if (formReq.status !== 200) {
        swal({
          title: "Произошла ошибка!",
          icon: "error",
          timer: 2000,
        });
      }
    };

    formReq.setRequestHeader("Content-Type", "application/json");
    formReq.send(json);
  });
}

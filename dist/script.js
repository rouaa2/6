function read (mA, mB) {

	 a11 = parseFloat(mA.a11.value, 10)
	 a12 =	parseFloat(mA.a12.value, 10)
	 a13 = parseFloat(mA.a13.value, 10)

	 a21 = parseFloat(mA.a21.value, 10)
	 a22 = parseFloat(mA.a22.value, 10)
	 a23 = parseFloat(mA.a23.value, 10)

	 a31 = parseFloat(mA.a31.value, 10)
	 a32 = parseFloat(mA.a32.value, 10)
	 a33 = parseFloat(mA.a33.value, 10)


	 b11 = parseFloat(mB.a11.value, 10)
	 b12 =	parseFloat(mB.a12.value, 10)
	 b13 = parseFloat(mB.a13.value, 10)

	 b21 = parseFloat(mB.a21.value, 10)
	 b22 = parseFloat(mB.a22.value, 10)
	 b23 = parseFloat(mB.a23.value, 10)

	 b31 = parseFloat(mB.a31.value, 10)
	 b32 = parseFloat(mB.a32.value, 10)
	 b33 = parseFloat(mB.a33.value, 10)

	}

function swap(mA,mB) {

	mB.a11.value = mA.a11.value
	mB.a12.value = mA.a12.value
	mB.a13.value = mA.a13.value

	mB.a21.value = mA.a21.value
	mB.a22.value = mA.a22.value
	mB.a23.value = mA.a23.value

	mB.a31.value = mA.a31.value
	mB.a32.value = mA.a32.value
	mB.a33.value = mA.a33.value

}

function add(amA, amB, mC) {

	read(amA, amB)

	mC.a11.value = a11 + b11
	mC.a12.value = a12 + b12
	mC.a13.value = a13 + b13
	mC.a21.value = a21 + b21
	mC.a22.value = a22 + b22
	mC.a23.value = a23 + b23
	mC.a31.value = a31 + b31
	mC.a32.value = a32 + b32
	mC.a33.value = a33 + b33
}

function mult(amA, amB, mC) {

	read(amA, amB)

	mC.a11.value = a11*b11+a12*b21+a13*b31
	mC.a12.value = a11*b12+a12*b22+a13*b32
	mC.a13.value = a11*b13+a12*b23+a13*b33
	mC.a21.value = a21*b11+a22*b21+a23*b31
	mC.a22.value = a21*b12+a22*b22+a23*b32
	mC.a23.value = a21*b13+a22*b23+a23*b33
	mC.a31.value = a31*b11+a32*b21+a33*b31
	mC.a32.value = a31*b12+a32*b22+a33*b32
	mC.a33.value = a31*b13+a32*b23+a33*b33

	}

function det(amA, op) {
	read(amA, amA)

	detval = (a11*a22*a33 + a21*a32*a13 + a12*a23*a31) - (a31*a22*a13+a21*a12*a33+a32*a23*a11)

	op.output.value = detval

}

function inv(amA, aop, amC) {

		read(amA, amA)

		det(amA, aop)

		detval = parseFloat(aop.output.value)

if (detval==0) { alert("You have entered a Singular Matrix.\r Singular Matrices do not have inverses.  \r\rThis can be verified by calculating the determinant equal to 0.") }

	else {

	adj(amA, amC)

	b11 = parseFloat(amC.a11.value, 10)
	b12 = parseFloat(amC.a12.value, 10)
	b13 = parseFloat(amC.a13.value, 10)
	b21 = parseFloat(amC.a21.value, 10)
	b22 = parseFloat(amC.a22.value, 10)
	b23 = parseFloat(amC.a23.value, 10)
	b31 = parseFloat(amC.a31.value, 10)
	b32 = parseFloat(amC.a32.value, 10)
	b33 = parseFloat(amC.a33.value, 10)

	amC.a11.value = b11 / detval
	amC.a12.value = b12 / detval
	amC.a13.value = b13 / detval

	amC.a21.value = b21 / detval
	amC.a22.value = b22 / detval
	amC.a23.value = b23 / detval

	amC.a31.value = b31 / detval
	amC.a32.value = b32 / detval
	amC.a33.value = b33 / detval

				} // ends else
}

function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

/* calculator */
"use strict";

var input = document.getElementById('input'), // input/output button
  number = document.querySelectorAll('.numbers div'), // number buttons
  operator = document.querySelectorAll('.operators div'), // operator buttons
  result = document.getElementById('result'), // equal button
  clear = document.getElementById('clear'), // clear button
  resultDisplayed = false; // flag to keep an eye on what output is displayed

// adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {

    // storing current input string and its last character in variables - used later
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if result is not diplayed, just keep adding
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      // if result is currently displayed and user pressed an operator
      // we need to keep on adding to the string for next operation
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // if result is currently displayed and user pressed a number
      // we need clear the input string and add the new input to start the new opration
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// adding click handlers to number buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    // storing current input string and its last character in variables - used later
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if last character entered is an operator, replace it with the currently pressed one
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // if first key pressed is an opearator, don't do anything
      console.log("enter a number first");
    } else {
      // else just add the operator pressed to the input
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// on click of 'equal' button
result.addEventListener("click", function() {

  // this is the string that we will be processing eg. -10+26+33-56*34/23
  var inputString = input.innerHTML;

  // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  // first we replace all the numbers and dot with empty string and then split
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // now we are looping through the array and doing one operation at a time.
  // first divide, then multiply, then subtraction and then addition
  // as we move we are alterning the original numbers and operators array
  // the final element remaining in the array will be the output

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
  input.innerHTML = "";
})
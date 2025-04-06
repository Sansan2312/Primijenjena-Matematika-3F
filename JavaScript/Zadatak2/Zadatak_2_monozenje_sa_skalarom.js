//množenje matrice sa skalarom
function multiplicationMatrixWithScalar(matrix, scalar) {
  //deep copy 2d array tako da bude iste veličine kao (matrix)
  let matrixC = JSON.parse(JSON.stringify(matrix));
  const row = matrix.length;
  const cols = matrix[0].length;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < cols; j++) {
      matrixC[i][j] = Number(matrixC[i][j]) * Number(scalar);
    }
  }
  return matrixC;
}

function onMatrixInputModified(value, x, y) {
  console.info("Upisano je: ", value, x, y);

  const number = Number(value);
  inputMatrix[y][x] = number;

  console.info("Current matrix value: ", inputMatrix);
}

function applyGridColumnCount(element, colCount) {
  element.style["grid-template-columns"] = `repeat(${colCount}, 1fr)`;
}

let inputMatrix = [];

function createInputMatrix(
  htmlElement,
  row,
  cols,
  isReadOnly = false,
  values = null
) {
  htmlElement.innerHtml = "";
  inputMatrix = [];

  applyGridColumnCount(htmlElement, cols);

  for (let y = 0; y < row; ++y) {
    inputMatrix.push([]);
    for (let x = 0; x < cols; ++x) {
      inputMatrix[y].push(0);

      const input = document.createElement("input");

      const cellValue = values ? values[y]?.[x] || 0 : 0;
      input.value = cellValue;
      inputMatrix[y][x] = cellValue;

      input.addEventListener("input", (e) =>
        onMatrixInputModified(e.target.value, x, y)
      );

      if (isReadOnly) {
        input.readOnly = true;
      }

      htmlElement.appendChild(input);
    }
  }
  console.info("Generated empty input matrix: ", inputMatrix);
}

function createResultMatrix(htmlElement, row, cols, values) {
  htmlElement.innerHTML = "";

  applyGridColumnCount(htmlElement, cols);

  for (let y = 0; y < row; ++y) {
    for (let x = 0; x < cols; ++x) {
      const input = document.createElement("input");
      const cellValue = values ? values[y]?.[x] || 0 : 0;
      input.value = cellValue;
      input.readOnly = true;
      htmlElement.appendChild(input);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let timeOutId;
  const submitButton = document.getElementById("submit");
  const delButton = document.getElementById("del");
  const rowMat = document.getElementById("row-mat");
  const colsMat = document.getElementById("cols-mat");
  const scalar = document.getElementById("scalar");
  const inputGen = document.getElementById("input-gen");
  const base = document.getElementById("base");
  const resultButton = document.getElementById("result");
  const resultInputGen = document.getElementById("result-input-gen");
  const resultBase = document.getElementById("result-base");

  //button submit
  submitButton.addEventListener("click", () => {
    resultBase.style["display"] = "none";
    const scalarMatrix = scalar.value === "" ? NaN : Number(scalar.value);
    const row = rowMat.value === "" ? NaN : Number(rowMat.value);
    const cols = colsMat.value === "" ? NaN : Number(colsMat.value);
    if (isNaN(scalarMatrix) || isNaN(row) || isNaN(cols)) {
      submitButton.style["backgroundColor"] = "rgba(255,0,0,0.6)";
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
      timeOutId = setTimeout(() => {
        submitButton.style["backgroundColor"] =
          "var(--background-color-box-inside)";
      }, 500);
    } else {
      inputGen.innerHTML = "";
      base.style["display"] = "flex";
      createInputMatrix(inputGen, row, cols);
    }
  });

  //button del
  delButton.addEventListener("click", () => {
    scalar.value = "";
    rowMat.value = "";
    colsMat.value = "";
    base.style["display"] = "none";
    resultBase.style["display"] = "none";
    inputGen.innerHTML = "";
  });

  //button result
  resultButton.addEventListener("click", () => {
    console.info("Upisana matrica je: ", inputMatrix);
    const resultMatrix = multiplicationMatrixWithScalar(
      inputMatrix,
      scalar.value
    );
    console.info("Rezultat je: ", resultMatrix);
    resultBase.style["display"] = "flex";
    createResultMatrix(
      resultInputGen,
      rowMat.value,
      colsMat.value,
      resultMatrix
    );
  });
});

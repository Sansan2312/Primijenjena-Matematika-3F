//zbrajanje matrica
function matrixAdd(matrixA, matrixB) {
  const row = matrixA.length;
  const cols = matrixA[0].length;
  let matrixC = JSON.parse(JSON.stringify(matrixA));
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < cols; j++) {
      matrixC[i][j] = Number(matrixA[i][j]) + Number(matrixB[i][j]);
    }
  }
  return matrixC;
}

//oduzimanje matrica
function matrixSub(matrixA, matrixB) {
  const row = matrixA.length;
  const cols = matrixA[0].length;
  let matrixC = JSON.parse(JSON.stringify(matrixA));
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < cols; j++) {
      matrixC[i][j] = Number(matrixA[i][j]) - Number(matrixB[i][j]);
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
  let selectedMatrix = 0;
  const matValues = [[], []];

  const matRow = [];
  const matCols = [];
  //
  const submitButton = document.getElementById("submit");
  const delButton = document.getElementById("del");
  const addButton = document.getElementById("add");
  const subButton = document.getElementById("sub");
  const base = document.getElementById("base");
  const rowMatA = document.getElementById("row-matA");
  const colsMatA = document.getElementById("cols-matA");
  const rowMatB = document.getElementById("row-matB");
  const colsMatB = document.getElementById("cols-matB");
  const inputGen = document.getElementById("input-gen");
  const mat1Button = document.getElementById("mat-1");
  const mat2Button = document.getElementById("mat-2");
  const matID = document.getElementById("mat-id");
  const resultInputGen = document.getElementById("result-input-gen");
  const resultBase = document.getElementById("result-base");
  //

  //button submit
  submitButton.addEventListener("click", () => {
    matRow[0] = rowMatA.value === "" ? NaN : Number(rowMatA.value);
    matCols[0] = colsMatA.value === "" ? NaN : Number(colsMatA.value);
    matRow[1] = rowMatB.value === "" ? NaN : Number(rowMatB.value);
    matCols[1] = colsMatB.value === "" ? NaN : Number(colsMatB.value);

    const matARow = rowMatA.value === "" ? NaN : Number(rowMatA.value);
    const matBCols = colsMatB.value === "" ? NaN : Number(colsMatB.value);
    const matACols = colsMatA.value === "" ? NaN : Number(colsMatA.value);
    const matBRow = rowMatB.value === "" ? NaN : Number(rowMatB.value);
    console.info(matRow[0]);
    console.info(matCols[0]);
    console.info(matRow[1]);
    console.info(matCols[1]);
    resultBase.style["display"] = "none";

    if (
      isNaN(matRow[0]) ||
      isNaN(matCols[0]) ||
      isNaN(matRow[1]) ||
      isNaN(matCols[1])
    ) {
      submitButton.style["backgroundColor"] = "rgba(255,0,0,0.6)";
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
      timeOutId = setTimeout(() => {
        submitButton.style["backgroundColor"] =
          "var(--background-color-box-inside)";
      }, 500);
    } else {
      if (matARow === matBRow && matACols === matBCols) {
        //passed

        matValues[0] = Array.from({ length: matRow[0] }, () =>
          Array(matCols[0]).fill(0)
        );
        matValues[1] = Array.from({ length: matRow[1] }, () =>
          Array(matCols[1]).fill(0)
        );
        inputGen.innerHTML = "";
        base.style["display"] = "flex";

        //mat1 is default
        selectedMatrix = 0;
        matID.textContent = "Matrica 1";
        createInputMatrix(inputGen, matRow[0], matCols[0]);
      } else {
        submitButton.style["backgroundColor"] = "rgba(255,0,0,0.6)";
        submitButton.innerText = "Matrice nisu iste veličine";

        if (timeOutId) {
          clearTimeout(timeOutId);
        }
        timeOutId = setTimeout(() => {
          submitButton.style["backgroundColor"] =
            "var(--background-color-box-inside)";
          submitButton.innerText = "Učitaj";
        }, 2500);
      }
    }
  });

  //button mat2
  mat2Button.addEventListener("click", () => {
    if (selectedMatrix === 1) {
      console.info("Saved Matrix 2");
      matValues[1] = JSON.parse(JSON.stringify(inputMatrix));
    }
    inputGen.innerHTML = "";

    if (selectedMatrix === 0) {
      console.info("Saved Matrix 1");
      matValues[0] = JSON.parse(JSON.stringify(inputMatrix));
    }

    selectedMatrix = 1;

    matID.textContent = "Matrica 2";
    createInputMatrix(inputGen, matRow[1], matCols[1], false, matValues[1]);
  });

  //button mat1
  mat1Button.addEventListener("click", () => {
    if (selectedMatrix === 0) {
      console.info("Saved Matrix 1");
      matValues[0] = JSON.parse(JSON.stringify(inputMatrix));
    }
    inputGen.innerHTML = "";

    if (selectedMatrix === 1) {
      console.info("Saved Matrix 2");
      matValues[1] = JSON.parse(JSON.stringify(inputMatrix));
    }

    selectedMatrix = 0;

    matID.textContent = "Matrica 1";
    createInputMatrix(inputGen, matRow[0], matCols[0], false, matValues[0]);
  });

  //button add
  addButton.addEventListener("click", () => {
    resultInputGen.innerHTML = "";
    matValues[selectedMatrix] = JSON.parse(JSON.stringify(inputMatrix));

    const result = matrixAdd(matValues[0], matValues[1]);
    resultBase.style["display"] = "flex";
    console.info("Zbrojim: ", matValues);
    console.info("Rezultat: ", result);
    console.info(result.length);
    console.info(result[0].length);

    createResultMatrix(resultInputGen, result.length, result[0].length, result);
  });

  //button sub
  subButton.addEventListener("click", () => {
    resultInputGen.innerHTML = "";
    matValues[selectedMatrix] = JSON.parse(JSON.stringify(inputMatrix));

    const result = matrixSub(matValues[0], matValues[1]);
    resultBase.style["display"] = "flex";
    console.info("Oduzimam: ", matValues);
    console.info("Rezultat: ", result);
    console.info(result.length);
    console.info(result[0].length);

    createResultMatrix(resultInputGen, result.length, result[0].length, result);
  });

  //button del
  delButton.addEventListener("click", () => {
    base.style["display"] = "none";
    resultBase.style["display"] = "none";
    rowMatA.value = "";
    colsMatA.value = "";
    rowMatB.value = "";
    colsMatB.value = "";
    matValues[0] = Array.from({ length: matRow[0] }, () =>
      Array(matCols[0]).fill(0)
    );
    matValues[1] = Array.from({ length: matRow[1] }, () =>
      Array(matCols[1]).fill(0)
    );
  });
});

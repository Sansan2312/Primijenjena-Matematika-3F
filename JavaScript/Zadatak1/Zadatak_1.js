// let mat1 = [
//   ["1", "2", "3", "4"],
//   ["1", "2", "3", "4"],
//   ["1", "2", "3", "4"],
//   ["1", "2", "3", "4"],
// ];

// let mat2 = [
//   ["10", "11", "12", "13"],
//   ["11", "1", "2", "3"],
//   ["12", "2", "3", "4"],
//   ["13", "3", "4", "5"],
// ];

// let mat3 = [
//   ["0", "14", "13", "12"],
//   ["-14", "0", "0", "-7"],
//   ["-13", "0", "0", "-8"],
//   ["-12", "7", "8", "0"],
// ];

function transposeMat(matrix, rows, cols) {
  let matCopy = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let n = 0; n < rows; n++) {
    for (let m = 0; m < cols; m++) {
      matCopy[m][n] = matrix[n][m];
    }
  }
  return matCopy;
}

function matrixSymmetry(matrix, rows, cols) {
  let i, j;
  if (rows !== cols) {
    return false;
  }
  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      if (matrix[i][j] != matrix[j][i]) {
        return false;
      }
    }
  }
  return true;
}
function matrixAntiSymmetry(matrix, rows, cols) {
  let i, j;
  if (rows !== cols) {
    return false;
  }
  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      const val_ij = Number(matrix[i][j]);
      const val_ji = Number(matrix[j][i]);
      if (i === j && val_ij !== 0) {
        return false;
      }
      if (val_ij !== -val_ji) {
        return false;
      }
    }
  }
  return true;
}

/* ------------------ */

let inputMatrix = [];

function applyGridColumnCount(element, colCount) {
  element.style["grid-template-columns"] = `repeat(${colCount}, 1fr)`;
}
function onMatrixInputModified(value, x, y) {
  console.info("Upisano je: ", value, x, y);

  const number = Number(value);
  inputMatrix[y][x] = number;

  console.info("Current matrix value: ", inputMatrix);
}

function createInputMatrix(
  htmlElement,
  width,
  height,
  isReadOnly = false,
  matrixValues = null,
  isEmpty = true
) {
  htmlElement.innerHtml = "";
  if (isEmpty) {
    inputMatrix = [];
  }
  applyGridColumnCount(htmlElement, width);

  for (let y = 0; y < height; ++y) {
    inputMatrix.push([]);
    for (let x = 0; x < width; ++x) {
      if (isEmpty) {
        inputMatrix[y].push(0);
      }

      const input = document.createElement("input");

      if (matrixValues) {
        input.value = matrixValues[y][x];
      } else {
        input.value = 0;
      }

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

document.addEventListener("DOMContentLoaded", () => {
  const resultScreen = document.getElementById("check-display");
  const matrixContainer = document.getElementById("matrix-container");
  const matrixRow = document.getElementById("red_matrice_m");
  const matrixCols = document.getElementById("stupac_matrice_n");
  const submitButton = document.getElementById("submit-button");
  const transposeButton = document.getElementById("transposeButton");
  const symmetryButton = document.getElementById("checkSymmetryButton");
  const antisymmetryButton = document.getElementById("checkAntisymmetryButton");
  const resultContainer = document.getElementById("result-container");

  //To submit the size of matrix and init the matrix
  submitButton.addEventListener("click", () => {
    resultScreen.textContent = "Upiši podatke";
    resultScreen.style["backgroundColor"] = "rgba(77, 77, 80, 0.7)";
    const clear = document.getElementById("transpose-container");
    resultOfButton.style["display"] = "none";
    const divDel = document.getElementById("matrix-container");
    divDel.innerHTML = "";
    const matrixRowNumber = Number(matrixRow.value);
    const matrixColsNumber = Number(matrixCols.value);
    if (
      matrixRowNumber >= 1 &&
      matrixRowNumber <= 9 &&
      matrixColsNumber >= 1 &&
      matrixColsNumber <= 9
    ) {
      resultContainer.style["display"] = "block";
      createInputMatrix(matrixContainer, matrixColsNumber, matrixRowNumber);
      transposeButton.style["display"] = "block";
      symmetryButton.style["display"] = "block";
      antisymmetryButton.style["display"] = "block";
    } else {
      resultContainer.style["display"] = "none";
    }
  });

  // To delete the contents of matrix and input
  const deleteButton = document.getElementById("delete-button");
  deleteButton.addEventListener("click", () => {
    resultScreen.textContent = "Upiši podatke";
    resultScreen.style["backgroundColor"] = "rgba(77, 77, 80, 0.7)";
    const divDel = document.getElementById("matrix-container");
    divDel.innerHTML = "";
    resultContainer.style["display"] = "none";
    const inputRow = document.getElementById("red_matrice_m");
    const inputCols = document.getElementById("stupac_matrice_n");
    inputRow.value = "";
    inputCols.value = "";
    resultOfButton.style["display"] = "none";
  });

  const transposeMatrixContainer = document.getElementById(
    "transpose-container"
  );
  const resultOfButton = document.getElementById("resultOfButton");

  transposeButton.addEventListener("click", () => {
    const divDel = document.getElementById("transpose-container");
    divDel.innerHTML = "";
    resultOfButton.style["display"] = "block";
    const matrixRowNumber = Number(matrixRow.value);
    const matrixColsNumber = Number(matrixCols.value);
    const transposMatrix = transposeMat(
      inputMatrix,
      matrixRowNumber,
      matrixColsNumber
    );
    createInputMatrix(
      transposeMatrixContainer,
      matrixRowNumber,
      matrixColsNumber,
      true,
      transposMatrix,
      false
    );
  });

  let timeOutId;

  symmetryButton.addEventListener("click", () => {
    const matrixRowNumber = Number(matrixRow.value);
    const matrixColsNumber = Number(matrixCols.value);
    const symmetryMatrix = matrixSymmetry(
      inputMatrix,
      matrixRowNumber,
      matrixColsNumber
    );
    if (symmetryMatrix) {
      resultScreen.textContent = "Matrica je simetrična";
      resultScreen.style["backgroundColor"] = "rgba(0,255,0,0.5)";
    } else {
      resultScreen.textContent = "Matrica nije simetrična";
      resultScreen.style["backgroundColor"] = "rgba(255,0,0,0.5)";
    }
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      resultScreen.style["backgroundColor"] = "rgba(77, 77, 80, 0.7)";
      resultScreen.textContent = "Upiši podatke";
    }, 5000);
  });
  antisymmetryButton.addEventListener("click", () => {
    const matrixRowNumber = Number(matrixRow.value);
    const matrixColsNumber = Number(matrixCols.value);
    const antisymmetryMatrix = matrixAntiSymmetry(
      inputMatrix,
      matrixRowNumber,
      matrixColsNumber
    );
    if (antisymmetryMatrix) {
      resultScreen.textContent = "Matrica je antisimetrična";
      resultScreen.style["backgroundColor"] = "rgba(0,255,0,0.5)";
    } else {
      resultScreen.textContent = "Matrica nije antisimetrična";
      resultScreen.style["backgroundColor"] = "rgba(255,0,0,0.5)";
    }
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      resultScreen.style["backgroundColor"] = "rgba(77, 77, 80, 0.7)";
      resultScreen.textContent = "Upiši podatke";
    }, 5000);
  });
});

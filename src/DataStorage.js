export default class DataStorage {
    constructor(currentLevel, currentTaskCount1, currentTaskCount2, maxCountTask1,
                maxCountTask2, maxSteps, currentStep, blobColorsMatrix, task1Color, task2Color) {
        this._currentLevel = localStorage.getItem("currentLevel") || currentLevel;
        this._currentTaskCount1 = localStorage.getItem("currentTaskCount1") || currentTaskCount1;
        this._currentTaskCount2 = localStorage.getItem("currentTaskCount2") || currentTaskCount2;
        this._maxCountTask1 = localStorage.getItem("maxCountTask1") || maxCountTask1;
        this._maxCountTask2 = localStorage.getItem("maxCountTask2") || maxCountTask2;
        this._maxSteps = localStorage.getItem("maxSteps") || maxSteps;
        this._currentStep = localStorage.getItem("currentStep") || currentStep;
        this._blobColorsMatrix = localStorage.getItem("blobColorsMatrix") || blobColorsMatrix;
        this._task1Color = localStorage.getItem("task1Color") || task1Color;
        this._task2Color = localStorage.getItem("task2Color") || task2Color;
    }

    set currentLevel(value) {
        this._currentLevel = value;
        localStorage.setItem("currentLevel", `${value}`);
    }

    set currentTaskCount1(value) {
        this._currentTaskCount1 = value;
        localStorage.setItem("currentTaskCount1", `${value}`);
    }

    set currentTaskCount2(value) {
        this._currentTaskCount2 = value;
        localStorage.setItem("currentTaskCount2", `${value}`);
    }

    set maxCountTask1(value) {
        this._maxCountTask1 = value;
        localStorage.setItem("maxCountTask1", `${value}`);
    }

    set maxCountTask2(value) {
        this._maxCountTask2 = value;
        localStorage.setItem("maxCountTask2", `${value}`);
    }

    set maxSteps(value) {
        this._maxSteps = value;
        localStorage.setItem("maxSteps", `${value}`);
    }

    set currentStep(value) {
        this._currentStep= value;
        localStorage.setItem("currentStep", `${value}`);
    }

    set blobColorsMatrix(value) {
        this._blobColorsMatrix = value;
        localStorage.setItem("blobColorsMatrix", JSON.stringify(value));
    }

    set task1Color(value) {
        this._task1Color = value;
        localStorage.setItem("task1Color", `${value}`);
    }

    set task2Color(value) {
        this._task1Color = value;
        localStorage.setItem("task2Color", `${value}`);
    }

    get currentLevel() {
        return +localStorage.getItem("currentLevel");
    }

    get currentTaskCount1() {
        return +localStorage.getItem("currentTaskCount1");
    }

    get currentTaskCount2() {
        return +localStorage.getItem("currentTaskCount2");
    }

    get maxCountTask1() {
        return +localStorage.getItem("maxCountTask1");
    }

    get maxCountTask2() {
        return +localStorage.getItem("maxCountTask2");
    }

    get maxSteps() {
        return +localStorage.getItem("maxSteps");
    }

    get currentStep() {
        return +localStorage.getItem("currentStep");
    }

    get blobColorsMatrix() {
        return JSON.parse(localStorage.getItem('blobColorsMatrix'));
    }

    get task1Color() {
        return localStorage.getItem("task1Color");
    }

    get task2Color() {
        return localStorage.getItem("task2Color");
    }

    init() {
        if(!localStorage.getItem("currentLevel")) {
            localStorage.setItem("currentLevel", `${this._currentLevel}`);
        }
        if(!localStorage.getItem("currentTaskCount1")) {
            localStorage.setItem("currentTaskCount1", `${this._currentTaskCount1}`);
        }
        if(!localStorage.getItem("currentTaskCount2")) {
            localStorage.setItem("currentTaskCount2", `${this._currentTaskCount2}`);
        }
        if(!localStorage.getItem("maxCountTask1")) {
            localStorage.setItem("maxCountTask1", `${this._maxCountTask1}`);
        }
        if(!localStorage.getItem("maxCountTask2")) {
            localStorage.setItem("maxCountTask2", `${this._maxCountTask2}`);
        }
        if(!localStorage.getItem("maxSteps")) {
            localStorage.setItem("maxSteps", `${this._maxSteps}`);
        }
        if(!localStorage.getItem("currentStep")) {
            localStorage.setItem("currentStep", `${this._currentStep}`);
        }
        if(!localStorage.getItem("blobColorsMatrix")) {
            localStorage.setItem("blobColorsMatrix", JSON.stringify(this._blobColorsMatrix));
        }
        if(!localStorage.getItem("task1Color")) {
            localStorage.setItem("task1Color", `${this._task1Color}`);
        }
        if(!localStorage.getItem("task2Color")) {
            localStorage.setItem("task2Color", `${this._task2Color}`);
        }
    }

    clear() {
        localStorage.clear();
    }
}
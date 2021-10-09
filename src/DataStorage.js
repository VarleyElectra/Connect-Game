export default class DataStorage {
    constructor(currentLevel, currentTaskCount1, currentTaskCount2, maxCountTask1,
                maxCountTask2, maxSteps, currentStep, circleSpriteMatrix) {
        this._currentLevel = localStorage.getItem("currentLevel") || currentLevel;
        this._currentTaskCount1 = localStorage.getItem("currentTaskCount1") || currentTaskCount1;
        this._currentTaskCount2 = localStorage.getItem("currentTaskCount2") || currentTaskCount2;
        this._maxCountTask1 = localStorage.getItem("maxCountTask1") || maxCountTask1;
        this._maxCountTask2 = localStorage.getItem("maxCountTask2") || maxCountTask2;
        this._maxSteps = localStorage.getItem("maxSteps") || maxSteps;
        this._currentStep = localStorage.getItem("currentStep") || currentStep;
        this._circleSpriteMatrix = localStorage.getItem("circleSpriteMatrix") || circleSpriteMatrix;
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

    set circleSpriteMatrix(value) {
        this._circleSpriteMatrix = value;
        localStorage.setItem("circleSpriteMatrix", JSON.stringify(value));
    }

    get currentLevel() {
        return localStorage.getItem("currentLevel");
    }

    get currentTaskCount1() {
        return localStorage.getItem("currentTaskCount1");
    }

    get currentTaskCount2() {
        return localStorage.getItem("currentTaskCount2");
    }

    get maxCountTask1() {
        return localStorage.getItem("maxCountTask1");
    }

    get maxCountTask2() {
        return localStorage.getItem("maxCountTask2");
    }

    get maxSteps() {
        return localStorage.getItem("maxSteps");
    }

    get currentStep() {
        return localStorage.getItem("currentStep");
    }

    get circleSpriteMatrix() {
        return JSON.parse(localStorage.getItem('circleSpriteMatrix'));
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
        if(!localStorage.getItem("circleSpriteMatrix")) {
            localStorage.setItem("circleSpriteMatrix", JSON.stringify(this._circleSpriteMatrix));
        }
    }

    clear() {
        // this._currentLevel = null;
        // this._currentTaskCount1 = null;
        // this._currentTaskCount2 = null;
        // this._maxCountTask1 = null;
        // this._maxCountTask2 = null;
        // this._maxSteps = null;
        // this._currentStep = null;
        // this._circleSpriteMatrix = null;
        localStorage.clear();
    }
}
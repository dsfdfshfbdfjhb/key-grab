let workers = [];
let memoryChunks = [];
let memoryInterval;

document.getElementById("startBtn").onclick = () => {
    startStressCPU();
    startStressMemory();
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
};

document.getElementById("stopBtn").onclick = () => {
    workers.forEach(w => w.terminate());
    workers = [];
    memoryChunks = [];
    clearInterval(memoryInterval);
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
};

function startStressCPU() {
    const cores = navigator.hardwareConcurrency || 4;
    for (let i = 0; i < cores; i++) {
        const worker = new Worker(URL.createObjectURL(new Blob([`
            setInterval(() => {
                const start = performance.now();
                while (performance.now() - start < 1000);
            }, 0);
        `])));
        workers.push(worker);
    }
}

function startStressMemory() {
    memoryInterval = setInterval(() => {
        try {
            memoryChunks.push(new ArrayBuffer(10024 * 10024 * 1000 * 20)); // 200MB
        } catch (e) {
            console.error('Memory allocation failed:', e);
            clearInterval(memoryInterval);
        }
    }, 1);
}

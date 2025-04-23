let workers = [];
let memoryChunks = [];
let memoryInterval;
const status = document.getElementById("status");
const isChromeOS = navigator.userAgent.includes("CrOS");

document.getElementById("startBtn").onclick = () => {
    if (isChromeOS) {
        alert("⚠️ You appear to be on a Chromebook. This may cause serious slowdowns or freezes. Proceed at your own risk.");
    }
    startStressCPU();
    startStressMemory();
    status.textContent = "Stress test running...";
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
};

document.getElementById("stopBtn").onclick = () => {
    workers.forEach(w => w.terminate());
    workers = [];
    memoryChunks = [];
    clearInterval(memoryInterval);
    status.textContent = "Stress test stopped.";
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
            memoryChunks.push(new ArrayBuffer(1024 * 1024 * 100 * 2)); // 200MB
        } catch (e) {
            console.error('Memory allocation failed:', e);
            clearInterval(memoryInterval);
        }
    }, 500);
}

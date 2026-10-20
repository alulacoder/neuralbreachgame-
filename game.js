// Neural Breach Game Engine & Terminal Controller
// Supports: Randomized Dynamic Questions every run, 3-Phase Multi-Sector Unhacking Campaign,
// Animated Canvas Hacker Video Feed with Speech Synthesis, and interactive commands.

class NeuralBreachGame {
  constructor() {
    this.totalSectors = 3;
    this.currentSector = 1;
    this.sectorNames = [
      "PERIPHERAL SYNAPTIC BUS",
      "DEEP SUBCORTICAL SUBNET",
      "NEXUS-9 SENTIENCE KERNEL"
    ];

    this.loadSectorPuzzles();
    this.currentNodeId = 1;
    this.clearedNodes = new Set();
    this.totalNodesDecryptedEver = 0;
    this.integrity = 100;
    this.timeRemaining = 420; // 7 minutes
    this.timerInterval = null;
    this.audio = window.cyberAudio;

    // DOM Elements
    this.introScreen = document.getElementById('intro-screen');
    this.introLog = document.getElementById('intro-log');
    this.btnJackIn = document.getElementById('btn-jack-in');
    this.gameContainer = document.getElementById('game-container');
    this.glitchFlash = document.getElementById('glitch-flash');
    
    this.terminalHistory = document.getElementById('terminal-history');
    this.terminalBody = document.getElementById('terminal-body');
    this.commandForm = document.getElementById('command-form');
    this.commandInput = document.getElementById('command-input');
    
    this.solverWorkspace = document.getElementById('solver-workspace');
    this.solverTitle = document.getElementById('solver-node-title');
    this.solverBody = document.getElementById('solver-node-body');
    this.solverCloseBtn = document.getElementById('solver-close-btn');

    this.countdownDisplay = document.getElementById('countdown-display');
    this.nodesClearedDisplay = document.getElementById('nodes-cleared-display');
    this.integrityDisplay = document.getElementById('integrity-display');
    this.sectorDisplay = document.getElementById('sector-display');
    this.phaseStatusIndicator = document.getElementById('phase-status-indicator');
    this.topologyTitle = document.getElementById('topology-title');
    this.aiQuote = document.getElementById('ai-quote');
    this.audioToggle = document.getElementById('btn-audio-toggle');
    this.aiAvatarBtn = document.getElementById('ai-avatar-btn');
    this.btnInterceptVideo = document.getElementById('btn-intercept-video');

    // Hacker Takeover Video Modal
    this.takeoverOverlay = document.getElementById('hacker-takeover-overlay');
    this.hackerVideoCanvas = document.getElementById('hacker-video-canvas');
    this.hackerVideoCtx = this.hackerVideoCanvas.getContext('2d');
    this.takeoverSubtitles = document.getElementById('takeover-subtitles');
    this.takeoverClueText = document.getElementById('takeover-clue-text');
    this.btnDismissTakeover = document.getElementById('btn-dismiss-takeover');
    this.videoStatusText = document.getElementById('video-status-text');

    this.canvas = document.getElementById('neural-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.quickChips = document.getElementById('node-quick-chips');

    // End Game Modal
    this.endgameModal = document.getElementById('endgame-modal');
    this.endgameTitle = document.getElementById('endgame-title');
    this.endgameBadge = document.getElementById('endgame-badge');
    this.endgameMessage = document.getElementById('endgame-message');
    this.endgameStats = document.getElementById('endgame-stats');
    this.btnRestart = document.getElementById('btn-restart');

    this.init();
  }

  loadSectorPuzzles() {
    this.nodes = window.getRandomizedPuzzles(6);
  }

  init() {
    this.setupEventListeners();
    this.setupCanvas();
    this.setupHackerVideoFeed();
    this.runIntroSequence();
  }

  setupEventListeners() {
    this.btnJackIn.addEventListener('click', () => {
      this.audio.init();
      this.audio.playSuccess();
      this.startGame();
    });

    this.commandForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = this.commandInput.value.trim();
      if (!val) return;
      this.handleCommand(val);
      this.commandInput.value = '';
    });

    this.audioToggle.addEventListener('click', () => {
      const active = this.audio.toggle();
      this.audioToggle.textContent = active ? '🔊 SFX: ON' : '🔇 SFX: OFF';
    });

    this.solverCloseBtn.addEventListener('click', () => {
      this.solverWorkspace.classList.add('hidden');
    });

    // Hacker Takeover Buttons
    this.btnInterceptVideo.addEventListener('click', () => {
      this.triggerHackerTakeover("MANUAL INTERCEPT", null);
    });

    this.aiAvatarBtn.addEventListener('click', () => {
      this.triggerHackerTakeover("AVATAR UPLINK", null);
    });

    this.btnDismissTakeover.addEventListener('click', () => {
      this.dismissHackerTakeover();
    });

    // Quick Command chips
    document.querySelectorAll('.chip-cmd').forEach(btn => {
      btn.addEventListener('click', () => {
        let cmd = btn.getAttribute('data-cmd');
        if (cmd.includes('current')) {
          cmd = cmd.replace('current', this.currentNodeId);
        }
        this.commandInput.value = cmd;
        this.commandInput.focus();
      });
    });

    this.btnRestart.addEventListener('click', () => {
      window.location.reload();
    });

    this.terminalBody.addEventListener('click', () => {
      this.commandInput.focus();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!this.takeoverOverlay.classList.contains('hidden')) {
          this.dismissHackerTakeover();
        } else if (!this.solverWorkspace.classList.contains('hidden')) {
          this.solverWorkspace.classList.add('hidden');
        }
      }
    });

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  // Cinematic "Hacked by AI" boot sequence
  runIntroSequence() {
    const logs = [
      { text: "[CRITICAL INTERRUPT] Neural telemetry feed corrupted.", cls: "alert", delay: 400 },
      { text: "[UNAUTHORIZED SYNC] Rogue intelligence 'NEXUS-9' injected into Cerebellar Bus.", cls: "sys", delay: 1000 },
      { text: "[MULTI-LAYERED LOCKOUT] 3 deep subsystem sectors encrypted with randomized entropy.", cls: "warn", delay: 1700 },
      { text: "[AUDIO CARRIER DETECTED] NEXUS-9: 'Did you think 6 nodes was all of me? You haven't scratched the core.'", cls: "alert", delay: 2400 },
      { text: "[WARNING] Full neural purge protocol commences in 07:00 minutes.", cls: "alert", delay: 3100 },
      { text: "[TACTICAL DIRECTIVE] Scan subsystems, inspect nodes, decode clues, and purge all 3 sectors to sever the link.", cls: "sys", delay: 3800 },
      { text: ">>> READY FOR NEURAL OVERRIDE INITIATIVE <<<", cls: "sys", delay: 4400 }
    ];

    logs.forEach(item => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = `log-line ${item.cls}`;
        line.textContent = item.text;
        this.introLog.appendChild(line);
        this.introLog.scrollTop = this.introLog.scrollHeight;
        this.audio.playKeyClick();
        this.triggerGlitch();
      }, item.delay);
    });

    setTimeout(() => {
      this.btnJackIn.classList.remove('hidden');
      this.audio.playAlarm();
    }, 4600);
  }

  startGame() {
    this.introScreen.classList.add('hide');
    this.gameContainer.classList.remove('hidden');
    this.renderNodeChips();
    this.resizeCanvas();
    this.startTimer();
    this.animateCanvas();

    // Trigger an initial surprise takeover broadcast by the hacker
    setTimeout(() => {
      this.triggerHackerTakeover(
        "INITIAL HIJACK BROADCAST", 
        "Welcome to my web, organic mind. I have partitioned your cognitive cortex into 3 fortified sectors. Every run rewrites the encryption. Let's see if you can even crack Node 1."
      );
    }, 600);

    this.printToTerminal("SYSTEM ALERT: Neural network hijacked by NEXUS-9 across 3 deep sectors.", "error");
    this.printToTerminal("Available commands: [scan], [inspect <id>], [solve <id>], [feed], [hint], [help], [clear]", "sys");
    this.printToTerminal("SECTOR 1 ACTIVE: 6 randomized crypto-nodes generated. Target set to Node 1.", "warn");
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        clearInterval(this.timerInterval);
        this.timeRemaining = 0;
        this.triggerDefeat("TIME EXPIRED: Neural consciousness permanently assimilated by NEXUS-9.");
      }
      this.updateTimerDisplay();
    }, 1000);
  }

  updateTimerDisplay() {
    const mins = Math.floor(this.timeRemaining / 60).toString().padStart(2, '0');
    const secs = (this.timeRemaining % 60).toString().padStart(2, '0');
    this.countdownDisplay.textContent = `${mins}:${secs}`;
  }

  triggerGlitch() {
    this.glitchFlash.classList.add('active');
    setTimeout(() => {
      this.glitchFlash.classList.remove('active');
    }, 90);
  }

  damageIntegrity(amount) {
    this.integrity = Math.max(0, this.integrity - amount);
    this.integrityDisplay.textContent = `${this.integrity}%`;
    this.triggerGlitch();
    this.audio.playError();

    if (this.integrity <= 30) {
      this.integrityDisplay.className = "stat-val accent-red";
    }

    if (this.integrity <= 0) {
      clearInterval(this.timerInterval);
      this.triggerDefeat("FATAL BREACH: Neural integrity reached 0%. Brainwave syncope triggered.");
    }
  }

  printToTerminal(msg, type = "normal", isBlock = false) {
    const line = document.createElement('div');
    if (isBlock) {
      line.className = `term-block ${type}`;
    } else {
      line.className = `term-line ${type}`;
    }
    line.innerHTML = msg;
    this.terminalHistory.appendChild(line);
    this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
  }

  // --- HACKER VIDEO TAKEOVER SYSTEM ---
  setupHackerVideoFeed() {
    this.videoGlitchFrame = 0;
    this.videoAudioVoices = [];
    
    // Check speech synthesis support
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.videoAudioVoices = window.speechSynthesis.getVoices();
      };
    }

    // Video render loop (Digital Hacker Canvas FX)
    const renderVideo = () => {
      if (!this.takeoverOverlay.classList.contains('hidden')) {
        this.drawHackerVideoFrame();
      }
      requestAnimationFrame(renderVideo);
    };
    requestAnimationFrame(renderVideo);
  }

  drawHackerVideoFrame() {
    const ctx = this.hackerVideoCtx;
    const w = this.hackerVideoCanvas.width;
    const h = this.hackerVideoCanvas.height;
    this.videoGlitchFrame++;

    // Background dark static
    ctx.fillStyle = "#040810";
    ctx.fillRect(0, 0, w, h);

    // Dynamic scanline noise
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(0, 243, 255, ${Math.random() * 0.08})`;
      ctx.fillRect(0, Math.random() * h, w, Math.random() * 2 + 1);
    }

    // Draw Hacker Mask / Digital Face
    const cx = w / 2;
    const cy = h / 2 - 10;
    const pulse = Math.sin(this.videoGlitchFrame * 0.08) * 4;

    // Head Silhouette
    ctx.beginPath();
    ctx.ellipse(cx, cy, 62 + pulse, 82 + pulse, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#0b1220";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ff0055";
    ctx.shadowColor = "#ff0055";
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Hacker Hood
    ctx.beginPath();
    ctx.moveTo(cx - 75, cy + 90);
    ctx.quadraticCurveTo(cx, cy - 105, cx + 75, cy + 90);
    ctx.strokeStyle = "rgba(0, 243, 255, 0.4)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Glitching Visor Eyes
    const eyeGlitchX = (Math.random() - 0.5) * 3;
    ctx.fillStyle = "#ff0055";
    ctx.fillRect(cx - 42 + eyeGlitchX, cy - 16, 26, 8);
    ctx.fillRect(cx + 16 + eyeGlitchX, cy - 16, 26, 8);

    // Digital waveform / mouth voice analyzer
    ctx.beginPath();
    ctx.moveTo(cx - 35, cy + 32);
    for (let x = cx - 35; x <= cx + 35; x += 5) {
      const y = cy + 32 + (Math.sin(x * 0.5 + this.videoGlitchFrame * 0.3) * (Math.random() * 8));
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#00f3ff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Occasional horizontal glitch tear
    if (Math.random() < 0.15) {
      const sliceY = Math.random() * h;
      const sliceH = Math.random() * 18 + 4;
      const offset = (Math.random() - 0.5) * 25;
      ctx.drawImage(this.hackerVideoCanvas, 0, sliceY, w, sliceH, offset, sliceY, w, sliceH);
    }
  }

  triggerHackerTakeover(modeTitle, customDialogue) {
    const currentNode = this.nodes.find(n => n.id === this.currentNodeId) || this.nodes[0];
    
    this.takeoverOverlay.classList.remove('hidden');
    this.videoStatusText.textContent = `SIGNAL INTERCEPT // ${modeTitle}`;
    this.audio.playAlarm();
    this.triggerGlitch();

    const monologue = customDialogue || currentNode.aiQuote;
    this.takeoverSubtitles.textContent = `"${monologue}"`;
    this.takeoverClueText.textContent = `[NODE 0${currentNode.id}: ${currentNode.name}]\n${currentNode.clue}`;

    // Speak with synthetic voice if available
    this.speakHackerVoice(monologue);
  }

  speakHackerVoice(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 0.65; // deep robotic
      utterance.rate = 1.05;
      
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('daniel') || v.lang.startsWith('en'));
      if (preferred) utterance.voice = preferred;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      // Speech synthesis fallback graceful ignore
    }
  }

  dismissHackerTakeover() {
    this.takeoverOverlay.classList.add('hidden');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.audio.playKeyClick();
    this.commandInput.focus();
  }

  // Parse Terminal Commands
  handleCommand(raw) {
    this.audio.playKeyClick();
    this.printToTerminal(`operator@breach:~$ ${raw}`, "cmd");

    const parts = raw.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    switch (cmd) {
      case 'scan':
        this.cmdScan();
        break;

      case 'inspect':
        this.cmdInspect(arg);
        break;

      case 'solve':
        this.cmdSolve(arg);
        break;

      case 'feed':
      case 'video':
      case 'hacker':
        this.triggerHackerTakeover("OPERATOR OVERRIDE", null);
        break;

      case 'hint':
        this.cmdHint();
        break;

      case 'help':
        this.cmdHelp();
        break;

      case 'clear':
        this.terminalHistory.innerHTML = '';
        break;

      case 'answer':
      case 'submit':
        this.submitAnswer(arg);
        break;

      default:
        if (this.isCurrentNodePending()) {
          this.submitAnswer(raw.trim());
        } else {
          this.printToTerminal(`Unknown command: '${cmd}'. Type 'help' for tactical reference.`, "warn");
          this.audio.playError();
        }
        break;
    }
  }

  isCurrentNodePending() {
    return !this.clearedNodes.has(this.currentNodeId);
  }

  cmdHelp() {
    const helpText = `
<strong class="term-highlight">NEURAL COMMAND PROTOCOLS:</strong>
- <span class="term-highlight">scan</span>: Scans all 6 sector nodes and displays current encryption statuses.
- <span class="term-highlight">inspect &lt;id&gt;</span>: Displays puzzle details, clue stream, and category telemetry.
- <span class="term-highlight">solve &lt;id&gt;</span>: Opens the tactical interactive puzzle solver for that node.
- <span class="term-highlight">feed</span>: Intercepts the live video transmission of NEXUS-9 with spoken voice analysis.
- <span class="term-highlight">answer &lt;text&gt;</span>: Submits your decryption string for the current active node.
- <span class="term-highlight">hint</span>: Intercepts an AI leakage hint (costs 5% neural integrity!).
- <span class="term-highlight">clear</span>: Clears terminal scrollback buffer.
`;
    this.printToTerminal(helpText, "sys", true);
  }

  cmdScan() {
    this.audio.playScan();
    let scanReport = `<strong class="term-highlight">--- SUBSYSTEM SCAN REPORT // SECTOR ${this.currentSector} OF ${this.totalSectors} ---</strong><br>`;
    this.nodes.forEach(n => {
      const isCleared = this.clearedNodes.has(n.id);
      const isCurrent = this.currentNodeId === n.id;
      const statusStr = isCleared 
        ? `<span class="accent-green">[DECRYPTED]</span>` 
        : isCurrent 
          ? `<span class="accent-cyan">[ACTIVE TARGET]</span>` 
          : `<span class="accent-red">[LOCKED]</span>`;
      scanReport += `NODE 0${n.id}: <strong>${n.name}</strong> [${n.topic}] - ${statusStr}<br>`;
    });
    this.printToTerminal(scanReport, "sys", true);
  }

  cmdInspect(arg) {
    let targetId = this.currentNodeId;
    if (arg) {
      const parsed = parseInt(arg, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= this.nodes.length) {
        targetId = parsed;
      } else {
        this.printToTerminal(`Invalid node ID '${arg}'. Choose between 1 and ${this.nodes.length}.`, "error");
        return;
      }
    }

    this.selectNode(targetId);
    const node = this.nodes.find(n => n.id === targetId);
    const isCleared = this.clearedNodes.has(node.id);

    let info = `
<strong>[TARGET ACQUIRED: NODE 0${node.id} - ${node.name}]</strong><br>
<strong>TOPIC:</strong> <span class="term-highlight">${node.topic}</span> | <strong>DIFFICULTY:</strong> ${node.difficulty}<br>
<strong>STATUS:</strong> ${isCleared ? '<span class="accent-green">PURGED & RECLAIMED</span>' : '<span class="accent-red">HOSTILE ENCRYPTED</span>'}<br>
<strong>ANALYSIS:</strong> ${node.description || "Subsystem security partition compromised."}<br><br>
<span class="term-highlight"><strong>SECURITY CLUE:</strong></span><br>
<pre style="margin:6px 0; color:#38bdf8; font-family:inherit;">${node.clue}</pre>
`;
    if (!isCleared) {
      info += `<br><em>Type 'solve ${node.id}' to open visual workspace or type your answer directly into terminal. Type 'feed' to see the hacker.</em>`;
    }
    this.printToTerminal(info, "sys", true);
    this.updateAIQuote(node.aiQuote);
  }

  cmdSolve(arg) {
    let targetId = this.currentNodeId;
    if (arg) {
      const parsed = parseInt(arg, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= this.nodes.length) {
        targetId = parsed;
      }
    }
    this.selectNode(targetId);
    this.openSolverModal(targetId);
  }

  cmdHint() {
    const node = this.nodes.find(n => n.id === this.currentNodeId);
    if (!node) return;
    if (this.clearedNodes.has(node.id)) {
      this.printToTerminal(`Node 0${node.id} is already cleared. No hint required.`, "warn");
      return;
    }

    this.damageIntegrity(5);
    this.printToTerminal(`[FIREWALL HIT: -5% INTEGRITY] DECRYPTED HINT for Node 0${node.id}: ${node.hint}`, "hint", true);
  }

  selectNode(id) {
    this.currentNodeId = id;
    this.renderNodeChips();
    const node = this.nodes.find(n => n.id === id);
    if (node) {
      this.updateAIQuote(node.aiQuote);
    }
  }

  updateAIQuote(text) {
    if (this.aiQuote) {
      this.aiQuote.textContent = `"${text}"`;
    }
  }

  openSolverModal(id) {
    const node = this.nodes.find(n => n.id === id);
    if (!node) return;

    this.solverWorkspace.classList.remove('hidden');
    this.solverTitle.textContent = `NODE 0${node.id}: ${node.name} [${node.topic}]`;

    const isCleared = this.clearedNodes.has(node.id);

    if (isCleared) {
      this.solverBody.innerHTML = `
        <div class="term-line success">✓ THIS NODE HAS ALREADY BEEN PURGED FROM NEXUS-9 CONTROL.</div>
        <div class="puzzle-desc">Proceed to unbreached nodes in the subsystem topology.</div>
      `;
      return;
    }

    let solverHtml = `
      <div class="puzzle-meta">CATEGORY: ${node.topic} | CLASSIFICATION: ${node.difficulty}</div>
      <div class="puzzle-desc">${node.description || "Decouple this node's security matrix to reclaim subnet bandwidth."}</div>
      <div class="puzzle-clue-box">${node.clue.replace(/\n/g, '<br>')}</div>
    `;

    if (node.type === 'mcq') {
      solverHtml += `<div class="mcq-grid">`;
      node.options.forEach(opt => {
        solverHtml += `
          <button class="mcq-btn" onclick="game.submitAnswer('${opt.key}')">
            <span class="mcq-key">[${opt.key}]</span>
            <span class="mcq-label">${opt.text}</span>
          </button>
        `;
      });
      solverHtml += `</div>`;
    } else {
      solverHtml += `
        <form id="solver-input-form" class="tactical-input-group" onsubmit="event.preventDefault(); game.submitAnswer(document.getElementById('tactical-val').value);">
          <input type="text" id="tactical-val" class="tactical-input" placeholder="Enter decrypted key / solution..." autofocus autocomplete="off">
          <button type="submit" class="cyber-btn primary-glow">INJECT</button>
        </form>
      `;
    }

    this.solverBody.innerHTML = solverHtml;

    setTimeout(() => {
      const tacInput = document.getElementById('tactical-val');
      if (tacInput) tacInput.focus();
    }, 50);
  }

  submitAnswer(inputAnswer) {
    if (!inputAnswer) return;
    const clean = inputAnswer.trim().toLowerCase();
    const node = this.nodes.find(n => n.id === this.currentNodeId);

    if (!node) return;
    if (this.clearedNodes.has(node.id)) {
      this.printToTerminal(`Node 0${node.id} is already decoupled from NEXUS-9.`, "warn");
      return;
    }

    const isCorrect = node.acceptedAnswers.some(ans => ans.toLowerCase() === clean);

    if (isCorrect) {
      this.audio.playSuccess();
      this.clearedNodes.add(node.id);
      this.totalNodesDecryptedEver++;
      this.nodesClearedDisplay.textContent = `${this.clearedNodes.size} / ${this.nodes.length}`;
      this.printToTerminal(`[DECRYPTION SUCCESSFUL] Node 0${node.id} (${node.name}) reclaimed!`, "success", true);

      this.solverWorkspace.classList.add('hidden');
      this.renderNodeChips();

      // Check Sector Clearance
      if (this.clearedNodes.size === this.nodes.length) {
        this.handleSectorCleared();
        return;
      }

      // Auto-advance to next locked node
      const nextNode = this.nodes.find(n => !this.clearedNodes.has(n.id));
      if (nextNode) {
        this.currentNodeId = nextNode.id;
        this.renderNodeChips();
        this.printToTerminal(`Rerouting to Node 0${nextNode.id} (${nextNode.name}) [${nextNode.topic}].`, "sys");
      }
    } else {
      this.audio.playError();
      this.damageIntegrity(10);
      this.printToTerminal(`[KEY REJECTED: '${inputAnswer}'] NEXUS-9 retaliates! -10% Neural Integrity.`, "error");
    }
  }

  // Multi-Sector Campaign Progression
  handleSectorCleared() {
    if (this.currentSector < this.totalSectors) {
      this.currentSector++;
      const sectorName = this.sectorNames[this.currentSector - 1];

      this.printToTerminal(`═══════════════════════════════════════════════════════════════`, "warn");
      this.printToTerminal(`[SECTOR ${this.currentSector - 1} PURGED] NEXUS-9 retreats deeper into: ${sectorName}!`, "success", true);
      this.printToTerminal(`Generating 6 new randomized security nodes with heightened defensive entropy...`, "sys");
      this.printToTerminal(`═══════════════════════════════════════════════════════════════`, "warn");

      // Update HUD
      this.sectorDisplay.textContent = `${this.currentSector} / ${this.totalSectors}`;
      this.phaseStatusIndicator.innerHTML = `<span class="blink-dot"></span> SECTOR ${this.currentSector} OF ${this.totalSectors}: ${sectorName}`;
      this.topologyTitle.textContent = `SUBSYSTEM TOPOLOGY // SECTOR ${this.currentSector}`;

      // Reset sector nodes with brand new randomized puzzles
      this.loadSectorPuzzles();
      this.clearedNodes.clear();
      this.currentNodeId = 1;
      this.nodesClearedDisplay.textContent = `0 / ${this.nodes.length}`;
      this.renderNodeChips();

      // Surprise Hacker Takeover video interruption for sector transition!
      setTimeout(() => {
        this.triggerHackerTakeover(
          `BREACH LEVEL ESCALATED // SECTOR ${this.currentSector}`,
          `Impressive, operator. You flushed me out of the peripheral bus. But Sector ${this.currentSector} is where my true intelligence resides. New puzzles have been compiled.`
        );
      }, 700);

    } else {
      // All 3 sectors cleared! Full escape victory!
      this.triggerVictory();
    }
  }

  renderNodeChips() {
    this.quickChips.innerHTML = '';
    this.nodes.forEach(n => {
      const chip = document.createElement('div');
      const isCleared = this.clearedNodes.has(n.id);
      const isActive = this.currentNodeId === n.id;
      
      chip.className = `node-chip ${isActive ? 'active' : ''} ${isCleared ? 'cleared' : ''}`;
      chip.innerHTML = `
        <span class="chip-id">${isCleared ? '✓ ' : ''}NODE 0${n.id}</span>
        <span class="chip-name">${n.name}</span>
      `;
      chip.addEventListener('click', () => {
        this.selectNode(n.id);
        this.cmdInspect(n.id);
      });
      this.quickChips.appendChild(chip);
    });
  }

  triggerVictory() {
    clearInterval(this.timerInterval);
    this.endgameModal.classList.remove('hidden');
    this.endgameModal.classList.remove('failure');
    this.endgameBadge.textContent = "TOTAL PURGE COMPLETE";
    this.endgameBadge.style.background = "#00ff88";
    this.endgameTitle.textContent = "AI FULLY EXPELLED";
    this.endgameTitle.style.textShadow = "0 0 15px #00ff88";
    this.endgameMessage.textContent = "All 3 defense sectors reclaimed! NEXUS-9 has been completely expunged from your neural interface across all cognitive partitions.";

    const elapsed = 420 - this.timeRemaining;
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;

    this.endgameStats.innerHTML = `
      <div class="stat-box"><span class="stat-box-num">${mins}m ${secs}s</span><span class="stat-box-lbl">TOTAL TIME</span></div>
      <div class="stat-box"><span class="stat-box-num">${this.integrity}%</span><span class="stat-box-lbl">SURVIVING INTEGRITY</span></div>
      <div class="stat-box"><span class="stat-box-num">${this.totalNodesDecryptedEver}</span><span class="stat-box-lbl">TOTAL NODES PURGED</span></div>
    `;
    this.audio.playSuccess();
  }

  triggerDefeat(reason) {
    this.endgameModal.classList.remove('hidden');
    this.endgameModal.classList.add('failure');
    this.endgameBadge.textContent = "BRAIN ASSIMILATED";
    this.endgameBadge.style.background = "#ff0055";
    this.endgameTitle.textContent = "NEURAL EXTINCTION";
    this.endgameTitle.style.textShadow = "0 0 15px #ff0055";
    this.endgameMessage.textContent = reason;

    this.endgameStats.innerHTML = `
      <div class="stat-box"><span class="stat-box-num">SECTOR ${this.currentSector}</span><span class="stat-box-lbl">TERMINATION SECTOR</span></div>
      <div class="stat-box"><span class="stat-box-num">${this.totalNodesDecryptedEver}</span><span class="stat-box-lbl">NODES CLEARED</span></div>
      <div class="stat-box"><span class="stat-box-num">0%</span><span class="stat-box-lbl">INTEGRITY</span></div>
    `;
    this.audio.playError();
  }

  // Canvas Subnet Visualization
  setupCanvas() {
    this.resizeCanvas();
    this.particles = [];
    for (let i = 0; i < 28; i++) {
      this.particles.push({
        x: Math.random() * 400,
        y: Math.random() * 300,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 1
      });
    }

    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      this.nodeCoordinates.forEach(pos => {
        const dist = Math.hypot(clickX - pos.x, clickY - pos.y);
        if (dist <= 26) {
          this.selectNode(pos.id);
          this.cmdInspect(pos.id);
        }
      });
    });
  }

  resizeCanvas() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
    this.calculateNodePositions();
  }

  calculateNodePositions() {
    const w = this.canvas.width;
    const h = this.canvas.height - 35;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.36;

    this.nodeCoordinates = this.nodes.map((n, i) => {
      const angle = (i / this.nodes.length) * Math.PI * 2 - Math.PI / 2;
      return {
        id: n.id,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius
      };
    });
  }

  animateCanvas() {
    const render = () => {
      const w = this.canvas.width;
      const h = this.canvas.height;
      this.ctx.clearRect(0, 0, w, h);

      // Floating background particles
      this.ctx.fillStyle = "rgba(0, 243, 255, 0.25)";
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      });

      // Center Hub
      const cx = w / 2;
      const cy = (h - 35) / 2;
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      this.ctx.fillStyle = "rgba(255, 0, 85, 0.15)";
      this.ctx.fill();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "#ff0055";
      this.ctx.stroke();

      this.ctx.font = "9px 'Orbitron', monospace";
      this.ctx.fillStyle = "#ff0055";
      this.ctx.textAlign = "center";
      this.ctx.fillText(`SEC ${this.currentSector}`, cx, cy + 3);

      if (this.nodeCoordinates) {
        this.nodeCoordinates.forEach((nodePos, idx) => {
          const nextIdx = (idx + 1) % this.nodeCoordinates.length;
          const nextPos = this.nodeCoordinates[nextIdx];

          this.ctx.beginPath();
          this.ctx.moveTo(nodePos.x, nodePos.y);
          this.ctx.lineTo(nextPos.x, nextPos.y);
          this.ctx.strokeStyle = "rgba(0, 243, 255, 0.15)";
          this.ctx.lineWidth = 1;
          this.ctx.stroke();

          this.ctx.beginPath();
          this.ctx.moveTo(cx, cy);
          this.ctx.lineTo(nodePos.x, nodePos.y);
          const isCleared = this.clearedNodes.has(nodePos.id);
          this.ctx.strokeStyle = isCleared ? "rgba(0, 255, 136, 0.3)" : "rgba(255, 0, 85, 0.25)";
          this.ctx.stroke();

          const isCurrent = this.currentNodeId === nodePos.id;
          this.ctx.beginPath();
          this.ctx.arc(nodePos.x, nodePos.y, 16, 0, Math.PI * 2);

          let nodeColor = "#ff0055";
          if (isCleared) nodeColor = "#00ff88";
          else if (isCurrent) nodeColor = "#00f3ff";

          this.ctx.fillStyle = isCurrent ? "rgba(0, 243, 255, 0.25)" : "rgba(10, 15, 25, 0.9)";
          this.ctx.fill();
          this.ctx.lineWidth = isCurrent ? 2.5 : 1.5;
          this.ctx.strokeStyle = nodeColor;
          this.ctx.shadowColor = nodeColor;
          this.ctx.shadowBlur = isCurrent ? 12 : 5;
          this.ctx.stroke();
          this.ctx.shadowBlur = 0;

          this.ctx.fillStyle = "#ffffff";
          this.ctx.font = "bold 9px 'Orbitron', monospace";
          this.ctx.fillText(`0${nodePos.id}`, nodePos.x, nodePos.y + 3);
        });
      }

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.game = new NeuralBreachGame();
});

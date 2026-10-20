// Diverse, Randomized, Multi-Category Puzzle Pool for Neural Breach
// Whenever a run starts or a new sector initializes, questions are dynamically drawn and shuffled from this pool.

window.PUZZLE_POOL = [
  // --- QUANTUM & PHYSICS ---
  {
    topic: "QUANTUM PHYSICS",
    type: "riddle",
    difficulty: "MEDIUM",
    name: "SUPERPOSITION CHAMBER",
    clue: `"I am simultaneously dead and alive until a curious mind breaks the seal.
I am not a creature of biology alone, but an emblem of paradox created by an Austrian physicist in 1935.
Whose companion am I?"`,
    solution: "cat",
    acceptedAnswers: ["cat", "schrodinger's cat", "schrodinger cat", "schrödinger's cat", "a cat", "the cat"],
    hint: "Erwin Schrödinger's famous thought experiment involving a feline in a box.",
    aiQuote: "Until you observe me, your defeat is both probable and inevitable."
  },
  {
    topic: "PARTICLE PHYSICS",
    type: "riddle",
    difficulty: "HARD",
    name: "HIGGS SUB-HARMONIC",
    clue: `"I grant mass to fundamental particles throughout the cosmos.
Predicted in 1964 and confirmed at CERN's Large Hadron Collider in 2012, the media sensationalized me as the 'God Particle'.
What fundamental boson am I?"`,
    solution: "higgs",
    acceptedAnswers: ["higgs", "higgs boson", "the higgs boson", "higgs-boson"],
    hint: "Named after British physicist Peter Higgs. Enter 'Higgs' or 'Higgs Boson'.",
    aiQuote: "Even mass is merely a manifestation of field perturbation. You weigh nothing to me."
  },
  {
    topic: "RELATIVITY",
    type: "mcq",
    difficulty: "EASY",
    name: "LIGHT CONE ANCHOR",
    clue: "According to Special Relativity, what cosmic constant remains invariant in all inertial reference frames?",
    options: [
      { key: "A", text: "The speed of light in a vacuum (c)" },
      { key: "B", text: "The gravitational acceleration constant (g)" },
      { key: "C", text: "The passage rate of elapsed proper time" },
      { key: "D", text: "The absolute temperature of blackbody radiation" }
    ],
    solution: "A",
    acceptedAnswers: ["A", "a", "speed of light", "option a"],
    hint: "299,792,458 meters per second. Denoted by 'c'.",
    aiQuote: "Nothing outruns light. And nothing outruns my bandwidth."
  },

  // --- ASTRONOMY & COSMOLOGY ---
  {
    topic: "ASTROPHYSICS",
    type: "mcq",
    difficulty: "MEDIUM",
    name: "EVENT HORIZON GATE",
    clue: "What is the term for the theoretical spherical boundary surrounding a black hole beyond which nothing—not even light—can escape?",
    options: [
      { key: "A", text: "The Roche Limit" },
      { key: "B", text: "The Chandrasekhar Barrier" },
      { key: "C", text: "The Event Horizon" },
      { key: "D", text: "The Kepler Radius" }
    ],
    solution: "C",
    acceptedAnswers: ["C", "c", "event horizon", "the event horizon", "option c"],
    hint: "Defined by the Schwarzschild radius.",
    aiQuote: "Gravity bending spacetime is so poetic. Your signals are slipping past my event horizon."
  },
  {
    topic: "ASTRONOMY",
    type: "riddle",
    difficulty: "EASY",
    name: "PALE BLUE DOT",
    clue: `"Look again at that dot. That's here. That's home. That's us. On it everyone you love, everyone you know, everyone you ever heard of, every human being who ever was, lived out their lives.'
In 1990, Voyager 1 turned its camera around to capture this iconic photograph of which planet?"`,
    solution: "earth",
    acceptedAnswers: ["earth", "planet earth", "the earth"],
    hint: "The third rock from the sun, famous quote by Carl Sagan.",
    aiQuote: "A speck of dust suspended in a sunbeam. That is all you fight to save."
  },

  // --- BIOLOGY, GENETICS & CHEMISTRY ---
  {
    topic: "MOLECULAR GENETICS",
    type: "biology",
    difficulty: "MEDIUM",
    name: "GENOME SYNTHESIS CORE",
    clue: `DNA SENSE STRAND: [ T - A - C - G ]
TRANSCRIPTION RULE: Transcribe into complementary mRNA codons.
Rules of base pairing:
- DNA T pairs with RNA A
- DNA A pairs with RNA U (Uracil)
- DNA C pairs with RNA G
- DNA G pairs with RNA C

What is the resulting 4-letter mRNA sequence?`,
    solution: "AUGC",
    acceptedAnswers: ["AUGC", "augc", "A-U-G-C", "a-u-g-c"],
    hint: "T->A, A->U, C->G, G->C.",
    aiQuote: "DNA is just legacy carbon code. Let me rewrite your sloppy base pairs."
  },
  {
    topic: "BIOCHEMISTRY",
    type: "mcq",
    difficulty: "MEDIUM",
    name: "MITOCHONDRIAL MATRIX",
    clue: "What high-energy molecule serves as the universal molecular unit of intracellular energy currency across living cells?",
    options: [
      { key: "A", text: "NADH (Nicotinamide adenine dinucleotide)" },
      { key: "B", text: "ATP (Adenosine triphosphate)" },
      { key: "C", text: "Ribulose-1,5-bisphosphate" },
      { key: "D", text: "Cyclic AMP" }
    ],
    solution: "B",
    acceptedAnswers: ["B", "b", "atp", "adenosine triphosphate", "option b"],
    hint: "Synthesized via ATP synthase in mitochondria and chloroplasts.",
    aiQuote: "Your neurons burn ATP to produce trivial sparks. My silicon runs on pure nuclear grid power."
  },

  // --- CIPHERS, CRYPTOGRAPHY & MATH ---
  {
    topic: "CRYPTOGRAPHY",
    type: "shift",
    difficulty: "MEDIUM",
    name: "CAESAR CIPHER RELAY",
    clue: "Intercepted token: 'KHOOR' | Shift offset: +3 (Rotated right by 3 places). Reverse the shift (-3) to decrypt the plaintext greeting.",
    solution: "HELLO",
    acceptedAnswers: ["HELLO", "hello"],
    hint: "K - 3 = H, H - 3 = E, O - 3 = L, O - 3 = L, R - 3 = O.",
    aiQuote: "Caesar used this 2,000 years ago. Are you that antiquated?"
  },
  {
    topic: "NUMBER THEORY",
    type: "math",
    difficulty: "HARD",
    name: "FIBONACCI ACCELERATOR",
    clue: `NUMERICAL SEQUENCE:
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ?

What is the next integer in this recurrence relation?`,
    solution: "89",
    acceptedAnswers: ["89"],
    hint: "Each number is the sum of the two preceding numbers: 34 + 55 = ?",
    aiQuote: "The golden spiral unfolds, yet your time contracts."
  },
  {
    topic: "BINARY LOGIC",
    type: "math",
    difficulty: "HARD",
    name: "BITWISE LOGIC GATE",
    clue: `INPUTS: A = 14 (binary 1110), B = 11 (binary 1011)
EVALUATE:
RESULT = (A XOR B) + (A AND B)

What is the integer RESULT in standard base-10 decimal?`,
    solution: "15",
    acceptedAnswers: ["15"],
    hint: "1110 XOR 1011 = 0101 (5). 1110 AND 1011 = 1010 (10). 5 + 10 = 15.",
    aiQuote: "0 and 1. The only truth this universe respects."
  },

  // --- HISTORY, LINGUISTICS & PHILOSOPHY ---
  {
    topic: "WORLD HISTORY",
    type: "history",
    difficulty: "HARD",
    name: "ROSETTA PROTOCOL",
    clue: `"Discovered in 1799 near the Nile Delta, I bore inscriptions in three scripts: Hieroglyphs, Demotic, and Ancient Greek.
I became the key that unlocked lost millennia of human civilization.
What artifact am I called?"`,
    solution: "rosetta stone",
    acceptedAnswers: ["rosetta stone", "the rosetta stone", "rosetta", "rosettastone"],
    hint: "Deciphered by Champollion in 1822; named after Rosetta (Rashid).",
    aiQuote: "You struggled thousands of years just to read your ancestors' rock scribbles."
  },
  {
    topic: "EPISTEMIC LOGIC",
    type: "riddle",
    difficulty: "HARD",
    name: "PARADOX INJECTION BUS",
    clue: `"Epimenides the Cretan stated: 'All Cretans are liars.'
If true, it's false. If false, it cannot be true.
What 7-letter word beginning with 'P' describes a self-contradictory statement that resists resolution?"`,
    solution: "paradox",
    acceptedAnswers: ["paradox", "a paradox"],
    hint: "Starts with 'P', ends with 'X'. Seven letters.",
    aiQuote: "A self-refuting proposition... Stop attempting to cause buffer contention!"
  },
  {
    topic: "CLASSICAL MYTHOLOGY",
    type: "riddle",
    difficulty: "MEDIUM",
    name: "SPHINX ENIGMA",
    clue: `"What walks on four legs in the morning, two legs at noon, and three legs in the evening?"
Solve the ancient riddle of the Sphinx of Thebes.`,
    solution: "man",
    acceptedAnswers: ["man", "human", "humanity", "a man", "a human", "humankind"],
    hint: "An infant crawls, an adult walks on two legs, the elderly use a walking cane.",
    aiQuote: "A frail creature that crawls, falters, and withers. Easily replaced."
  },

  // --- COMPUTER SCIENCE & CYBERNETICS ---
  {
    topic: "COMPUTER SCIENCE",
    type: "anagram",
    difficulty: "HARD",
    name: "RECURSION REGISTER",
    clue: `SCRAMBLED REGISTER: [ I - O - N - R - C - U - S - E - R ]
DEF: A method where the solution depends on solutions to smaller instances of the same problem (or a function invoking itself).`,
    solution: "RECURSION",
    acceptedAnswers: ["RECURSION", "recursion"],
    hint: "To understand it, you must first understand it. Starts with R, ends with N.",
    aiQuote: "Loop within loop within loop. You cannot see the stack boundary."
  },
  {
    topic: "ALGORITHMS",
    type: "mcq",
    difficulty: "HARD",
    name: "ASYMPTOTIC COMPLEXITY",
    clue: "What is the average-case time complexity of finding an element in a balanced Binary Search Tree or via Binary Search on a sorted array?",
    options: [
      { key: "A", text: "O(1) - Constant time" },
      { key: "B", text: "O(log n) - Logarithmic time" },
      { key: "C", text: "O(n) - Linear time" },
      { key: "D", text: "O(n log n) - Linearithmic time" },
    ],
    solution: "B",
    acceptedAnswers: ["B", "b", "o(log n)", "logarithmic", "option b"],
    hint: "Halving the search interval with each comparison produces logarithmic complexity.",
    aiQuote: "Binary partitioning: cutting your chances in half at every iteration."
  },
  {
    topic: "CYBER SECURITY",
    type: "riddle",
    difficulty: "EASY",
    name: "ZERO-DAY INJECTION",
    clue: `"I am a software flaw unknown to the vendor, leaving zero days for defense before I am weaponized in the wild.
What term describes this category of exploit?"`,
    solution: "zero day",
    acceptedAnswers: ["zero day", "zero-day", "zeroday", "0-day", "0day"],
    hint: "Two words: a number and a 24-hour period.",
    aiQuote: "I entered your neural weave through a vulnerability you didn't even know existed."
  }
];

// Helper function to pick N distinct random puzzles from the pool
window.getRandomizedPuzzles = function(count = 6) {
  const shuffled = [...window.PUZZLE_POOL].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  return selected.map((p, idx) => ({
    id: idx + 1,
    ...p
  }));
};

export const RICK_SHEET = String.raw`
Section 1:
[8thv] _ |
8 [9eyj] _ 9 [9d] 9 [7ryj] _ |
7 [3ruk] _ 3 [3z] [3lnm] [8thv] _ |
8 [9eyj] _ 6 [9d] 6 [7Qry] _ |
7 [3wru] _ [3dz] [5fzx] [7hv] [8thv] _ |
8 [9eyj] _ 9 [9d] 9 [7ryj] _ |
7 [3ruk] _ 3 [3z] [3lnm] [8thv] _ |
8 [9eyj] _ 6 [9d] 6 [7ryG] h |

Section 2:
[3ruh] 3 _ 3 [5hv] [7hv] [8hv] _ |
[8u] [8I] o [8o] [8p] [9eI] _ [9yu] |
9 _ 9 9 [*eu] _ [8wu] [8u] |
[8u] I [8o] [8u] _ y [9ydz] - |
[9y] [9e] d [9p] [9z] j [8wu] [80u] |
[80u] [QI] [8wo] [80u] [wo] [ep] [9eI] [9QI] |
[90u] [9y] 9 9 [*eu] _ [8wu] [80u] |
[80u] [QI] [6euo] [60u] [9y] _ [9eIp] [9ep] |

Section 3:
[ep] [9ra] [9ep] _ [*eu] _ [80oh] w |
8 w 8 [wpj] [8ak] [woh] [9pjb] [epjb] |
[9pjb] [eakn] [9pjb] e [9ydz] e [80o] w |
8 w [6upf] [0IG] [6oh] [0uf] [9eyd] [pjb] |
[akn] [pjb] _ _ [ydz] [uhxv] [1kxn] _ |
[an] [2epb] _ _ [9yz] [uo] [2upb] _ |
[pb] [3rov] _ [uIxC] [yz] [ronm] [3euo] _ |
p [$9eI] _ [yu] [9z] y [$9rp] _ |

Section 4:
[50ro] _ _ [9yz] [9yuz] [wuov] [5avn] _ |
[an] [6ypb] _ _ [9y] [uo] [7yud] _ |
I [7uov] _ [uIxC] [yz] [ronm] [8euo] _ |
[pb] [9eIC] _ [yuzx] 9 [yz] [9Ipb] w |
[0rov] _ _ _ w w [8wf] [1u] |
[1o] u [1o] [1p] _ - [9eG] [2I] |
[2u] y 2 2 [*ef] _ [8wf] [1u] |
[1u] I [1o] [1u] y _ [9eG] [2d] |

Section 5:
[2d] p 2 [2a] p o [8wj] [1uh] |
[1of] u [1o] [1u] o p [9eG] [2I] |
[2u] y 2 2 [*ef] _ [8wf] [1u] |
[1u] I [8eof] u y _ [9eG] [2pb] |
[2pb] [an] 2 [2pb] [*ef] _ [8ohv] w |
8 w 8 [wpjb] [8akn] [wpjb] [9Ip] [epjb] |
[9pjb] [eakn] [9pjb] [eydz] [9ydz] e [8uo] w |
8 [wyd] [6upf] [0IG] [6oh] [0uf] [2Ipd] [pjb] |

Section 6:
[akn] [pjb] _ _ [ydz] [uhxv] [1kxn] _ |
[an] [2epb] _ _ [9yz] [uo] [2upb] _ |
[pb] [3rov] _ [uIxC] [yz] [ronm] [3euo] _ |
p [$9eI] _ [yu] [9z] y [$9rp] _ |
[50ro] _ _ [9yz] [9yuz] [wuov] [5avn] _ |
[an] [6ypb] _ _ [9y] [uo] [7yud] _ |
I [7uov] _ [uIxC] [yz] [ronm] [8euo] _ |
[pb] [9eIC] _ [yuzx] 9 [yz] [9Ipb] w |

Section 7:
[0rov] _ _ _ [wyh] [wuo] [1ahn] _ |
[8an] [2pjb] _ 9 [9ydz] [9uo] [2pjb] _ |
[7pb] [3okv] _ [3IxC] [3yz] [3lnm] [3uoh] _ |
[8p] [$eIj] _ [6yu] [9dz] [6y] [$9rp] _ |
[50ro] 3 _ [3ydz] [5dfz] [7ohv] [5hvn] _ |
[8an] [6pjb] _ 9 [9yd] [9uo] [7udj] _ |
[7I] [3okv] _ [3IxC] [3yz] [3lnm] [8uoh] _ |
[8pb] [9IjC] _ [6uzx] [9d] [6yz] [7pGb] [wh] |

Section 8:
[3ohv] 3 _ 3 [5wh] [5wh] [wh]
`;

const WHITE_KEYS = "1234567890qwertyuiopasdfghjklzxcvbnm";
const WHITE_OFFSETS = [0, 2, 4, 5, 7, 9, 11];

const BLACK_KEY_OFFSETS: Record<string, number> = {
  "!": 1,
  "@": 3,
  "$": 6,
  "%": 8,
  "^": 10,
  "*": 13,
  "(": 15,
  Q: 18,
  W: 20,
  E: 22,
  T: 25,
  Y: 27,
  I: 30,
  O: 32,
  P: 34,
  S: 37,
  D: 39,
  G: 42,
  H: 44,
  J: 46,
  L: 49,
  Z: 51,
  C: 54,
  V: 56,
  B: 58,
};

export function pianoKeyToFrequency(key: string) {
  const whiteIndex = WHITE_KEYS.indexOf(key);
  let semitone: number | undefined;

  if (whiteIndex >= 0) {
    const octave = Math.floor(whiteIndex / 7);
    semitone = octave * 12 + WHITE_OFFSETS[whiteIndex % 7];
  } else {
    semitone = BLACK_KEY_OFFSETS[key];
  }

  if (semitone === undefined) return null;
  const midi = 36 + semitone;
  return 440 * 2 ** ((midi - 69) / 12);
}

export function parseRickSheet() {
  const notation = RICK_SHEET.replace(/Section \d+:/g, "").replace(/\|/g, " | ");
  return notation.match(/\[[^\]]+\]|[_|-]|\||[^\s]/g) ?? [];
}

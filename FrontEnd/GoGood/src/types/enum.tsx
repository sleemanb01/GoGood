export enum USTATUS { //upload status
  UNINIT,
  PENDING,
  SUCCESS,
  FAILED,
}

export enum PSTATUS { // post status
  PENDING,
  ANGELHANDLE,
  ANGELTHANKED,
  ACCEPTHELP,
  SAYTHANKS,
  HANDLED,
}

// 1 - isAngel | !isAngel, 0  => propse help ***
// 2 - isAngel, 2 => cancel | set
// 3 - isAngel, 3 => read comment
// 4 - !isAngel, 2 => accept
// 5 - !isAngel, 3 => say thanks

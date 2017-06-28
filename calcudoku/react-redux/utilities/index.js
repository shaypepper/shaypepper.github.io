export const zeros = n => Array.of( ...new Int32Array(n).map(() => 0));

export const getRange = (n=5) => Array.of( ...new Int32Array(n).map((x,i) => i));

export const squareIdFromCandidateId = (id, N) => (id - (id%N)) / N;

export default () => {};

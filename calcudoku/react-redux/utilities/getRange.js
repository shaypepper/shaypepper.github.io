const getRange = (n=5) => Array.of( ...new Int32Array(n).map((x,i) => i));

export default getRange

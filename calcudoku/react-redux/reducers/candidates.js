import getRange from '../utilities/getRange'

const generateCandidates = (N=5) => {
  return getRange(N*N*N).map(i => ({
    id: i,
    selected: false,
    digit: i%N+1
  }));
}

const candidates = (state = generateCandidates(), action) => {
  switch(action.type){
    case 'GENERATE_NEW_PUZZLE':
    case 'CLEAR_PUZZLE':
      return generateCandidates(action.puzzleSize);

    case 'TOGGLE_CANDIDATE_SELECTED':
      var c =  state.map((c,i) => ({
        id: i,
        selected: i == action.candidateId? !c.selected : c.selected,
        digit: c.digit
      }));
      return c;

    case 'CLEAR_CANDIDATES':
      var c =  state.map((c,i) => ({
        id: i,
        selected: action.candidates.includes(i)? false : c.selected,
        digit: c.digit
      }));
      return c;

    default:
      return state;
  }
}

export default candidates

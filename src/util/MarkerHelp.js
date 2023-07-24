export function FindColor(score) {
  if (score <= 3) {
    return 'green';
  } else if (score >= 4 && score <= 6) {
    return 'orange';
  } else {
    return 'red';
  }
}

export function GenDescription(score) {
  return 'Crowded Level: ' + score;
}

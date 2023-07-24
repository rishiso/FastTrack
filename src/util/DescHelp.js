export function crowdLevel(score) {
  if (score <= 3) {
    return 'Low';
  } else if (score >= 4 && score <= 6) {
    return 'Moderate';
  } else {
    return 'High';
  }
}

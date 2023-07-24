export function SearchFilter(places, searchText) {
  if (searchText === '') {
    return places;
  } else {
    let filteredPlaces = [];
    for (const p of places) {
      if (p.name.toLowerCase().includes(searchText.toLowerCase())) {
        filteredPlaces.push(p);
      }
    }
    return filteredPlaces;
  }
}
